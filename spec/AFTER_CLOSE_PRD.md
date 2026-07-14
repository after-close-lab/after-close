# After Close 产品需求文档（PRD）

> **项目定位：极客交易员的长期实践记录**  
> **品牌主张：The market closes. The learning begins.**  
> **中文表达：记录收益曲线之外的判断、风险与成长**

---

## 文档信息

| 项目 | 内容 |
|---|---|
| 项目名称 | After Close |
| 文档类型 | 产品需求文档 / 仓库建设蓝图 |
| 版本 | v1.0 |
| 日期 | 2026-07-14 |
| 状态 | 可进入仓库初始化与 MVP 开发 |
| 项目负责人 | 刘凯宁 |
| 建议仓库名 | `after-close` |
| 建议 GitHub Organization | `after-close-lab` |
| 建议技术栈 | GitHub Organization + Astro + Markdown + GitHub Actions + GitHub Pages |
| 目标参与规模 | 首期 4～8 人，长期建议不超过 15 人 |

---

# 1. 项目概述

## 1.1 一句话定义

After Close 是一个由少量、严格筛选的极客交易员共同维护的交易实践档案，通过结构化记录、Git 版本留痕和周期复盘，观察交易决策、风险控制与个人交易系统的长期演化。

## 1.2 核心问题

许多交易者会零散地记录买卖操作、市场观点和盈亏结果，但这些记录通常存在以下问题：

1. 只记录结果，不记录交易发生时的判断；
2. 只记录成功案例，亏损和错误逐渐被遗忘；
3. 交易前计划、交易中执行和交易后复盘彼此割裂；
4. 不同时间的记录格式不一致，无法形成长期统计；
5. 缺少可信时间线，容易出现事后解释和记忆重构；
6. 朋友之间会交流交易，但难以形成可持续、可回看的共同档案；
7. 记录成本过高，最终无法长期坚持。

After Close 要解决的不是“如何帮助大家找到下一只股票”，而是：

> 如何用足够低的记录成本，持续保存交易者在不确定性中的真实决策，并让这些记录逐渐沉淀为个人交易系统。

## 1.3 产品本质

After Close 不是交易社区、行情工具或投资产品。

它本质上是：

- 一套交易决策记录协议；
- 一个由 Git 驱动的长期档案库；
- 一个封闭协作、公开阅读的极客项目；
- 一套围绕交易员成长建立的复盘机制；
- 一个用工程化方式维护的交易实验室。

GitHub、Markdown、Skill、Actions 和 Pages 都是实现手段，真正需要长期维护的核心资产是：

1. 结构化的决策记录；
2. 真实且不可轻易重写的时间线；
3. 可关联的交易生命周期；
4. 周期性的复盘材料；
5. 每个交易者逐渐形成的方法、边界和错误模式。

---

# 2. 项目愿景与价值主张

## 2.1 愿景

让一小群认真对待交易的人，能够长期、真实、克制地记录自己的交易实践，并在数年后清晰看见个人交易系统如何形成、变化和成熟。

## 2.2 核心价值

### 对参与者

- 降低交易记录成本；
- 强迫交易前明确逻辑与风险；
- 保留交易发生当时的真实判断；
- 发现自己反复出现的执行偏差；
- 形成可以持续迭代的个人交易规则；
- 用长期证据，而不是短期盈亏认识自己。

### 对项目整体

- 形成多个不同交易风格的长期样本；
- 积累真实的成功、失败和修正案例；
- 建立程序员与交易实践交叉领域的独特内容；
- 形成具有可信时间线的交易知识档案；
- 体现“克制、真实、长期”的项目文化。

## 2.3 核心表达

> 真正的交易成长，发生在收盘之后。

> 记录收益曲线之外的判断、风险与成长。

> 用工程化方法，记录交易系统的长期演化。

---

# 3. 产品原则

所有产品、技术和运营决策必须服从以下原则。

## 3.1 克制

不追求用户规模，不追求高频内容，不追求完整金融产品能力。

当一个功能不能直接改善“记录、复盘、风险控制或长期沉淀”时，默认不做。

## 3.2 真实

记录交易发生当时的判断，而不是仅在结果出现后重新解释。

允许判断错误、交易亏损和执行失误。失败记录与成功记录具有同等价值。

## 3.3 长期

不以一笔交易、一个月收益或一次行情判断评价参与者。

项目关注的是数月、数年维度下，交易逻辑、风险意识和执行纪律的变化。

## 3.4 风险优先

任何开仓或加仓记录，必须明确风险边界、逻辑失效条件和退出计划。

风险控制不是免责声明中的一句话，而是日志协议中的必填结构。

## 3.5 记录优先

项目主体是已经发生的真实决策及其复盘，而不是没有行动支撑的市场观点。

## 3.6 收盘后发布

项目默认只在相关市场收盘后发布记录，不提供盘中交易信号。

允许参与者盘中在本地形成草稿，但默认不得在盘中 Push 或公开发布。

## 3.7 封闭写入

成员必须由维护者邀请、审核和分配身份。

Skill 可以公开，项目写入权限和网站作者身份不能通过公开注册获得。

## 3.8 开放阅读

在不涉及隐私、敏感数据和未公开内容的前提下，项目网站与仓库可公开阅读。

开放阅读不等于开放参与。

## 3.9 不追求可跟随性

项目不优化实时性，不提供组合复制，不提供交易提醒，不展示“当前应该买什么”。

读者应能理解一个人的思考过程，但不应被产品设计引导去复制其交易。

## 3.10 可移植

核心数据必须以 Markdown、YAML 和 Git 形式保存。

即使未来停止使用 Astro 或 GitHub Pages，历史内容仍然可以被读取、迁移和重新构建。

---

# 4. 产品目标与非目标

## 4.1 V1 产品目标

1. 让受邀成员可以用自然语言快速生成符合协议的交易记录；
2. 让每条记录自动完成格式、权限、敏感信息和风险字段校验；
3. 通过 Pull Request 保留可审计的提交与合并过程；
4. 在 `main` 分支更新后自动构建静态网站；
5. 按成员、时间、标的、策略和交易生命周期浏览记录；
6. 支持月度复盘，并能关联当月的真实记录；
7. 形成一套稳定、简单、可坚持的日常使用流程；
8. 通过严格边界避免项目演化为荐股、喊单或收益展示社区。

