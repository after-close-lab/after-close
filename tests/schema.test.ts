import { describe, expect, it } from 'vitest';
import { memberSchema, recordSchema, reviewSchema } from '../src/lib/schemas';

const validRecord = {
  id: 'alice-20260714-demo-01',
  case_id: 'alice-demo-20260714-01',
  author: 'alice',
  title: 'DEMO protocol record',
  occurred_at: '2026-07-14T10:00:00-04:00',
  recorded_at: '2026-07-14T20:00:00-04:00',
  market: 'OTHER',
  symbol: 'DEMO',
  asset_type: 'stock',
  direction: 'long',
  position_effect: 'open',
  currency: 'USD',
  holding_horizon: 'swing',
  strategies: ['experimental'],
  confidence: 3,
  publication: 'after_close',
  risk: {
    disclosure_mode: 'percentage',
    position_pct: 2,
    risk_budget_pct: 0.4,
    invalidation: 'The member-provided validation condition fails',
    exit_plan: 'Exit when the hypothesis fails or time expires'
  },
  thesis: 'A sufficiently detailed member-provided protocol test hypothesis',
  status: 'active',
  disclaimer: 'personal-record'
};

describe('record schema', () => {
  it('accepts a complete open record', () => {
    expect(recordSchema.safeParse(validRecord).success).toBe(true);
  });

  it('rejects an open record without a member-provided risk budget', () => {
    const record = structuredClone(validRecord);
    delete (record.risk as Partial<typeof record.risk>).risk_budget_pct;
    expect(recordSchema.safeParse(record).success).toBe(false);
  });

  it('rejects a close record without a result summary', () => {
    const record = { ...validRecord, position_effect: 'close', status: 'closed' };
    expect(recordSchema.safeParse(record).success).toBe(false);
  });
});

describe('member and review schemas', () => {
  it('accepts an invited member with a coverage statement', () => {
    expect(memberSchema.safeParse({
      trader_id: 'alice',
      github: 'alice-dev',
      display_name: 'Alice',
      bio: 'A long-form decision journal participant.',
      philosophy: 'Risk and process before outcomes.',
      status: 'active',
      joined_at: '2026-07-01',
      timezone: 'Asia/Shanghai',
      markets: ['US'],
      instruments: ['stock'],
      strategies: ['fundamental'],
      coverage: {
        accounts: 'Personal active US equity account',
        markets: ['US'],
        instruments: ['stock'],
        included: ['All active decisions'],
        excluded: ['Passive investments'],
        publication_policy: 'after_close',
        size_disclosure: 'percentage'
      }
    }).success).toBe(true);
  });

  it('accepts a traceable monthly review', () => {
    expect(reviewSchema.safeParse({
      id: 'alice-review-2026-07',
      author: 'alice',
      period: '2026-07',
      type: 'monthly',
      created_at: '2026-08-02T20:00:00+08:00',
      record_count: 1,
      case_count: 1,
      closed_case_count: 0,
      coverage_complete: true,
      strategies: ['experimental'],
      top_error_tags: [],
      related_records: ['alice-20260714-demo-01'],
      disclaimer: 'personal-review'
    }).success).toBe(true);
  });
});
