import { describe, expect, it } from 'vitest';
import { findPolicyViolations } from '../scripts/lib/policy';

describe('content policy', () => {
  it('allows personal historical language', () => {
    expect(findPolicyViolations('我在当时基于以下理由建立仓位，并记录自己的失效条件。')).toEqual([]);
  });

  it('blocks recommendation and promise language', () => {
    expect(findPolicyViolations('建议大家立即买入，这是一笔稳赚的交易。')).toEqual(
      expect.arrayContaining(['荐股表达', '保证收益', '即时信号'])
    );
  });

  it('blocks follow-trading language', () => {
    expect(findPolicyViolations('现在可以跟着我买。')).toContain('跟单表达');
  });
});