## 4.2 V1 明确不做

- 不做公开注册；
- 不做用户账户系统；
- 不做独立后端服务；
- 不做数据库；
- 不接入券商 API；
- 不自动下单；
- 不自动同步持仓；
- 不做实时行情；
- 不做盘中信号；
- 不做交易提醒；
- 不做荐股；
- 不做跟单；
- 不做收益承诺；
- 不做收益排行榜；
- 不做点赞、评论、私信和关注；
- 不做社区广场；
- 不做推荐算法；
- 不做付费订阅；
- 不做广告；
- 不做复杂组合管理；
- 不做完整税务或会计计算；
- 不做面向普通用户的大型产品。

## 4.3 判断新需求是否进入范围

新需求必须至少满足以下一项：

- 明显降低记录成本；
- 提高记录真实性；
- 改善风险信息完整度；
- 提高复盘质量；
- 增强历史记录的可读性；
- 改善仓库安全与协作可靠性。

如不满足，默认拒绝进入产品范围。

---

# 5. 用户与角色

## 5.1 Owner

通常为项目发起人。

职责：

- 决定项目方向；
- 审核新成员；
- 管理 GitHub Organization；
- 管理核心权限和仓库安全；
- 处理严重内容风险；
- 决定协议的重大版本升级。

权限建议：GitHub Organization Owner + Repository Admin。

## 5.2 Maintainer

负责日常维护，但不一定参与交易记录。

职责：

- 维护 Schema、Skill、Actions 和网站；
- 审核协议变更；
- 处理 CI 失败；
- 处理成员加入与退出；
- 修复数据和构建问题；
- 维护免责声明与项目规则。

权限建议：Repository Maintain，必要人员可为 Admin。

## 5.3 Trader Member

严格邀请加入的交易记录参与者。

职责：

- 记录本人真实交易决策；
- 遵循记录范围声明；
- 补全风险字段；
- 按规则处理历史修订；
- 定期完成复盘；
- 对公开内容负责；
- 不发布荐股、喊单和收益承诺。

权限建议：Repository Write，但不能直接修改 `main`。

## 5.4 Reader

公开阅读网站或仓库的人。

可以：

- 阅读公开记录；
- 按成员、时间、标的或策略浏览；
- 查看项目原则和免责声明。

不能：

- 注册成为成员；
- 在网站发帖；
- 复制组合或执行跟单；
- 将内容解释为投资建议。

---

# 6. 组织与治理模式

## 6.1 推荐组织方式

建立 GitHub Organization：

```text
after-close-lab
└── after-close
```

首期只使用一个公开仓库：

```text
after-close
```

选择单仓库的原因：

- 保持架构简单；
- 内容、Schema、Skill、网站和工作流在同一版本中演进；
- 避免跨仓库部署凭证；
- 便于新成员 Clone 后一次完成初始化；
- Git 历史完整；
- 降低维护成本。

## 6.2 团队设置

建议建立两个 Team：

```text
@after-close-lab/maintainers
@after-close-lab/traders
```

权限：

| Team | 权限 |
|---|---|
| maintainers | Maintain 或 Admin |
| traders | Write |

## 6.3 成员准入

成员不开放公开申请，默认通过熟人邀请。

加入条件建议：

1. 与项目发起人或现有成员有足够信任基础；
2. 有真实交易实践；
3. 理解项目不是荐股圈子；
4. 愿意记录失败和错误；
5. 愿意遵守风险与隐私规范；
6. 有基本 Git 使用能力，或愿意通过 Skill 完成流程；
7. 接受记录的公开性与长期留痕；
8. 明确自己的记录覆盖范围。

## 6.4 记录范围声明

每个成员必须维护一份公开的 Coverage Statement，说明自己记录什么、不记录什么。

示例：

```yaml
trader_id: liukaining
coverage:
  accounts: "个人美股主动交易账户"
  markets:
    - US
  instruments:
    - stock
    - etf
    - option
  included:
    - "所有主动开仓、加仓、减仓和平仓决策"
  excluded:
    - "长期定投账户"
    - "现金管理产品"
  publication_policy: after_close
  size_disclosure: percentage
```

这能避免读者误以为网站记录代表参与者的全部资产和全部交易。

## 6.5 退出机制

成员退出时：

- 历史记录默认保留；
- 个人页面标记为 `inactive`；
- 取消 Write 权限；
- 不删除已公开的正常记录；
- 涉及隐私、安全或法律风险时，由 Owner 决定是否进行内容撤回；
- Git 历史中的敏感信息清理需要单独执行历史重写流程。

---

# 7. 核心概念与信息模型

## 7.1 Member

一个经过审核并获得唯一 `trader_id` 的参与者。

`trader_id` 一经使用不应更改。

推荐格式：

```text
小写英文、数字和短横线，例如：liukaining
```

## 7.2 Trade Case

一条完整交易逻辑的生命周期。

它代表的不是单个订单，而是一个持续接受市场验证的交易假设。

例如：

```text
case_id: liukaining-sndk-20260714-01
```

同一 Case 可以包含：

- 首次建仓；
- 加仓；
- 减仓；
- 对冲；
- 平仓；
- 到期；
- 逻辑修订；
- 交易结束复盘。

## 7.3 Decision Record

项目最小的公开记录单元。

每一条 Decision Record 是一个独立 Markdown 文件，记录某个时间点的真实决策。

一条记录只描述一个主要决策，多个不相关决策应拆分。

## 7.4 Position Effect

描述本次决策对仓位的影响。

V1 枚举：

```text
open
increase
reduce
close
hold
hedge
cancel
expire
exercise
assign
```

说明：

- `open`：建立新交易 Case；
- `increase`：增加已有 Case 的风险敞口；
- `reduce`：降低风险敞口但未结束；
- `close`：主动结束 Case；
- `hold`：主动做出继续持有决定，通常用于重大事件后；
- `hedge`：针对已有 Case 增加对冲；
- `cancel`：取消尚未执行的交易计划；
- `expire`：期权到期；
- `exercise`：期权行权；
- `assign`：期权被指派。

