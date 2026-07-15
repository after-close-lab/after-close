import { readFile } from 'node:fs/promises';
import process from 'node:process';
import { relativeUnix, walkFiles } from './lib/files';

const SKIP_SEGMENTS = new Set(['.git', '.astro', 'dist', 'node_modules', 'coverage']);
const TEXT_EXTENSIONS = new Set(['.astro', '.json', '.md', '.mjs', '.ts', '.yaml', '.yml']);
const PATTERNS: Array<{ label: string; pattern: RegExp }> = [
  { label: 'GitHub token', pattern: /\bgh[pousr]_[A-Za-z0-9]{30,}\b/g },
  { label: 'OpenAI-style API key', pattern: /\bsk-[A-Za-z0-9_-]{24,}\b/g },
  { label: 'AWS access key', pattern: /\bAKIA[0-9A-Z]{16}\b/g },
  { label: 'private key', pattern: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g },
  { label: 'broker or order number', pattern: /(?:券商账号|银行账号|订单号|broker account|order id)\s*[:：]\s*[A-Za-z0-9-]{6,}/gi }
];

const root = process.cwd();
const allFiles = await walkFiles(root, TEXT_EXTENSIONS);
const files = allFiles.filter((filePath) => {
  const relative = relativeUnix(root, filePath);
  return !relative.split('/').some((segment) => SKIP_SEGMENTS.has(segment));
});
const issues: string[] = [];

for (const filePath of files) {
  const source = await readFile(filePath, 'utf8');
  for (const { label, pattern } of PATTERNS) {
    pattern.lastIndex = 0;
    const match = pattern.exec(source);
    if (match) {
      const line = source.slice(0, match.index).split('\n').length;
      issues.push(`${relativeUnix(root, filePath)}:${line}: possible ${label}`);
    }
  }
}

if (issues.length > 0) {
  console.error(`Sensitive-data scan failed with ${issues.length} issue(s):`);
  for (const issue of issues) console.error(`- ${issue}`);
  process.exitCode = 1;
} else {
  console.log(`Sensitive-data scan passed for ${files.length} text file(s).`);
}
