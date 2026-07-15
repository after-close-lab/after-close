# 项目治理

## 角色

- **Owner**：决定方向、审核成员、管理 Organization 与严重风险事件；
- **Maintainer**：维护协议、Skill、脚本、Actions、网站和成员配置；
- **Trader Member**：记录本人真实决策，维护 Coverage Statement 并完成复盘；
- **Reader**：公开阅读，不获得投稿、注册或跟单入口。

## 成员准入

项目只接受 Owner 或 Maintainer 主动邀请。候选成员需要理解公开留痕、风险与隐私规范，愿意记录失败，并明确自己的记录覆盖范围。

Skill 公开不代表项目开放加入。`trader_id`、仓库写权限、个人目录与网站作者身份只能由 Maintainer 分配。

## 内容归属

成员只能通过正常 Pull Request 流程修改自己的记录和复盘目录。核心代码、Schema、Skill、工作流与治理文件由 Maintainer 维护。CI 的 Ownership 校验是实际合并边界，CODEOWNERS 只负责通知和责任归属。

## 修订与撤回

- 拼写、格式和明确录入错误可以直接修复，并在提交中说明；
- 对判断、风险、发生时间或结果的实质性修改必须使用 Amendment；
- 不得删除亏损或失败记录来美化历史；
- 隐私、安全或法律风险由 Owner 决定撤回方式；
- Git 历史清理属于高风险维护操作，必须单独评估并公告影响。

## 成员退出

退出后取消写权限，Member 状态改为 `inactive`，历史正常记录与最终 Coverage Statement 默认保留。
