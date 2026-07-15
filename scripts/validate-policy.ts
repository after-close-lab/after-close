import process from 'node:process';
import { validateRepositoryContent } from './lib/content';
import { findPolicyViolations, validateRecordPolicy } from './lib/policy';

const content = await validateRepositoryContent(process.cwd());
const issues: string[] = [];

for (const entry of content.records) {
  for (const violation of validateRecordPolicy(entry.data, entry.body ?? '')) {
    issues.push(`${entry.relativePath}: ${violation}`);
  }
}

for (const entry of content.reviews) {
  for (const violation of findPolicyViolations(entry.body ?? '')) {
    issues.push(`${entry.relativePath}: ${violation}`);
  }
}

if (issues.length > 0) {
  console.error(`Content policy validation failed with ${issues.length} issue(s):`);
  for (const issue of issues) console.error(`- ${issue}`);
  process.exitCode = 1;
} else {
  console.log('Content policy valid.');
}
