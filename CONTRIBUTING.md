# 参与与贡献

After Close 采用封闭写入、开放阅读模式，不接受公开内容投稿或成员申请。

## 受邀成员流程

1. 接受 `after-close-lab` Organization 邀请；
2. Clone 仓库并运行 `gh auth login`；
3. 由 Maintainer 创建 Member 配置与个人目录；
4. 运行 `pnpm after-close init` 和 `pnpm after-close doctor`；
5. 使用 `after-close` Skill 创建记录；
6. 发布前查看完整内容与 Git Diff；
7. 通过个人分支创建 Pull Request；
8. 等待校验通过并合并。

## 本地检查

```bash
pnpm validate
pnpm test
pnpm build
```

## Pull Request 约定

- 内容 PR 只修改作者自己的记录或复盘目录；
- 一个 PR 聚焦一个决策记录、一次复盘或一组紧密关联的修改；
- 不提交账户号、订单号、密钥、Token、完整对账单或未脱敏截图；
- 不使用荐股、保证收益或引导跟单的表达；
- 实质性历史修订必须明确说明原因并建立 Amendment 关系。

外部 Pull Request 会被 Ownership 校验拒绝，维护者可直接关闭。