## 7.5 Review

对一段时间内多条记录进行复盘。

V1 支持：

- 月度复盘：推荐必做；
- 年度复盘：建议；
- 周度复盘：可选。

Review 不替代单笔交易记录。

## 7.6 Amendment

对已经合并到 `main` 的历史记录进行实质性修正。

原则：

- 拼写、格式、明显录入错误可直接修复；
- 对交易逻辑、风险判断、时间或结果的实质性修改，不应静默覆盖；
- 应创建 Amendment，并关联原记录；
- 页面应展示修订时间和修订原因。

## 7.7 Strategy Tag

用于长期统计的有限标签。

V1 使用受控词表，禁止成员随意创造大量同义标签。

建议首批：

```text
trend
mean-reversion
breakout
event-driven
earnings
industry-cycle
valuation
fundamental
technical
macro
arbitrage
hedging
income
special-situation
experimental
```

可以在正文中自由描述，但结构化标签必须来自受控词表。

## 7.8 Error Tag

用于复盘错误模式。

建议首批：

```text
fomo
oversizing
late-entry
early-exit
late-exit
ignored-invalidation
thesis-drift
confirmation-bias
revenge-trading
overtrading
under-researched
poor-timing
plan-execution-gap
risk-underestimated
no-error
```

---

# 8. 内容数据协议

## 8.1 文件原则

每个 Decision Record 使用：

- YAML Frontmatter：存放可校验、可统计字段；
- Markdown 正文：保留人的真实思考和上下文。

## 8.2 文件路径

```text
src/content/records/{trader_id}/{YYYY}/{MM}/{date}-{symbol}-{sequence}.md
```

示例：

```text
src/content/records/liukaining/2026/07/2026-07-14-sndk-01.md
```

Review 路径：

```text
src/content/reviews/{trader_id}/{YYYY}/{YYYY-MM}.md
```

Member 路径：

```text
src/content/members/{trader_id}.yaml
```

## 8.3 Decision Record Schema

### 必填字段

```yaml
id: liukaining-20260714-sndk-01
case_id: liukaining-sndk-20260714-01
author: liukaining

title: "SNDK：基于存储周期判断建立观察仓"
occurred_at: 2026-07-14T10:35:00-04:00
recorded_at: 2026-07-14T20:10:00+09:00

market: US
symbol: SNDK
asset_type: stock
direction: long
position_effect: open

currency: USD
holding_horizon: swing
strategies:
  - industry-cycle
  - fundamental

confidence: 4
publication: after_close

risk:
  disclosure_mode: percentage
  position_pct: 4.0
  risk_budget_pct: 0.6
  invalidation: "NAND 价格趋势反转，或公司指引明显低于当前预期"
  exit_plan: "估值完成重估、基本面逻辑失效，或触发账户风险约束"

thesis: "NAND 供需改善可能继续推动盈利预期上修"
status: active

disclaimer: personal-record
```

### 可选字段

```yaml
price: 190.50
quantity: 20
broker: hidden
order_type: limit

instrument:
  underlying: SNDK
  option_type: call
  strike: 200
  expiry: 2026-08-21

portfolio:
  position_pct_before: 0
  position_pct_after: 4.0

result:
  realized_return_pct: null
  realized_r: null
  fees: null

emotion:
  before: calm
  after: neutral

sources:
  - title: "Company earnings release"
    url: "https://example.com"

amends: null
related_records: []
error_tags: []
```

## 8.4 隐私披露模式

### Full

允许公开：

- 价格；
- 数量；
- 仓位；
- 金额。

### Percentage（V1 默认）

公开：

- 价格可选；
- 仓位占比；
- 风险预算占比；
- 收益率或 R 倍数。

隐藏：

- 账户总金额；
- 绝对持仓数量可选；
- 券商信息。

### Minimal

仅公开：

- 标的；
- 方向；
- 交易逻辑；
- 风险边界；
- 结果摘要。

项目默认推荐 `percentage`。

## 8.5 Markdown 正文模板

```markdown
## 市场背景

当时的市场、行业、公司或事件背景是什么？

## 决策

做了什么，以及为什么现在做？

## 核心判断

哪些事实、数据或观察支持这笔交易？

## 风险与失效条件

哪些情况说明判断错误？最大可接受风险是什么？

## 退出计划

盈利、亏损或时间维度下，准备如何退出？

## 当时的状态

是否受到情绪、已有仓位或近期盈亏影响？

## 后续观察

接下来重点观察哪些变量？
```

## 8.6 不同动作的必填规则

### Open / Increase

必须有：

- thesis；
- position_pct 或明确选择隐藏；
- risk_budget_pct 或风险说明；
- invalidation；
- exit_plan；
- holding_horizon；
- confidence。

### Reduce / Close

必须有：

- case_id；
- 执行原因；
- 是否符合原计划；
- 结果摘要；
- 原判断是否仍然成立；
- realized_r 或 return_pct 可选。

### Hold

必须说明：

- 为什么主动选择继续持有；
- 当前风险是否变化；
- 原失效条件是否仍然有效。

### Cancel

必须说明：

- 原计划是什么；
- 为什么取消；
- 是外部条件变化还是自身判断变化。

## 8.7 历史完整性

记录合并后：

- 不允许删除亏损记录以美化结果；
- 不允许在结果出现后将原 Thesis 改写成更准确的版本；
- 允许补充“后来发生了什么”，但必须带补充时间；
- 实质性修订使用 Amendment；
- 页面应保留原始记录和后续修订关系。

---

# 9. 核心用户流程

## 9.1 首次加入

1. Owner 审核并邀请成员加入 Organization；
2. Maintainer 创建 `src/content/members/{trader_id}.yaml`；
3. 为成员配置 GitHub 用户名与目录映射；
4. 成员 Clone 仓库；
5. 成员完成 `gh auth login`；
6. 执行初始化命令；
7. 填写 Coverage Statement；
8. 运行环境检查；
9. 创建一条测试记录；
10. PR 校验通过并合并。

推荐初始化命令：

```bash
pnpm after-close init
```

## 9.2 日常记录

成员对 Claude Code 或 Codex 说：

```text
记录今天的交易。
```

