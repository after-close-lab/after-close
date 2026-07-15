import { describe, expect, it } from 'vitest';
import type { Member } from '../src/lib/schemas';
import { validateOwnership } from '../scripts/lib/ownership';

const member = {
  trader_id: 'alice',
  github: 'alice-dev',
  display_name: 'Alice',
  bio: 'Test member',
  philosophy: 'Risk first',
  status: 'active',
  joined_at: new Date('2026-07-01'),
  timezone: 'Asia/Shanghai',
  markets: ['US'],
  instruments: ['stock'],
  strategies: [],
  coverage: {
    accounts: 'Test account',
    markets: ['US'],
    instruments: ['stock'],
    included: ['All active decisions'],
    excluded: [],
    publication_policy: 'after_close',
    size_disclosure: 'percentage'
  },
  noindex: false,
  is_demo: false
} satisfies Member;

describe('ownership validation', () => {
  it('allows maintainers to modify core files', () => {
    expect(validateOwnership({
      actor: 'owner',
      changedFiles: ['src/lib/schemas.ts', '.github/workflows/validate.yml'],
      maintainers: ['owner'],
      members: [member]
    })).toEqual([]);
  });

  it('allows a member to modify only their own content', () => {
    expect(validateOwnership({
      actor: 'alice-dev',
      changedFiles: ['src/content/records/alice/2026/07/example.md'],
      maintainers: ['owner'],
      members: [member]
    })).toEqual([]);
  });

  it('rejects another member directory and core files', () => {
    expect(validateOwnership({
      actor: 'alice-dev',
      changedFiles: ['src/content/records/bob/2026/07/example.md', 'src/lib/schemas.ts'],
      maintainers: ['owner'],
      members: [member]
    })).toHaveLength(2);
  });

  it('rejects external users', () => {
    expect(validateOwnership({
      actor: 'outsider',
      changedFiles: ['src/content/records/outsider/example.md'],
      maintainers: ['owner'],
      members: [member]
    })).toEqual(['GitHub user outsider is not an invited member']);
  });
});
