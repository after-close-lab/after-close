import type { DecisionRecord } from '../../src/lib/schemas';

const FORBIDDEN_PATTERNS: Array<{ label: string; pattern: RegExp }> = [
  { label: '荐股表达', pattern: /建议(?:大家|你|读者).{0,8}(?:买入|卖出|加仓)/i },
  { label: '跟单表达', pattern: /(?:现在可以跟|跟着我买|复制(?:这笔|我的)交易|copy this trade)/i },
  { label: '保证收益', pattern: /(?:稳赚|保证收益|保本高收益|guaranteed returns?)/i },
  { label: '即时信号', pattern: /(?:立即买入|盘中机会|buy now|real[- ]?time signal)/i },
  { label: '收费荐股', pattern: /(?:付费荐股|股票推荐群|paid stock picks?)/i }
];

export function findPolicyViolations(text: string): string[] {
  return FORBIDDEN_PATTERNS
    .filter(({ pattern }) => pattern.test(text))
    .map(({ label }) => label);
}

export function validateRecordPolicy(record: DecisionRecord, body: string): string[] {
  const issues = findPolicyViolations(`${record.title}\n${record.thesis}\n${body}`);
  if (record.publication !== 'after_close' && record.publication !== 'retrospective') {
    issues.push('V1 只允许 after_close 或 retrospective 发布策略');
  }
  return issues;
}