Skill 应依次完成：

1. 识别涉及的标的和动作；
2. 判断是新 Case 还是已有 Case；
3. 收集必要信息；
4. 对缺失风险字段进行追问；
5. 生成 Markdown 草稿；
6. 检查是否包含账户号、订单号等敏感信息；
7. 展示结构化摘要；
8. 保存到成员自己的目录；
9. 本地执行校验；
10. 不自动 Push。

## 9.3 发布记录

成员说：

```text
发布刚刚的记录。
```

Skill 应：

1. 确认相关市场已经收盘；
2. 执行 `git pull --rebase`；
3. 创建新分支；
4. 再次运行内容校验；
5. 展示 Git Diff；
6. 明确询问用户是否提交；
7. 用户确认后 Commit；
8. Push 分支；
9. 创建 Pull Request；
10. 等待 CI；
11. CI 通过后启用 Auto Merge；
12. 合并后网站自动部署。

禁止在未展示最终内容和 Diff 的情况下自动 Push。

## 9.4 修改未发布草稿

本地草稿可以正常修改。

Skill 应重新运行校验，并覆盖本地文件。

## 9.5 修订已发布记录

成员说：

```text
修订 2026-07-14 的 SNDK 记录，原价格录入错误。
```

Skill 判断：

- 纯录入错误：修改原文件，并在 Commit 中说明；
- 实质性逻辑修订：创建 Amendment；
- 涉及删除：要求 Maintainer 处理。

## 9.6 月度复盘

成员说：

```text
生成我 2026 年 7 月的月度复盘。
```

Skill 应：

1. 读取当月所有 Decision Records；
2. 按 Case 关联完整生命周期；
3. 汇总记录数量、动作和策略；
4. 识别执行偏差；
5. 统计错误标签；
6. 区分“判断错误”和“执行错误”；
7. 生成复盘草稿；
8. 引用具体记录；
9. 不输出下一月荐股或具体买卖建议；
10. 保存到 Reviews 目录；
11. 用户确认后发布。

## 9.7 成员退出

1. 将 Member 状态改为 `inactive`；
2. 移除 Team；
3. 保留历史页面；
4. 首页不再展示为活跃参与者；
5. Coverage Statement 保留最终状态。

---

# 10. After Close Skill 设计

## 10.1 V1 设计决策

V1 只维护一个统一 Skill：

```text
after-close
```

不拆分多个 Skill，避免安装、触发和版本管理复杂化。

Skill 内部包含四个工作流：

```text
init
record
publish
review
```

以及辅助能力：

```text
doctor
validate
amend
```

## 10.2 Skill 边界

Skill 可以：

- 收集交易记录；
- 结构化用户提供的信息；
- 发现必填字段缺失；
- 提醒用户补充风险边界；
- 查找同一 Case 的历史记录；
- 生成 Review；
- 执行 Git 流程；
- 检查敏感信息；
- 创建 PR。

Skill 不可以：

- 推荐股票；
- 判断用户是否应该交易；
- 主动给出开仓价格；
- 主动给出止损价格；
- 自动决定仓位；
- 输出目标收益承诺；
- 根据其他成员记录生成跟单方案；
- 把历史高收益交易包装成未来机会；
- 在用户未确认前 Push；
- 绕过分支保护或 CI。

## 10.3 交互原则

1. 用户只需表达自然语言，不要求记命令；
2. 缺少普通字段时可使用明确默认值；
3. 缺少风险字段时不得擅自填写；
4. 任何推断必须明确标记并让用户确认；
5. 发布前必须展示摘要与 Diff；
6. 不将模型分析伪装成用户当时的原始判断；
7. Review 可以分析历史，但不得修改历史记录。

## 10.4 推荐目录

```text
skills/
└── after-close/
    ├── SKILL.md
    ├── references/
    │   ├── charter.md
    │   ├── record-schema.md
    │   ├── review-guide.md
    │   └── compliance-boundaries.md
    ├── scripts/
    │   ├── init.mjs
    │   ├── create-record.mjs
    │   ├── create-review.mjs
    │   ├── validate.mjs
    │   ├── ownership-check.mjs
    │   └── publish.mjs
    └── assets/
        ├── record-template.md
        └── review-template.md
```

仓库根目录同时维护：

```text
AGENTS.md
CLAUDE.md
```

两份文件只放项目级规则和 Skill 入口，不复制全部协议。

## 10.5 Skill 的核心触发描述

建议：

```yaml
---
name: after-close
description: Record, validate, review, and publish After Close trading decision journals. Use when a member wants to document a trade, update a trade case, create a periodic review, validate journal content, or publish records through Git and GitHub.
---
```

## 10.6 确定性脚本优先

涉及以下动作时，不允许仅依赖模型自由生成：

- ID 生成；
- 文件路径生成；
- Schema 校验；
- 日期和时区处理；
- 成员目录权限判断；
- 重复 ID 检查；
- Git 分支命名；
- Commit 格式；
- 敏感信息关键词检查；
- PR 创建；
- 网站统计。

这些动作必须通过脚本完成。

---

# 11. 仓库结构

```text
after-close/
├── README.md
├── PRD.md
├── CHARTER.md
├── DISCLAIMER.md
├── GOVERNANCE.md
├── CONTRIBUTING.md
├── SECURITY.md
├── AGENTS.md
├── CLAUDE.md
├── package.json
├── pnpm-lock.yaml
├── astro.config.mjs
├── tsconfig.json
│
├── skills/
│   └── after-close/
│       ├── SKILL.md
│       ├── references/
│       ├── scripts/
│       └── assets/
│
├── scripts/
│   ├── init-member.mjs
│   ├── validate-content.mjs
│   ├── validate-ownership.mjs
│   ├── validate-policy.mjs
│   ├── scan-sensitive-data.mjs
│   ├── generate-stats.mjs
│   └── create-pr.mjs
│
├── src/
│   ├── content.config.ts
│   ├── content/
│   │   ├── members/
│   │   │   └── liukaining.yaml
│   │   ├── records/
│   │   │   └── liukaining/
│   │   │       └── 2026/
│   │   │           └── 07/
│   │   │               └── 2026-07-14-sndk-01.md
│   │   └── reviews/
│   │       └── liukaining/
│   │           └── 2026/
│   │               └── 2026-07.md
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── styles/
│   └── lib/
│
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── social-card.png
│
├── tests/
│   ├── fixtures/
│   ├── schema.test.ts
│   ├── ownership.test.ts
│   └── policy.test.ts
│
└── .github/
    ├── CODEOWNERS
    ├── pull_request_template.md
    ├── ISSUE_TEMPLATE/
    │   └── config.yml
    └── workflows/
        ├── validate.yml
        ├── build.yml
        └── deploy-pages.yml
```

