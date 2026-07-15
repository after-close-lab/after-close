import process from 'node:process';
import { validateRepositoryContent } from './lib/content';

const result = await validateRepositoryContent(process.cwd());

if (result.issues.length > 0) {
  console.error(`Content validation failed with ${result.issues.length} issue(s):`);
  for (const issue of result.issues) console.error(`- ${issue}`);
  process.exitCode = 1;
} else {
  console.log(`Content valid: ${result.members.length} member(s), ${result.records.length} record(s), ${result.reviews.length} review(s).`);
}
