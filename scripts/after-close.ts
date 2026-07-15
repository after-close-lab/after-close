import { execFileSync } from 'node:child_process';
import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { createInterface } from 'node:readline/promises';
import { parse, stringify } from 'yaml';
import { recordSchema, reviewSchema } from '../src/lib/schemas';
import { validateRepositoryContent } from './lib/content';
import { walkFiles } from './lib/files';
import { findPolicyViolations, validateRecordPolicy } from './lib/policy';

type Args = Record<string, string | boolean>;
type LocalConfig = {
  trader_id: string;
  default_market: string;
  timezone: string;
  disclosure_mode: string;
  publication_policy: 'after_close';
};
type Draft = { frontmatter: Record<string, unknown>; body: string };

const ROOT = process.cwd();
const CONFIG_PATH = path.join(ROOT, '.after-close.local.yaml');

function parseArgs(tokens: string[]): { command?: string; args: Args } {
  const [command, ...rest] = tokens;
  const args: Args = {};
  for (let index = 0; index < rest.length; index += 1) {
    const token = rest[index];
    if (!token.startsWith('--')) continue;
    const key = token.slice(2);
    const next = rest[index + 1];
    if (next && !next.startsWith('--')) {
      args[key] = next;
      index += 1;
    } else {
      args[key] = true;
    }
  }
  return { command, args };
}

function run(command: string, args: string[], options: { capture?: boolean } = {}): string {
  return execFileSync(command, args, {
    cwd: ROOT,
    encoding: 'utf8',
    stdio: options.capture ? ['ignore', 'pipe', 'pipe'] : 'inherit'
  }).trim();
}

async function exists(filePath: string): Promise<boolean> {
  return access(filePath).then(() => true, () => false);
}

async function loadConfig(): Promise<LocalConfig> {
  if (!await exists(CONFIG_PATH)) {
    throw new Error('Missing .after-close.local.yaml. Run `pnpm after-close init` first.');
  }
  return parse(await readFile(CONFIG_PATH, 'utf8')) as LocalConfig;
}

async function promptValue(label: string, fallback: string): Promise<string> {
  if (!process.stdin.isTTY) return fallback;
  const prompt = createInterface({ input: process.stdin, output: process.stdout });
  try {
    const answer = await prompt.question(`${label} [${fallback}]: `);
    return answer.trim() || fallback;
  } finally {
    prompt.close();
  }
}

function assertTimezone(timezone: string): void {
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: timezone }).format(new Date());
  } catch {
    throw new Error(`Invalid IANA timezone: ${timezone}`);
  }
}

async function init(args: Args): Promise<void> {
  const content = await validateRepositoryContent(ROOT);
  const defaultTrader = typeof args['trader-id'] === 'string' ? args['trader-id'] : content.members[0]?.data.trader_id ?? '';
  const traderId = typeof args['trader-id'] === 'string' ? args['trader-id'] : await promptValue('Trader ID', defaultTrader);
  const member = content.members.find((entry) => entry.data.trader_id === traderId)?.data;
  if (!member || member.is_demo) {
    throw new Error(`Trader ID ${traderId || '(empty)'} is not an active configured member`);
  }

  const defaultMarket = typeof args['default-market'] === 'string'
    ? args['default-market']
    : await promptValue('Default market', member.markets[0]);
  const timezone = typeof args.timezone === 'string'
    ? args.timezone
    : await promptValue('Timezone', member.timezone);
  const disclosureMode = typeof args['disclosure-mode'] === 'string'
    ? args['disclosure-mode']
    : await promptValue('Disclosure mode', member.coverage.size_disclosure);
  assertTimezone(timezone);

  const config: LocalConfig = {
    trader_id: traderId,
    default_market: defaultMarket,
    timezone,
    disclosure_mode: disclosureMode,
    publication_policy: 'after_close'
  };
  await writeFile(CONFIG_PATH, stringify(config), { encoding: 'utf8', mode: 0o600 });
  console.log('Local member configuration created. This file is gitignored.');
}