---

# 12. GitHub 权限与分支策略

## 12.1 Main 分支保护

`main` 必须：

- 禁止直接 Push；
- 禁止 Force Push；
- 禁止删除；
- 必须通过 Pull Request；
- 必须通过所有 Required Status Checks；
- 必须解决冲突；
- 建议要求分支与 `main` 保持最新；
- 合并后自动删除分支；
- 使用 Squash Merge；
- Maintainer 才能绕过规则。

## 12.2 内容 PR 自动合并策略

由于成员数量少且彼此信任，V1 不强制每条日志都经过人工 Review。

满足以下条件时可 Auto Merge：

1. PR 作者在成员 Allowlist；
2. 只修改本人的记录或复盘目录；
3. 没有修改核心代码、Schema、Skill 或工作流；
4. Schema 校验通过；
5. 风险必填字段通过；
6. 敏感信息扫描通过；
7. 网站构建通过。

## 12.3 核心文件修改

以下路径只有 Maintainer 可以修改：

```text
.github/**
skills/**
scripts/**
src/content.config.ts
src/lib/**
src/pages/**
src/components/**
package.json
astro.config.mjs
CHARTER.md
DISCLAIMER.md
GOVERNANCE.md
```

`validate-ownership` 应检查 PR 作者和修改路径。

## 12.4 外部 Pull Request

公开仓库无法阻止外部用户创建 Fork 或提交 PR，但可以确保其无法被接纳。

外部 PR：

- 自动执行 Allowlist 检查；
- 检查失败；
- Bot 留言说明项目不开放外部投稿；
- Maintainer 关闭 PR；
- 不进入网站。

## 12.5 CODEOWNERS

建议：

```text
* @after-close-lab/maintainers

/src/content/records/liukaining/ @liukaining @after-close-lab/maintainers
/src/content/reviews/liukaining/ @liukaining @after-close-lab/maintainers
```

CODEOWNERS 主要用于责任归属和通知。

V1 的真正权限约束以 CI 的 `validate-ownership` 为准。

---

# 13. GitHub Actions

## 13.1 validate.yml

触发：

```text
pull_request
```

任务：

1. Checkout；
2. 安装 Node.js 与 pnpm；
3. 安装依赖；
4. 校验成员身份；
5. 校验修改路径；
6. 校验 Frontmatter Schema；
7. 校验 Case 关联；
8. 检查重复 ID；
9. 检查风险必填字段；
10. 检查受控标签；
11. 检查敏感数据；
12. Markdown lint；
13. 运行单元测试；
14. 构建 Astro。

Required Checks 建议：

```text
identity
ownership
content-schema
content-policy
sensitive-data
test
build
```

## 13.2 build.yml

触发：

```text
pull_request
push to main
```

职责：

- 确认所有内容可被 Astro 正确读取；
- 生成成员和记录统计；
- 检查无效内部链接；
- 检查页面生成数量；
- 检查构建产物。

## 13.3 deploy-pages.yml

触发：

```text
push to main
workflow_dispatch
```

职责：

1. 构建静态站点；
2. 上传 Pages Artifact；
3. 部署 GitHub Pages；
4. 使用 GitHub Pages Environment；
5. 防止并发部署冲突。

## 13.4 Actions 安全

- 默认 `permissions: read-all`；
- 仅部署 Job 开放 `pages: write` 与 `id-token: write`；
- PR 校验不使用长期 Token；
- 不在仓库中保存个人 PAT；
- 优先使用 GitHub CLI 的个人登录；
- 第三方 Actions 尽量固定到可信版本或 Commit SHA；
- 不执行外部 PR 中未经审查的任意脚本；
- 不允许日志内容触发 Shell 命令。

---

# 14. 网站信息架构

## 14.1 首页

首页只展示：

1. After Close 品牌与定位；
2. 项目原则；
3. 最近发布的记录；
4. 最近发布的月度复盘；
5. 活跃成员；
6. 风险声明入口；
7. 项目不开放注册的说明。

首页不展示：

- 收益排行榜；
- 热门股票；
- 实时行情；
- 当日买入榜；
- “跟随交易员”；
- “最佳策略”；
- 夸张收益数据。

## 14.2 Records

支持基础筛选：

- 成员；
- 市场；
- 标的；
- 资产类型；
- Position Effect；
- Strategy Tag；
- 年月。

默认按 `recorded_at` 倒序。

不提供按收益率排序。

## 14.3 Record Detail

展示：

- 标题；
- 作者；
- 记录时间；
- 交易发生时间；
- Case ID；
- 标的和方向；
- 仓位影响；
- 风险信息；
- Thesis；
- Markdown 正文；
- 关联记录；
- 后续 Amendment；
- 固定免责声明。

对于同一 Case，页面展示时间线：

```text
Open → Increase → Reduce → Close → Review
```

## 14.4 Member Page

展示：

- 昵称和简介；
- 交易理念；
- Coverage Statement；
- 主要市场；
- 常用策略；
- 最近记录；
- 月度复盘；
- 记录数量；
- Case 完成数量；
- 风险字段完整率；
- 复盘完成情况。

不展示成员排名。

## 14.5 Reviews

展示：

- 月度复盘；
- 年度复盘；
- 可关联具体记录；
- 判断错误与执行错误；
- 高频错误标签；
- 下一阶段行为改进。

“下一阶段改进”必须是行为和流程层面，例如：

- 降低单笔风险；
- 建仓前补充反例；
- 减少计划外加仓；
- 提高复盘及时性。

不得输出具体标的推荐。

## 14.6 About

包含：

