import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'yaml';

export type FrontmatterFile = {
  body: string;
  data: unknown;
};

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/;

export async function walkFiles(directory: string, extensions?: Set<string>): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true }).catch(() => []);
  const files: string[] = [];

  for (const entry of entries) {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walkFiles(filePath, extensions));
    } else if (!extensions || extensions.has(path.extname(entry.name))) {
      files.push(filePath);
    }
  }

  return files.sort();
}

export async function readYamlFile(filePath: string): Promise<unknown> {
  return parse(await readFile(filePath, 'utf8'));
}

export async function readFrontmatterFile(filePath: string): Promise<FrontmatterFile> {
  const source = await readFile(filePath, 'utf8');
  const match = source.match(FRONTMATTER);
  if (!match) {
    throw new Error('Missing YAML Frontmatter');
  }

  return {
    data: parse(match[1]),
    body: source.slice(match[0].length).trim()
  };
}

export function relativeUnix(root: string, filePath: string): string {
  return path.relative(root, filePath).split(path.sep).join('/');
}
