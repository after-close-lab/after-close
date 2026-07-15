import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { validateRepositoryContent } from './lib/content';

const content = await validateRepositoryContent(process.cwd());
if (content.issues.length > 0) {
  throw new Error('Cannot generate statistics while content validation is failing');
}

const completedCases = new Set(
  content.records
    .filter((entry) => ['close', 'expire', 'cancel'].includes(entry.data.position_effect))
    .map((entry) => entry.data.case_id)
);
const strategyCounts = Object.entries(
  content.records.flatMap((entry) => entry.data.strategies).reduce<Record<string, number>>((counts, strategy) => {
    counts[strategy] = (counts[strategy] ?? 0) + 1;
    return counts;
  }, {})
).sort((left, right) => right[1] - left[1]);
const riskComplete = content.records.filter((entry) => {
  if (!['open', 'increase'].includes(entry.data.position_effect)) return false;
  return Boolean(entry.data.risk.invalidation && entry.data.risk.exit_plan);
}).length;
const riskApplicable = content.records.filter((entry) => ['open', 'increase'].includes(entry.data.position_effect)).length;

const statistics = {
  generated_at: new Date().toISOString(),
  member_count: content.members.filter((entry) => entry.data.status === 'active' && !entry.data.is_demo).length,
  record_count: content.records.filter((entry) => !entry.data.is_demo).length,
  review_count: content.reviews.filter((entry) => !entry.data.is_demo).length,
  completed_case_count: completedCases.size,
  risk_field_completion_rate: riskApplicable === 0 ? null : Number((riskComplete / riskApplicable).toFixed(4)),
  strategy_counts: strategyCounts.map(([strategy, count]) => ({ strategy, count }))
};

const output = path.join(process.cwd(), 'public/data/stats.json');
await mkdir(path.dirname(output), { recursive: true });
await writeFile(output, `${JSON.stringify(statistics, null, 2)}\n`, 'utf8');
console.log(`Generated ${path.relative(process.cwd(), output)}.`);