- 项目背景；
- 项目宪章；
- 参与方式说明；
- 明确不开放公开注册；
- 技术架构；
- GitHub 链接；
- 免责声明。

---

# 15. 网站视觉原则

## 15.1 气质

关键词：

```text
克制
深色
安静
终端感
档案感
工程日志
长期主义
```

## 15.2 避免

- 红涨绿跌作为主视觉；
- 大面积 K 线背景；
- 炫耀财富的图片；
- “牛股”“暴涨”“翻倍”等营销语言；
- 交易所终端式信息轰炸；
- 金融 App 式高密度行情面板；
- 社交媒体式热榜。

## 15.3 推荐视觉

- 深灰或接近黑色的背景；
- 米白或灰白正文；
- 等宽字体用于 ID、时间和结构化字段；
- 正文字体保证长文阅读；
- 少量低饱和强调色；
- 时间线与 Commit 风格元素；
- 页面留白充分；
- 数字不作为刺激性视觉中心。

---

# 16. 功能需求清单

## 16.1 P0：MVP 必须完成

| ID | 功能 | 验收标准 |
|---|---|---|
| P0-01 | Member 配置 | 每个成员拥有唯一 trader_id、GitHub 用户名和 Coverage Statement |
| P0-02 | 记录 Schema | Open、Increase、Reduce、Close 记录可被严格校验 |
| P0-03 | Case 关联 | 同一交易逻辑的多条记录可以通过 case_id 关联 |
| P0-04 | 单一 Skill | 支持 init、record、publish、review |
| P0-05 | 本地校验 | 发布前可以在本地发现格式和风险字段问题 |
| P0-06 | Ownership 校验 | 成员不能通过正常 PR 修改他人目录或核心文件 |
| P0-07 | 敏感信息扫描 | 发现疑似账户号、订单号、Token、密钥时阻止合并 |
| P0-08 | PR 流程 | Skill 可以创建分支、Commit、Push 和 PR |
| P0-09 | Main 保护 | 不能直接 Push，所有内容必须通过检查 |
| P0-10 | Astro 构建 | 所有成员、记录和复盘可被正确生成页面 |
| P0-11 | Pages 部署 | main 更新后自动发布 |
| P0-12 | 首页 | 展示定位、最近记录、成员和风险声明 |
| P0-13 | 记录列表 | 支持成员、标的、时间和策略筛选 |
| P0-14 | 记录详情 | 展示结构化字段、正文和 Case 时间线 |
| P0-15 | 成员页 | 展示 Coverage Statement 和个人记录 |
| P0-16 | 月度复盘 | 能生成、校验、发布和展示月度复盘 |
| P0-17 | 免责声明 | 首页、详情页和仓库均可明显访问 |
| P0-18 | 不开放注册 | 网站无注册、投稿或加入入口 |

## 16.2 P1：稳定运行后考虑

- RSS；
- 自动生成 Open Graph 图片；
- Case 完整度统计；
- 月度复盘完成提醒；
- 行为错误趋势；
- 计划执行率；
- R 倍数分布；
- 记录导出；
- 自定义域名；
- 站内全文搜索；
- 年度复盘模板；
- 内容协议版本迁移脚本。

## 16.3 P2：原则上谨慎

- 私有源仓库与公开站点仓库分离；
- 本地加密草稿；
- 券商对账单半自动导入；
- 自动识别成交记录；
- 更复杂的组合风险统计。

以下功能即使在未来也默认不做：

- 社交关系；
- 公开申请；
- 实时仓位；
- 跟单；
- 付费荐股；
- 收益榜；
- 推荐算法。

---

# 17. 月度复盘协议

## 17.1 Review Frontmatter

```yaml
id: liukaining-review-2026-07
author: liukaining
period: 2026-07
type: monthly
created_at: 2026-08-02T20:00:00+09:00

record_count: 12
case_count: 5
closed_case_count: 3

coverage_complete: true
strategies:
  - industry-cycle
  - event-driven

top_error_tags:
  - late-entry
  - plan-execution-gap

disclaimer: personal-review
```

## 17.2 Review 正文

```markdown
## 本月概览

本月主要交易了什么，市场环境如何？

## 有效判断

哪些判断得到了市场验证？判断正确的原因是什么？

## 错误判断

哪些 Thesis 被证伪？当时遗漏了什么？

## 执行偏差

哪些结果不是判断问题，而是仓位、时机或纪律问题？

## 风险控制

本月是否出现超出计划的风险暴露？

## 重复错误

哪些错误在历史记录中已经出现过？

## 交易系统变化

本月新增、删除或修订了哪些个人规则？

## 下月行为改进

只写行为、流程和风险控制改进，不写具体标的推荐。
```

## 17.3 Review 统计约束

- 不对成员之间收益进行比较；
- 不生成排行榜；
- 数据不完整时不得计算误导性的总收益；
- 缺少完整资金流时，不计算账户级收益率；
- 优先使用 R 倍数、计划执行率和错误标签；
- 统计必须可追溯到具体记录。

---

# 18. 风险、合规与内容边界

## 18.1 固定声明

项目需要在 README、网站 About 和每条记录详情页展示：

> After Close 仅用于记录参与者个人在特定时间下的交易实践、判断和复盘，不构成任何投资建议、证券推荐、收益承诺或交易邀约。参与者可能持有文中提及的资产。任何人不应依据本项目内容直接作出投资决策。

## 18.2 禁止内容

- “建议大家买入”；
- “现在可以跟”；
- “目标必到某价格”；
- “稳赚”“低风险高收益”；
- 收费股票推荐；
- 交易信号订阅；
- 代客理财；
- 承诺回报；
- 诱导读者开户或交易；
- 隐藏利益冲突；
- 通过高收益截图吸引成员；
- 公开他人账户或交易数据。

## 18.3 允许内容

- “我在当时基于以下理由买入”；
- “我的失效条件是……”；
- “事后看，这个判断遗漏了……”；
- “这次盈利主要来自市场 Beta，并非原 Thesis”；
- “我没有遵守原定风险预算”；
- “本文仅记录本人决策，不应被复制”。

## 18.4 实时性限制

