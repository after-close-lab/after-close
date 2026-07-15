# Decision record guide

## Case rules

- Use one `case_id` for the full lifecycle of one trading hypothesis.
- Start a Case with `position_effect: open`.
- Reuse the Case for `increase`, `reduce`, `hold`, `hedge`, `close`, `expire`, `exercise`, `assign`, and `cancel` actions.
- Split unrelated decisions even when they share a symbol.
- Preserve one author and symbol within a Case.

## Required fields

Every decision requires:

- `title`, `occurred_at`, `recorded_at`, `market`, `symbol`, and `asset_type`;
- `direction`, `position_effect`, `currency`, and `holding_horizon`;
- controlled `strategies`, confidence from 1 to 5, and publication policy;
- `thesis`, status, disclaimer, risk disclosure mode, invalidation, and exit plan.

`open` and `increase` additionally require:

- `position_pct` unless disclosure mode is `minimal`;
- `risk_budget_pct` or a member-provided `risk_note`;
- a concrete invalidation condition and exit plan supplied by the member.

`reduce` and `close` additionally require:

- a result summary;
- whether execution followed the original plan when known;
- whether the original thesis remains valid when known.

## Controlled values

Position effects:

`open`, `increase`, `reduce`, `close`, `hold`, `hedge`, `cancel`, `expire`, `exercise`, `assign`.

Strategy tags:

`trend`, `mean-reversion`, `breakout`, `event-driven`, `earnings`, `industry-cycle`, `valuation`, `fundamental`, `technical`, `macro`, `arbitrage`, `hedging`, `income`, `special-situation`, `experimental`.

Error tags:

`fomo`, `oversizing`, `late-entry`, `early-exit`, `late-exit`, `ignored-invalidation`, `thesis-drift`, `confirmation-bias`, `revenge-trading`, `overtrading`, `under-researched`, `poor-timing`, `plan-execution-gap`, `risk-underestimated`, `no-error`.

## Body structure

For `open` and `increase`, use:

1. 市场背景
2. 决策
3. 核心判断
4. 风险与失效条件
5. 退出计划
6. 当时的状态
7. 后续观察

For `reduce` and `close`, emphasize execution reason, plan adherence, result summary, thesis status, and next observation.
