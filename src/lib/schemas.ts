import { z } from 'zod';

export const TRADER_ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const RECORD_ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const MARKETS = ['US', 'CN', 'HK', 'JP', 'EU', 'CRYPTO', 'OTHER'] as const;
export const ASSET_TYPES = [
  'stock',
  'etf',
  'option',
  'future',
  'forex',
  'crypto',
  'bond',
  'other'
] as const;
export const DIRECTIONS = ['long', 'short', 'neutral'] as const;
export const POSITION_EFFECTS = [
  'open',
  'increase',
  'reduce',
  'close',
  'hold',
  'hedge',
  'cancel',
  'expire',
  'exercise',
  'assign'
] as const;
export const HOLDING_HORIZONS = ['intraday', 'swing', 'position', 'long-term'] as const;
export const STRATEGY_TAGS = [
  'trend',
  'mean-reversion',
  'breakout',
  'event-driven',
  'earnings',
  'industry-cycle',
  'valuation',
  'fundamental',
  'technical',
  'macro',
  'arbitrage',
  'hedging',
  'income',
  'special-situation',
  'experimental'
] as const;
export const ERROR_TAGS = [
  'fomo',
  'oversizing',
  'late-entry',
  'early-exit',
  'late-exit',
  'ignored-invalidation',
  'thesis-drift',
  'confirmation-bias',
  'revenge-trading',
  'overtrading',
  'under-researched',
  'poor-timing',
  'plan-execution-gap',
  'risk-underestimated',
  'no-error'
] as const;
export const DISCLOSURE_MODES = ['full', 'percentage', 'minimal'] as const;

const traderId = z.string().regex(TRADER_ID_PATTERN, 'Use lowercase letters, digits, and hyphens only');
const recordId = z.string().regex(RECORD_ID_PATTERN, 'Use lowercase letters, digits, and hyphens only');
const market = z.enum(MARKETS);
const assetType = z.enum(ASSET_TYPES);
const strategyTag = z.enum(STRATEGY_TAGS);
const errorTag = z.enum(ERROR_TAGS);
const disclosureMode = z.enum(DISCLOSURE_MODES);

export const memberSchema = z.object({
  trader_id: traderId,
  github: z.string().min(1).regex(/^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/),
  display_name: z.string().min(1).max(80),
  bio: z.string().min(1).max(500),
  philosophy: z.string().min(1).max(500),
  status: z.enum(['active', 'inactive']),
  joined_at: z.coerce.date(),
  timezone: z.string().min(1),
  markets: z.array(market).min(1),
  instruments: z.array(assetType).min(1),
  strategies: z.array(strategyTag).default([]),
  coverage: z.object({
    accounts: z.string().min(1),
    markets: z.array(market).min(1),
    instruments: z.array(assetType).min(1),
    included: z.array(z.string().min(1)).min(1),
    excluded: z.array(z.string().min(1)).default([]),
    publication_policy: z.literal('after_close'),
    size_disclosure: disclosureMode
  }),
  noindex: z.boolean().default(false),
  is_demo: z.boolean().default(false)
});

const riskSchema = z.object({
  disclosure_mode: disclosureMode,
  position_pct: z.number().min(0).max(100).optional(),
  risk_budget_pct: z.number().min(0).max(100).optional(),
  risk_note: z.string().min(1).optional(),
  invalidation: z.string().min(5),
  exit_plan: z.string().min(5)
});

const resultSchema = z.object({
  summary: z.string().min(1).optional(),
  realized_return_pct: z.number().nullable().optional(),
  realized_r: z.number().nullable().optional(),
  fees: z.number().min(0).nullable().optional(),
  followed_plan: z.boolean().optional(),
  thesis_still_valid: z.boolean().optional()
});

export const recordSchema = z.object({
  id: recordId,
  case_id: recordId,
  author: traderId,
  title: z.string().min(3).max(160),
  occurred_at: z.coerce.date(),
  recorded_at: z.coerce.date(),
  market,
  symbol: z.string().min(1).max(24).regex(/^[A-Za-z0-9./:_-]+$/),
  asset_type: assetType,
  direction: z.enum(DIRECTIONS),
  position_effect: z.enum(POSITION_EFFECTS),
  currency: z.string().length(3).transform((value) => value.toUpperCase()),
  holding_horizon: z.enum(HOLDING_HORIZONS),
  strategies: z.array(strategyTag).min(1),
  confidence: z.number().int().min(1).max(5),
  publication: z.enum(['after_close', 'delayed', 'retrospective']),
  risk: riskSchema,
  thesis: z.string().min(10),
  status: z.enum(['planned', 'active', 'closed', 'cancelled', 'expired']),
  disclaimer: z.literal('personal-record'),
  record_type: z.enum(['decision', 'amendment']).default('decision'),
  price: z.number().min(0).optional(),
  quantity: z.number().positive().optional(),
  broker: z.literal('hidden').optional(),
  order_type: z.enum(['market', 'limit', 'stop', 'stop-limit', 'other']).optional(),
  instrument: z.object({
    underlying: z.string().min(1),
    option_type: z.enum(['call', 'put']).optional(),
    strike: z.number().positive().optional(),
    expiry: z.coerce.date().optional()
  }).optional(),
  portfolio: z.object({
    position_pct_before: z.number().min(0).max(100).optional(),
    position_pct_after: z.number().min(0).max(100).optional()
  }).optional(),
  result: resultSchema.optional(),
  emotion: z.object({
    before: z.string().min(1),
    after: z.string().min(1)
  }).optional(),
  sources: z.array(z.object({
    title: z.string().min(1),
    url: z.url()
  })).default([]),
  amends: recordId.nullable().optional(),
  related_records: z.array(recordId).default([]),
  error_tags: z.array(errorTag).default([]),
  is_demo: z.boolean().default(false)
}).superRefine((record, context) => {
  if (['open', 'increase'].includes(record.position_effect)) {
    if (record.risk.disclosure_mode !== 'minimal' && record.risk.position_pct === undefined) {
      context.addIssue({
        code: 'custom',
        path: ['risk', 'position_pct'],
        message: 'Open and increase records require position_pct unless disclosure mode is minimal'
      });
    }
    if (record.risk.risk_budget_pct === undefined && !record.risk.risk_note) {
      context.addIssue({
        code: 'custom',
        path: ['risk', 'risk_budget_pct'],
        message: 'Open and increase records require risk_budget_pct or risk_note'
      });
    }
  }

  if (['reduce', 'close'].includes(record.position_effect) && !record.result?.summary) {
    context.addIssue({
      code: 'custom',
      path: ['result', 'summary'],
      message: 'Reduce and close records require a result summary'
    });
  }

  if (record.record_type === 'amendment' && !record.amends) {
    context.addIssue({
      code: 'custom',
      path: ['amends'],
      message: 'Amendments must reference the record they amend'
    });
  }
});

export const reviewSchema = z.object({
  id: recordId,
  author: traderId,
  period: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/),
  type: z.literal('monthly'),
  created_at: z.coerce.date(),
  record_count: z.number().int().min(0),
  case_count: z.number().int().min(0),
  closed_case_count: z.number().int().min(0),
  coverage_complete: z.boolean(),
  strategies: z.array(strategyTag).default([]),
  top_error_tags: z.array(errorTag).default([]),
  related_records: z.array(recordId).default([]),
  disclaimer: z.literal('personal-review'),
  is_demo: z.boolean().default(false)
});

export type Member = z.infer<typeof memberSchema>;
export type DecisionRecord = z.infer<typeof recordSchema>;
export type MonthlyReview = z.infer<typeof reviewSchema>;
