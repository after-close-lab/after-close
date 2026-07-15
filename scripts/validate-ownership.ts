import { execFileSync } from 'node:child_process';
import process from 'node:process';
import { parse } from 'yaml';
import { memberSchema, type Member } from '../src/lib/schemas';
import { validateRepositoryContent } from './lib/content';
import { validateOwnership } from './lib/ownership';

type AccessControl = { maintainers?: string[] };

function git(...args: string[]): string {
  return execFileSync('git', args, { encoding: 'utf8' }).trim();
}

function readFromRevision(revision: string, filePath: string): string {
  return git('show', `${revision}:${filePath}`);
}

const actor = process.env.GITHUB_ACTOR;
const base = process.env.GITHUB_BASE_SHA ?? process.argv[2];
const head = process.env.GITHUB_HEAD_SHA ?? process.argv[3] ?? 'HEAD';

if (!actor || !base) {
  console.log('Ownership validation skipped locally: GITHUB_ACTOR and base SHA are required.');
  process.exit(0);
}

let maintainers: string[] = [];
let members: Member[] = [];

try {
  const access = parse(readFromRevision(base, '.github/access-control.yaml')) as AccessControl;
  maintainers = access.maintainers ?? [];
  const memberFiles = git('ls-tree', '-r', '--name-only', base, 'src/content/members')
    .split('\n')
    .filter(Boolean);
  members = memberFiles.map((filePath) => memberSchema.parse(parse(readFromRevision(base, filePath))));
} catch {
  const current = await validateRepositoryContent(process.cwd());
  members = current.members.map((entry) => entry.data);
  const access = parse(await import('node:fs/promises').then(({ readFile }) => readFile('.github/access-control.yaml', 'utf8'))) as AccessControl;
  maintainers = access.maintainers ?? [];
}

const changedFiles = git('diff', '--name-only', '--diff-filter=ACMRD', `${base}...${head}`)
  .split('\n')
  .filter(Boolean);
const issues = validateOwnership({ actor, changedFiles, maintainers, members });

if (issues.length > 0) {
  console.error(`Ownership validation failed with ${issues.length} issue(s):`);
  for (const issue of issues) console.error(`- ${issue}`);
  process.exitCode = 1;
} else {
  console.log(`Ownership valid for ${actor}: ${changedFiles.length} changed file(s).`);
}
