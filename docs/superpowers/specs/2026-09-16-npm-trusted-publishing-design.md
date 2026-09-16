# YB UI npm Trusted Publishing 设计

## 目标

为已公开的 `@chenyibo111/tokens`、`@chenyibo111/icons` 与 `@chenyibo111/ui` 建立无需长期 npm Token 的后续发布通道。发布只能由维护者手动发起，并从受控的 `main` 分支代码构建。

首个 `0.1.0` 版本已通过维护者本机的交互式 2FA 发布。本设计只覆盖后续版本，不会再次发布或修改 `0.1.0`。

## 发布流程

1. 组件改动提交时添加 Changeset，声明受影响的公开包及 semver 级别。
2. 维护者在准备发布时执行 `pnpm version-packages`，将版本号和锁文件变更提交并推送到 `main`。
3. 维护者在 GitHub Actions 手动运行 `publish.yml`，且只能选择 `main`。
4. 工作流安装锁定依赖、执行完整 `pnpm verify`，然后以 pnpm 的 workspace 发布能力递归发布 `packages/*` 中 npm 尚未存在的版本。
5. npm 通过 GitHub OIDC 短期凭据鉴权并自动生成 provenance；工作流不读取、不保存 npm Token。

`pnpm publish` 在打包时会将内部的 `workspace:*` 依赖转换为对应的实际版本，因此发布包可被普通 npm 消费者安装。

## GitHub Actions 设计

新增 `.github/workflows/publish.yml`：

- 只使用 `workflow_dispatch`，不监听 `push`、标签或 Pull Request。
- 发布 job 先检查 `GITHUB_REF` 是否为 `refs/heads/main`；其他分支手动运行时以失败退出，明确拒绝发布。
- 工作流最小权限为 `contents: read` 和 `id-token: write`。
- 使用 GitHub 托管的 Ubuntu runner、Node 24、pnpm 11.19.0，并确保 npm CLI 满足 Trusted Publishing 所需的版本。
- 每次发布前重新运行 `pnpm install --frozen-lockfile` 与 `pnpm verify`。
- 仅选择 `packages/*` 进行递归发布；docs、playground、Storybook 与根包绝不进入发布范围。
- 执行 `pnpm --filter "./packages/*" -r publish --access public --no-git-checks --report-summary`。`--access public` 保证 scoped 包公开；`--no-git-checks` 适配 Actions 的 detached checkout；`--report-summary` 保留本次实际发布包的清单。
- 不使用 `NODE_AUTH_TOKEN`、`NPM_TOKEN`、`.npmrc` 认证配置或 GitHub Secrets。

pnpm 对已经存在于 registry 的相同版本默认跳过；版本号在 npm 上已存在但 tarball 内容有差异时工作流必须失败，维护者应创建新版本而非覆盖。

## npm Trusted Publisher 绑定

首次启用前，维护者在 npm 的以下三个包设置中分别配置 Trusted Publisher：

- `@chenyibo111/tokens`
- `@chenyibo111/icons`
- `@chenyibo111/ui`

每项配置均选择 GitHub Actions，并填写：

- GitHub user or organization：`chenyibo111`
- repository：`yb-ui`
- workflow filename：`publish.yml`
- environment：留空（首期不引入 GitHub Environment）
- allowed action：允许 `npm publish`

维护者账号必须保持 2FA 的 authorization-and-publishing 模式。发布包设置应采用“Require two-factor authentication and disallow tokens”，但 Trusted Publishing 的 OIDC 流程仍可使用。

## 边界与失败处理

- 工作流失败、npm 绑定缺失、OIDC 不匹配或验证失败时，停止发布；不重试或修改 registry 中已有版本。pnpm 会跳过与 registry 中相同的已有版本。
- npm 侧配置工作流名时必须填写文件名 `publish.yml`，而不是路径；文件名调整需要在 npm 重新创建对应绑定。
- 不在本期自动创建 Release PR、自动提交版本号、自动打标签或自动发布。
- 不在本期加入 GitHub Environment 审批；如团队扩大，可在不改变 npm scope 或包 API 的前提下添加环境保护并在 npm 绑定中同步环境名。

## 验证标准

实施完成后应满足：

1. `publish.yml` 仅可手动触发，并在非 `main` ref 时不执行发布。
2. workflow 声明 `id-token: write` 且不引用 npm Token secret。
3. workflow 的发布目标限于三个公开包所在的 `packages/*`。
4. workflow 在发布前执行锁定安装与 `pnpm verify`。
5. YAML 静态校验、现有验证命令与发布 dry-run 均通过；任何验证步骤不得向 npm 发送新版本。
