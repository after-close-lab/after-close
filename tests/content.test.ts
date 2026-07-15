import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { validateRepositoryContent } from '../scripts/lib/content';

describe('repository fixtures', () => {
  it('form a valid and complete demo case', async () => {
    const result = await validateRepositoryContent(path.resolve('.'));
    expect(result.issues).toEqual([]);
    expect(result.records).toHaveLength(4);
    expect(result.reviews).toHaveLength(1);
  });
});