- 默认市场收盘后发布；
- 不在标题中使用“立即买入”“盘中机会”等语言；
- 网站不显示精确到分钟的实时交易流；
- 不提供通知订阅型交易信号；
- 不以“最新动作”作为刺激性首页模块。

## 18.5 利益冲突

记录应明确：

- 作者是否持有相关资产；
- 本次行为是建仓、加仓、减仓还是平仓；
- 文章发布时间可能晚于实际交易时间；
- 作者可能继续改变仓位。

## 18.6 隐私与安全

不得提交：

- 券商账号；
- 银行账号；
- 订单号；
- 身份证件；
- 电话号码；
- 家庭住址；
- API Key；
- Personal Access Token；
- Cookie；
- 完整账户截图；
- 可推算账户资产的敏感组合信息，除非成员明确选择公开。

---

# 19. 非功能需求

## 19.1 架构

- 静态网站；
- 无后端；
- 无数据库；
- 无线上用户认证；
- 构建过程确定；
- 内容可被 Git 直接读取；
- 站点故障不影响原始记录。

## 19.2 性能

MVP 目标：

- 首页静态生成；
- 核心页面首屏资源保持轻量；
- 不加载行情 SDK；
- 不加载广告或营销追踪；
- 图片使用优化格式；
- 记录列表支持分页或构建期分段。

## 19.3 可靠性

- PR 构建必须阻止无效内容进入 main；
- main 上任意 Commit 都应能够重建站点；
- 锁定依赖版本；
- 定期更新依赖；
- 所有核心脚本需要单元测试；
- 建议每月创建一个 Git Tag。

## 19.4 可访问性

- 正文对比度满足长文阅读；
- 不仅依赖颜色表达涨跌或状态；
- 页面支持键盘导航；
- 标题层级正确；
- 链接有明确文本；
- 图表需要文本说明。

## 19.5 SEO 与传播

- 每条记录拥有稳定 URL；
- 自动生成 title、description 和 Open Graph；
- 明确作者和发布时间；
- 不使用夸张标题；
- `robots.txt` 默认允许索引；
- 成员可以在个人配置中关闭搜索引擎索引，但公开仓库内容仍可能被访问。

---

# 20. 技术方案

## 20.1 技术栈

| 层次 | 方案 |
|---|---|
| 内容 | Markdown + YAML Frontmatter |
| 内容 Schema | Astro Content Collections + Zod |
| 网站 | Astro 静态站点 |
| 样式 | 原生 CSS 或轻量设计系统 |
| 包管理 | pnpm |
| 脚本 | TypeScript / Node.js |
| 测试 | Vitest |
| Markdown 校验 | markdownlint |
| Git 操作 | Git + GitHub CLI |
| CI/CD | GitHub Actions |
| 部署 | GitHub Pages |
| Skill | `SKILL.md` + scripts + references |
| 权限 | GitHub Organization Teams + Ruleset / Branch Protection |

## 20.2 选择 Astro 的原因

- 适合内容型静态网站；
- Markdown 与结构化内容共存；
- Content Collections 可定义 Schema；
- 构建时发现 Frontmatter 错误；
- 无需后端；
- 可部署到 GitHub Pages；
- 保留未来增加搜索与可视化的空间；
- 比传统博客生成器更适合结构化交易记录。

## 20.3 统计原则

统计在构建时生成，不引入线上数据库。

可生成：

- 记录数量；
- Case 数量；
- 各动作分布；
- 策略标签分布；
- 复盘完成情况；
- 风险字段完整率；
- Error Tag 变化；
- 平均持有周期；
- R 倍数分布。

不生成：

- 成员收益排名；
- “最赚钱策略”；
- “胜率最高交易员”；
- 缺少完整数据情况下的账户总收益。

---

# 21. 验收标准

## 21.1 功能验收

MVP 完成时，应满足：

1. 至少 3 名测试成员完成初始化；
2. 每名成员可以用 Skill 创建记录；
3. Open 记录缺少 invalidation 时无法通过；
4. 成员修改他人目录时 CI 失败；
5. 外部 GitHub 用户提交内容时 Allowlist 检查失败；
6. 含疑似 Token 的文件无法合并；
7. 同一 Case 的多次操作可以在页面形成时间线；
8. 月度 Review 可以引用当月记录；
9. main 合并后网站自动发布；
10. 网站没有注册、点赞、评论、排行榜和实时行情；
11. 每个详情页都有免责声明；
12. 历史实质性修订会显示 Amendment；
13. 所有内容文件脱离网站仍可直接阅读。

## 21.2 体验验收

- 熟悉 Git 的成员，从自然语言到创建 PR 不超过 5 分钟；
- 不熟悉 Git 的成员可以只通过 Agent 完成流程；
- 用户无需手工编写 YAML；
- 校验失败时给出明确修复建议；
- 发布前用户能够清楚看到最终内容；
- 网站能够清晰区分事实、判断、风险和结果。

## 21.3 运行验收

试运行一个月后：

- 至少 4 名活跃成员；
- 每名成员至少发布 3 条真实记录；
- 所有活跃成员完成 Coverage Statement；
- 至少 80% 的 Open / Increase 记录包含完整风险字段；
- 至少 3 名成员完成月度复盘；
- 没有出现直接荐股、收益承诺或敏感账户数据；
- 项目维护不需要独立服务器；
- 没有因功能复杂导致大规模手工维护。

---

# 22. 成功指标

项目不以注册量、日活或页面浏览量作为核心成功指标。

## 22.1 核心指标

- 活跃成员连续记录月数；
- 月度复盘完成率；
- 风险字段完整率；
- Case 闭环率；
- 历史记录修订透明度；
- 计划与执行偏差的可识别程度；
- 重复错误是否下降；
- 成员是否逐渐形成明确交易规则。

## 22.2 反指标

出现以下情况说明项目方向偏移：

- 成员开始追求高频发帖；
- 内容标题越来越像荐股；
- 网站访问量影响交易决策；
- 成员隐瞒亏损或只展示成功；
- 出现收益排名诉求；
- 读者开始要求实时仓位；
- 项目开始出售股票推荐；
- 功能复杂度高于记录本身；
- 成员记录时间显著增加；
- 维护者需要持续运营“社区氛围”。

---

# 23. MVP 建设阶段