async function doctor(): Promise<void> {
  const issues: string[] = [];
  const major = Number(process.versions.node.split('.')[0]);
  if (major < 24) issues.push(`Node.js 24 or newer is required; found ${process.versions.node}`);

  let config: LocalConfig | undefined;
  try {
    config = await loadConfig();
    assertTimezone(config.timezone);
  } catch (error) {
    issues.push(error instanceof Error ? error.message : String(error));
  }

  const content = await validateRepositoryContent(ROOT);
  if (content.issues.length > 0) issues.push('Repository content validation is failing');
  if (config && !content.members.some((entry) => entry.data.trader_id === config?.trader_id && !entry.data.is_demo)) {
    issues.push(`Local trader ${config.trader_id} is not present in the member registry`);
  }

  try {
    run('git', ['rev-parse', '--is-inside-work-tree'], { capture: true });
  } catch {
    issues.push('Current directory is not a Git worktree');
  }
  try {
    run('gh', ['auth', 'status'], { capture: true });
  } catch {
    issues.push('GitHub CLI is not authenticated; run `gh auth login`');
  }

  if (issues.length > 0) {
    console.error('Environment check failed:');
    for (const issue of issues) console.error(`- ${issue}`);
    process.exitCode = 1;
  } else {
    console.log(`Environment ready for ${config?.trader_id}.`);
  }
}

async function readDraft(input: string): Promise<Draft> {
  const raw = await readFile(path.resolve(ROOT, input), 'utf8');
  const draft = parse(raw) as Draft;
  if (!draft || typeof draft !== 'object' || typeof draft.body !== 'string' || !draft.frontmatter) {
    throw new Error('Draft must contain `frontmatter` and `body` fields');
  }
  return draft;
}

async function nextSequence(directory: string, date: string, symbol: string): Promise<string> {
  const files = await walkFiles(directory, new Set(['.md', '.mdx']));
  const prefix = `${date}-${symbol.toLowerCase()}-`;
  const used = files
    .map((filePath) => path.basename(filePath))
    .filter((name) => name.startsWith(prefix))
    .map((name) => Number(name.slice(prefix.length, prefix.length + 2)))
    .filter(Number.isFinite);
  return String((used.length === 0 ? 0 : Math.max(...used)) + 1).padStart(2, '0');
}

async function createRecord(args: Args): Promise<void> {
  if (typeof args.input !== 'string') throw new Error('Record creation requires --input <draft.yaml>');
  const config = await loadConfig();
  const draft = await readDraft(args.input);
  const occurredRaw = String(draft.frontmatter.occurred_at ?? '');
  const date = occurredRaw.slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error('occurred_at must start with an ISO date');
  const symbol = String(draft.frontmatter.symbol ?? '').toLowerCase();
  if (!symbol) throw new Error('symbol is required');
  const directory = path.join(ROOT, 'src/content/records', config.trader_id, date.slice(0, 4), date.slice(5, 7));
  const sequence = await nextSequence(directory, date, symbol);
  const compactDate = date.replaceAll('-', '');
  const frontmatter = {
    ...draft.frontmatter,
    id: draft.frontmatter.id ?? `${config.trader_id}-${compactDate}-${symbol}-${sequence}`,
    case_id: draft.frontmatter.case_id ?? `${config.trader_id}-${symbol}-${compactDate}-${sequence}`,
    author: config.trader_id,
    publication: draft.frontmatter.publication ?? 'after_close'
  };
  const parsed = recordSchema.safeParse(frontmatter);
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('\n'));
  }
  const policyIssues = validateRecordPolicy(parsed.data, draft.body);
  if (policyIssues.length > 0) throw new Error(`Content policy failed: ${policyIssues.join(', ')}`);
  await mkdir(directory, { recursive: true });
  const output = path.join(directory, `${date}-${symbol}-${sequence}.md`);
  if (await exists(output)) throw new Error(`Refusing to overwrite ${path.relative(ROOT, output)}`);
  await writeFile(output, `---\n${stringify(frontmatter).trim()}\n---\n\n${draft.body.trim()}\n`, 'utf8');
  console.log(path.relative(ROOT, output));
}

