# YB UI

基于 React、Radix UI 与 CSS Variables 构建的内部通用组件库。首期采用 **Cobalt Pulse（钴蓝脉冲）** 浅色设计系统，组件结构已为深色主题预留。

> 当前为 `v0.1.0` 开发阶段：组件 API 与发布流程仍可能调整，暂不建议作为外部公共依赖使用。

## 包结构

| 包 | 职责 |
| --- | --- |
| `@yb/tokens` | 语义化设计令牌与 CSS Variables |
| `@yb/icons` | 基于 Lucide 的稳定图标出口 |
| `@yb/ui` | React 基础组件、Provider 与样式 |
| `@yb/docs` | 基于 Next.js 与 MDX 的组件官网 |
| `@yb/storybook` | 组件交互与可访问性文档 |

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

本期只交付本地文档站，部署配置不在当前范围内。

## 在 React 项目中使用

安装发布后的包后，引入 UI 样式并在应用根部挂载 Provider：

```tsx
import "@yb/ui/styles.css"
import { Button, YBProvider } from "@yb/ui"

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

- 组件只消费 `@yb/tokens` 定义的语义令牌，不写死业务色值。
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

## 路线图

下一阶段将完成消费者 Playground、视觉回归、发布版本管理与 GitHub Actions 自动化，随后发布内部 `v0.1.0` 预览版本。