## 阶段 0：项目立项

产出：

- GitHub Organization；
- Repository；
- README；
- CHARTER；
- DISCLAIMER；
- PRD；
- 基础权限。

完成标准：

- 项目定位和边界不再存在歧义。

## 阶段 1：协议与内容

产出：

- Member Schema；
- Decision Record Schema；
- Review Schema；
- Strategy Tags；
- Error Tags；
- 示例记录；
- 示例 Review。

完成标准：

- 手工创建的记录可以稳定通过 Schema。

## 阶段 2：Skill 与脚本

产出：

- `after-close` Skill；
- init；
- record；
- validate；
- publish；
- review；
- ownership-check；
- sensitive-data scan。

完成标准：

- 成员可以只通过 Agent 完成一条完整发布流程。

## 阶段 3：GitHub 协作

产出：

- Teams；
- Branch Protection / Ruleset；
- PR Template；
- CI；
- Auto Merge；
- Pages 权限。

完成标准：

- 非法路径修改和无效内容无法进入 main。

## 阶段 4：网站

产出：

- 首页；
- Records；
- Record Detail；
- Case Timeline；
- Members；
- Member Detail；
- Reviews；
- About；
- Disclaimer。

完成标准：

- main 中的全部内容可稳定构建和浏览。

## 阶段 5：小范围试运行

参与者：

- 4～8 名朋友。

周期：

- 4 周。

重点观察：

- 记录是否真的足够低摩擦；
- 风险字段是否过多或过少；
- Case 模型是否自然；
- 月度复盘是否有价值；
- 成员是否愿意记录亏损；
- Skill 是否产生过度分析；
- 网站是否诱导读者关注交易信号。

---

# 24. 首批 GitHub Issues

建议初始化仓库后创建以下 Issues：

1. `docs: add project charter and disclaimer`
2. `chore: initialize Astro and pnpm`
3. `feat: define member content collection`
4. `feat: define decision record schema`
5. `feat: define monthly review schema`
6. `feat: add controlled strategy and error tags`
7. `feat: implement content validator`
8. `feat: implement ownership validator`
9. `feat: implement sensitive-data scanner`
10. `feat: create after-close skill`
11. `feat: implement member initialization workflow`
12. `feat: implement record creation workflow`
13. `feat: implement publish workflow`
14. `feat: implement monthly review workflow`
15. `ci: add pull request validation`
16. `ci: configure protected main branch`
17. `feat: build home page`
18. `feat: build record list and filters`
19. `feat: build record detail and case timeline`
20. `feat: build member pages`
21. `feat: build review pages`
22. `ci: deploy Astro to GitHub Pages`
23. `test: add example members and records`
24. `docs: write member onboarding guide`
25. `pilot: onboard first four members`

---

# 25. 建议的首版 README 开头

```markdown
# After Close

> The market closes. The learning begins.

After Close 是一个由少量、严格筛选的极客交易员共同维护的交易实践档案。

我们记录真实发生的交易决策，包括当时的市场背景、判断依据、仓位安排、风险边界、执行过程、最终结果和事后复盘。

这个项目不预测市场，不提供荐股、喊单、跟单或收益承诺，也不以收益排名评价参与者。

我们关注的不是某一笔交易的输赢，而是一个交易者如何在长期实践中认识风险、修正错误，并逐渐形成自己的交易系统。

## Principles

- Closed contribution, open reading
- Records before opinions
- Risk before return
- Review before conclusion
- No signals, no following, no promises
- Long-term growth over short-term performance
```

---

# 26. 建议的项目宪章

这是一个由少量、严格筛选的参与者共同维护的交易实践记录项目。

我们记录真实发生的交易决策，包括交易背景、判断依据、仓位安排、风险边界、执行过程、最终结果和事后复盘。

项目的目的不是预测市场，不是展示收益，也不是证明谁的判断更加正确，而是长期观察一个交易者如何认识市场、控制风险、修正错误，并逐渐形成自己的交易系统。

本项目坚持：

1. 不提供任何形式的投资建议、荐股、喊单或跟单服务；
2. 不承诺或暗示任何投资收益；
3. 不设置收益排行榜，不鼓励成员之间进行收益竞赛；
4. 不以实时发布交易为目标，默认在市场收盘后发布；
5. 每一笔开仓或加仓必须记录风险边界和逻辑失效条件；
6. 接受失败、亏损和错误判断，并将其视为交易成长的重要材料；
7. 成员数量严格控制，项目不开放注册，不追求社区规模；
8. 所有内容仅代表记录者在特定时间下的个人判断；
9. 阅读者不应依据项目内容直接作出投资决策；
10. 项目关注的不是某一笔交易的输赢，而是交易者长期能力的形成。

我们相信，交易能力不是来自更多预测，而是来自持续记录、诚实复盘、风险控制和对自身行为的长期观察。

---

# 27. 最终产品结论

After Close 的 V1 不需要成为一个产品平台。

它只需要稳定完成一个闭环：

```text
真实交易发生
    ↓
Agent 协助结构化记录
    ↓
本地校验风险和隐私
    ↓
成员确认内容
    ↓
Git 分支与 Pull Request
    ↓
自动校验与合并
    ↓
GitHub Pages 展示
    ↓
月度复盘
    ↓
个人交易系统持续演化
```

首版是否成功，不取决于网站是否精美，也不取决于有多少人阅读，而取决于：

> 几名参与者能否连续数月，以足够低的成本，真实记录自己的判断、风险、执行和修正。

只要这个闭环能够运行，After Close 就已经成立。

---

# 28. 官方技术参考

- GitHub Rulesets  
  https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets

- GitHub Protected Branches  
  https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches

- GitHub Repository Roles  
  https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/repository-roles-for-an-organization

- GitHub CODEOWNERS  
  https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners

- GitHub Pages Custom Workflows  
  https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

- Astro Content Collections  
  https://docs.astro.build/en/guides/content-collections/

- Astro GitHub Pages Deployment  
  https://docs.astro.build/en/guides/deploy/github/

- Claude Code Skills  
  https://docs.anthropic.com/en/docs/claude-code/skills

- OpenAI Codex Skills  
  https://developers.openai.com/codex/build-skills
