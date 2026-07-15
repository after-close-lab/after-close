import type { DecisionRecord } from './schemas';

export const SITE_NAME = 'After Close';
export const SITE_DESCRIPTION = '记录收益曲线之外的判断、风险与成长。';

export function withBase(pathname = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const path = pathname === '/' ? '' : `/${pathname.replace(/^\//, '').replace(/\/$/, '')}`;
  return `${base}${path}/`;
}

export function formatDate(date: Date, includeTime = false): string {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    ...(includeTime ? { hour: '2-digit', minute: '2-digit', hour12: false } : {}),
    timeZone: 'UTC'
  }).format(date);
}

export function formatPercent(value?: number): string {
  return value === undefined ? '未披露' : `${value.toFixed(value % 1 === 0 ? 0 : 1)}%`;
}

export const positionEffectLabels: Record<DecisionRecord['position_effect'], string> = {
  open: '建仓',
  increase: '加仓',
  reduce: '减仓',
  close: '平仓',
  hold: '持有',
  hedge: '对冲',
  cancel: '取消',
  expire: '到期',
  exercise: '行权',
  assign: '指派'
};

export const directionLabels: Record<DecisionRecord['direction'], string> = {
  long: '多头',
  short: '空头',
  neutral: '中性'
};
