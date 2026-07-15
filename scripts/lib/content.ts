import path from 'node:path';
import type { ZodError } from 'zod';
import {
  memberSchema,
  recordSchema,
  reviewSchema,
  type DecisionRecord,
  type Member,
  type MonthlyReview
} from '../../src/lib/schemas';
import { readFrontmatterFile, readYamlFile, relativeUnix, walkFiles } from './files';

export type LoadedEntry<T> = {
  body?: string;
  data: T;
  filePath: string;
  relativePath: string;
};

export type ContentValidationResult = {
  issues: string[];
  members: LoadedEntry<Member>[];
  records: LoadedEntry<DecisionRecord>[];
  reviews: LoadedEntry<MonthlyReview>[];
};

function formatZodError(relativePath: string, error: ZodError): string[] {
  return error.issues.map((issue) => {
    const field = issue.path.length > 0 ? `:${issue.path.join('.')}` : '';
    return `${relativePath}${field}: ${issue.message}`;
  });
}

export async function validateRepositoryContent(repoRoot: string): Promise<ContentValidationResult> {
  const issues: string[] = [];
  const members: LoadedEntry<Member>[] = [];
  const records: LoadedEntry<DecisionRecord>[] = [];
  const reviews: LoadedEntry<MonthlyReview>[] = [];
  const contentRoot = path.join(repoRoot, 'src/content');

  for (const filePath of await walkFiles(path.join(contentRoot, 'members'), new Set(['.yaml', '.yml']))) {
    const relativePath = relativeUnix(repoRoot, filePath);
    try {
      const result = memberSchema.safeParse(await readYamlFile(filePath));
      if (!result.success) {
        issues.push(...formatZodError(relativePath, result.error));
        continue;
      }
      if (path.basename(filePath).replace(/\.ya?ml$/, '') !== result.data.trader_id) {
        issues.push(`${relativePath}: filename must match trader_id ${result.data.trader_id}`);
      }
      members.push({ data: result.data, filePath, relativePath });
    } catch (error) {
      issues.push(`${relativePath}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  for (const filePath of await walkFiles(path.join(contentRoot, 'records'), new Set(['.md', '.mdx']))) {
    const relativePath = relativeUnix(repoRoot, filePath);
    try {
      const source = await readFrontmatterFile(filePath);
      const result = recordSchema.safeParse(source.data);
      if (!result.success) {
        issues.push(...formatZodError(relativePath, result.error));
        continue;
      }
      const pathAuthor = path.relative(path.join(contentRoot, 'records'), filePath).split(path.sep)[0];
      if (pathAuthor !== result.data.author) {
        issues.push(`${relativePath}: author ${result.data.author} does not match directory ${pathAuthor}`);
      }
      if (!source.body) {
        issues.push(`${relativePath}: Markdown body must not be empty`);
      }
      records.push({ data: result.data, body: source.body, filePath, relativePath });
    } catch (error) {
      issues.push(`${relativePath}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  for (const filePath of await walkFiles(path.join(contentRoot, 'reviews'), new Set(['.md', '.mdx']))) {
    const relativePath = relativeUnix(repoRoot, filePath);
    try {
      const source = await readFrontmatterFile(filePath);
      const result = reviewSchema.safeParse(source.data);
      if (!result.success) {
        issues.push(...formatZodError(relativePath, result.error));
        continue;
      }
      const pathAuthor = path.relative(path.join(contentRoot, 'reviews'), filePath).split(path.sep)[0];
      if (pathAuthor !== result.data.author) {
        issues.push(`${relativePath}: author ${result.data.author} does not match directory ${pathAuthor}`);
      }
      if (!source.body) {
        issues.push(`${relativePath}: Markdown body must not be empty`);
      }
      reviews.push({ data: result.data, body: source.body, filePath, relativePath });
    } catch (error) {
      issues.push(`${relativePath}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  const memberIds = new Set(members.map((entry) => entry.data.trader_id));
  const recordIds = new Set<string>();
  const reviewIds = new Set<string>();

  for (const entry of records) {
    if (!memberIds.has(entry.data.author)) {
      issues.push(`${entry.relativePath}: unknown author ${entry.data.author}`);
    }
    if (recordIds.has(entry.data.id)) {
      issues.push(`${entry.relativePath}: duplicate record id ${entry.data.id}`);
    }
    recordIds.add(entry.data.id);
  }

  for (const entry of reviews) {
    if (!memberIds.has(entry.data.author)) {
      issues.push(`${entry.relativePath}: unknown author ${entry.data.author}`);
    }
    if (reviewIds.has(entry.data.id)) {
      issues.push(`${entry.relativePath}: duplicate review id ${entry.data.id}`);
    }
    reviewIds.add(entry.data.id);
  }

  const caseGroups = new Map<string, LoadedEntry<DecisionRecord>[]>();
  for (const entry of records.filter((item) => item.data.record_type === 'decision')) {
    const group = caseGroups.get(entry.data.case_id) ?? [];
    group.push(entry);
    caseGroups.set(entry.data.case_id, group);
  }

  for (const [caseId, group] of caseGroups) {
    group.sort((left, right) => left.data.occurred_at.getTime() - right.data.occurred_at.getTime());
    if (group[0]?.data.position_effect !== 'open') {
      issues.push(`${group[0]?.relativePath ?? caseId}: first decision in case ${caseId} must be open`);
    }
    const author = group[0]?.data.author;
    const symbol = group[0]?.data.symbol;
    for (const entry of group) {
      if (entry.data.author !== author) {
        issues.push(`${entry.relativePath}: case ${caseId} cannot span multiple authors`);
      }
      if (entry.data.symbol !== symbol) {
        issues.push(`${entry.relativePath}: case ${caseId} cannot span multiple symbols`);
      }
    }
  }

  for (const entry of records) {
    if (entry.data.amends && !recordIds.has(entry.data.amends)) {
      issues.push(`${entry.relativePath}: amends references missing record ${entry.data.amends}`);
    }
    for (const related of entry.data.related_records) {
      if (!recordIds.has(related)) {
        issues.push(`${entry.relativePath}: related_records references missing record ${related}`);
      }
    }
  }

  for (const entry of reviews) {
    const authorPeriodRecords = records.filter((record) => {
      const occurred = record.data.occurred_at;
      const period = `${occurred.getUTCFullYear()}-${String(occurred.getUTCMonth() + 1).padStart(2, '0')}`;
      return record.data.author === entry.data.author && period === entry.data.period;
    });
    if (entry.data.record_count !== authorPeriodRecords.length) {
      issues.push(`${entry.relativePath}: record_count is ${entry.data.record_count}, expected ${authorPeriodRecords.length}`);
    }
    for (const related of entry.data.related_records) {
      if (!recordIds.has(related)) {
        issues.push(`${entry.relativePath}: related_records references missing record ${related}`);
      }
    }
  }

  return { issues, members, records, reviews };
}
