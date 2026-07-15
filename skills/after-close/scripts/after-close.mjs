#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
let root = path.resolve(here, '../../..');

while (!existsSync(path.join(root, 'package.json'))) {
  const parent = path.dirname(root);
  if (parent === root) throw new Error('Could not find the After Close repository root');
  root = parent;
}

execFileSync(process.execPath, ['--import', 'tsx', path.join(root, 'scripts/after-close.ts'), ...process.argv.slice(2)], {
  cwd: root,
  stdio: 'inherit'
});