async function createReview(args: Args): Promise<void> {
  if (typeof args.input !== 'string') throw new Error('Review creation requires --input <draft.yaml>');
  const config = await loadConfig();
  const draft = await readDraft(args.input);
  const period = String(draft.frontmatter.period ?? '');
  const frontmatter = {
    ...draft.frontmatter,
    id: draft.frontmatter.id ?? `${config.trader_id}-review-${period}`,
    author: config.trader_id,
    type: 'monthly'
  };
  const parsed = reviewSchema.safeParse(frontmatter);
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('\n'));
  }
  const policyIssues = findPolicyViolations(draft.body);
  if (policyIssues.length > 0) throw new Error(`Content policy failed: ${policyIssues.join(', ')}`);
  const directory = path.join(ROOT, 'src/content/reviews', config.trader_id, period.slice(0, 4));
  await mkdir(directory, { recursive: true });
  const output = path.join(directory, `${period}.md`);
  if (await exists(output)) throw new Error(`Refusing to overwrite ${path.relative(ROOT, output)}`);
  await writeFile(output, `---\n${stringify(frontmatter).trim()}\n---\n\n${draft.body.trim()}\n`, 'utf8');
  console.log(path.relative(ROOT, output));
}

async function validateAll(): Promise<void> {
  const content = await validateRepositoryContent(ROOT);
  const policyIssues = [
    ...content.records.flatMap((entry) => validateRecordPolicy(entry.data, entry.body ?? '').map((issue) => `${entry.relativePath}: ${issue}`)),
    ...content.reviews.flatMap((entry) => findPolicyViolations(entry.body ?? '').map((issue) => `${entry.relativePath}: ${issue}`))
  ];
  const issues = [...content.issues, ...policyIssues];
  if (issues.length > 0) throw new Error(issues.join('\n'));
  console.log(`Validated ${content.records.length} record(s) and ${content.reviews.length} review(s).`);
}

async function publish(args: Args): Promise<void> {
  if (args.confirm !== true || args['market-closed'] !== true) {
    throw new Error('Publishing requires both --confirm and --market-closed after the user reviews the content and Git Diff');
  }
  if (typeof args.title !== 'string') throw new Error('Publishing requires --title <text>');
  const config = await loadConfig();
  await validateAll();
  run('gh', ['auth', 'status'], { capture: true });
  const branch = run('git', ['branch', '--show-current'], { capture: true });
  if (branch === 'main') {
    const timestamp = new Date().toISOString().replace(/[-:TZ.]/g, '').slice(0, 14);
    run('git', ['switch', '-c', `content/${config.trader_id}/${timestamp}`]);
  }
  const recordPath = `src/content/records/${config.trader_id}`;
  const reviewPath = `src/content/reviews/${config.trader_id}`;
  run('git', ['add', '--', recordPath, reviewPath]);
  const staged = run('git', ['diff', '--cached', '--name-only'], { capture: true });
  if (!staged) throw new Error('No member content changes are staged');
  run('git', ['commit', '-m', `content(${config.trader_id}): ${args.title}`]);
  const currentBranch = run('git', ['branch', '--show-current'], { capture: true });
  run('git', ['push', '--set-upstream', 'origin', currentBranch]);
  const prUrl = run('gh', ['pr', 'create', '--fill', '--title', args.title], { capture: true });
  if (args['auto-merge'] === true) run('gh', ['pr', 'merge', '--auto', '--squash', prUrl]);
  console.log(prUrl);
}

function help(): void {
  console.log(`After Close CLI

Commands:
  init [--trader-id ID --default-market US --timezone Asia/Shanghai]
  doctor
  validate
  record --input draft.yaml
  review --input draft.yaml
  publish --title TEXT --confirm --market-closed [--auto-merge]
`);
}

const { command, args } = parseArgs(process.argv.slice(2));

try {
  switch (command) {
    case 'init': await init(args); break;
    case 'doctor': await doctor(); break;
    case 'validate': await validateAll(); break;
    case 'record': await createRecord(args); break;
    case 'review': await createReview(args); break;
    case 'publish': await publish(args); break;
    case 'help':
    case '--help':
    case undefined: help(); break;
    default: throw new Error(`Unknown command: ${command}`);
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
