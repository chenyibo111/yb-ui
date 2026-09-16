# YB UI

基于 React、Radix UI 与 CSS Variables 构建的内部通用组件库。首期采用 **Cobalt Pulse（钴蓝脉冲）** 浅色设计系统，组件结构已为深色主题预留。

> 首个公开版本计划为 `v0.1.0`。发布前组件 API 仍可能调整；发布后可从 npm 安装 `@chenyibo111/ui`、`@chenyibo111/icons` 与 `@chenyibo111/tokens`。

## 包结构

| 包 | 职责 |
| --- | --- |
| `@chenyibo111/tokens` | 语义化设计令牌与 CSS Variables |
| `@chenyibo111/icons` | 基于 Lucide 的稳定图标出口 |
| `@chenyibo111/ui` | React 基础组件、Provider 与样式 |
| `@chenyibo111/docs` | 基于 Next.js 与 MDX 的组件官网 |
| `@chenyibo111/storybook` | 组件交互与可访问性文档 |

## 已覆盖的组件

- 排版与布局：Text、Heading、Stack、Grid、Separator
- 操作与表单：Button、IconButton、Input、Textarea、Field、Checkbox、RadioGroup、Switch、Select
- 覆盖层与反馈：Dialog、Drawer、Popover、DropdownMenu、Tooltip、Alert、Toast、Skeleton、Spinner
- 导航与展示：Tabs、Breadcrumb、Card、Badge、Avatar、Empty
- 数据与日期：Table、Pagination、Calendar、DatePicker（单日期与范围）

## 本地开发

环境要求：Node.js 22+、pnpm 10+。

```bash
pnpm install
pnpm test
pnpm typecheck
pnpm build
pnpm storybook
```

启动中文组件文档站：

```bash
pnpm docs
```

构建静态 Storybook：

```bash
pnpm build-storybook
```

构建文档站生产版本：

```bash
pnpm build-docs
```

## Docs 与 Storybook

两者服务于不同场景：

- **Docs**：面向组件使用者，提供中文使用说明、可运行示例、源码与 API，入口为 `pnpm docs`。
- **Storybook**：面向组件开发与验收，提供状态组合、Controls 和 a11y 检查，入口为 `pnpm storybook`。

文档站使用 Vercel 从 GitHub 自动部署；本地仍可通过 `pnpm docs` 开发与预览。

## 在 React 项目中使用

安装发布后的包后，引入 UI 样式并在应用根部挂载 Provider：

```tsx
import "@chenyibo111/ui/styles.css"
import { Button, YBProvider } from "@chenyibo111/ui"

export function App() {
  return (
    <YBProvider locale="zh-CN">
      <Button>保存</Button>
    </YBProvider>
  )
}
```

`YBProvider` 内置 `zh-CN`（默认）与 `en-US` 文案。单个组件可继续通过自身 props 覆盖行为或语言相关配置。

## 开发约定

- 组件只消费 `@chenyibo111/tokens` 定义的语义令牌，不写死业务色值。
- 优先使用可访问的原生元素与 Radix UI 原语；键盘、焦点、ARIA 是组件 API 的一部分。
- 表单组件保持框架中立，不依赖 React Hook Form 或任何校验方案。
- Table 只提供展示结构；不耦合请求、数据源、排序、筛选或虚拟滚动。
- DatePicker 仅提供日期选择；不包含时间、时区和业务日历能力。

## 质量门槛

每批组件变更应至少通过：

```bash
pnpm test
pnpm typecheck
pnpm build
pnpm build-storybook
```

## 后续 npm 发布

首次版本已发布。后续版本使用 Changesets 与 GitHub Actions Trusted Publishing，不在仓库或 GitHub Secrets 保存 npm Token。

1. 修改公开包时运行 `pnpm changeset`，选择受影响的 `@chenyibo111/*` 包和语义化版本级别，并提交生成的 Changeset。
2. 准备发布时运行 `pnpm version-packages`，提交由此生成的包版本、变更日志和锁文件到 `main`。
3. 确认 npm 中的三个包都在 Settings → Trusted Publisher 中绑定 GitHub Actions：user or organization 为 `chenyibo111`，repository 为 `yb-ui`，workflow filename 为 `publish.yml`，并允许 `npm publish`。
4. 在 GitHub Actions 手动运行 “Publish packages”，并选择 `main`。工作流会重新执行 `pnpm verify`，再发布 npm 中尚不存在的版本。

`publish.yml` 不会因普通 push 或 tag 自动发布。工作流使用 GitHub OIDC 短期凭据；不要添加 `NPM_TOKEN`、`NODE_AUTH_TOKEN` 或 `.npmrc` 认证信息。

## 路线图

下一阶段将完成首次 npm 发布与消费者安装验证，并持续扩展组件与文档。
