# YB UI 文档站设计

## 目标

为 YB UI 新增一个独立的、面向组件使用者的中文文档官网。它要能讲清设计系统、展示真实可运行的组件组合、提供可复制的使用代码和稳定的 API 参考；同时保留现有 Storybook 作为组件开发、状态检查、Controls 与可访问性验证入口。

首期不部署、不接入登录或权限、不引入任何真实业务数据。站点内容按“内部优先、可公开演进”组织：所有示例使用中性模拟数据，部署方式和访问控制以后由平台层决定。

## 架构决策

新增 `apps/docs`，采用 Next.js App Router、Fumadocs 与 MDX。Next.js 负责站点壳、静态构建与 React 渲染；Fumadocs 提供文档导航、搜索索引、MDX 文档管线和文档页面组件；MDX 组织可长期维护的说明文字与示例；YB 的公开 npm 包提供真实组件、图标及令牌样式。

```text
使用者
  ├─ apps/docs       文档官网：说明、示例、代码、API
  └─ apps/storybook  开发工具：组件状态、Controls、a11y

apps/docs
  ├─ @yb/tokens/styles.css
  ├─ @yb/ui/styles.css
  ├─ @yb/ui
  └─ @yb/icons
```

文档站不得从 `packages/ui/src` 导入组件。这样示例本身就是外部项目会使用的消费方式，并持续验证 `@yb/ui` 的公共导出与样式入口。

## 信息架构

首期导航为中文，URL 保持稳定的英文片段，之后可以在不变更链接结构的情况下增加英文内容。

```text
/
├─ /docs/getting-started
├─ /docs/foundations
│  ├─ color
│  ├─ typography
│  ├─ spacing-and-layout
│  └─ themes
└─ /docs/components
   ├─ button
   ├─ input
   └─ dialog
```

首页负责传达 YB UI 的定位、Cobalt Pulse 设计语言、快速开始入口和三类组件入口。所有文档页共用顶栏、左侧分组导航、正文目录、移动端导航和页内上一页/下一页导航。站点顶栏提供 GitHub 仓库链接、Storybook 链接及“浅色主题（当前）”标识；不提供无法真正生效的深色主题切换开关。

## 内容模型

每篇组件文档都是一份 MDX 文件，按以下固定顺序组织：

1. 一句话用途和适用边界。
2. 主示例：组件最小且推荐的用法。
3. 2 至 4 个组合示例：覆盖最常用变体、状态与业务无关的常见组合。
4. 每个示例的可复制 TypeScript/TSX 源码。
5. API 参考：属性名、TypeScript 类型、默认值、说明。
6. 可访问性和使用注意事项。
7. 关联组件链接。

示例 React 组件存放在 `apps/docs/components/examples/<component>/`。每个示例文件只导出一个可渲染 React 示例，并只从 `@yb/*` 公开入口导入。MDX 页面通过统一的 `ComponentPreview` 渲染真实示例，并通过 `SourceCode` 渲染同一示例的源码字符串；源码和预览必须来自同一文件，避免展示代码与实际运行结果漂移。

基础规范页面使用 MDX 和少量展示组件：颜色页展示语义令牌及其用途，排版页展示字体层级，间距与布局页展示 4px 基准与 Stack/Grid 用法，主题页明确“当前仅浅色，令牌结构已为 `.dark` 选择器预留”。这些页面不承诺尚未交付的暗色主题。

## API 参考策略

首期 API 表格由人工维护的结构化数据生成，而不是直接依赖 TypeScript docgen。原因是现有组件包含 Radix 透传属性与组合型 API，原始自动提取会得到大量不利于阅读的继承字段。

每个首期组件页面仅列出 YB 明确支持、最常用的公共属性；透传的原生属性用简短说明集中列出。API 数据作为组件文档附近的 TypeScript 常量维护，页面通过统一 `ApiTable` 渲染。后续组件数量增加后，再引入 TSDoc/docgen 作为补充来源，而不改变页面结构。

## 视觉与交互准则

文档站本身使用 YB 的语义令牌和基础组件，但官网布局不进入 `@yb/ui` 的发布范围。布局保持大量留白、较强层级、窄正文阅读列和宽示例画布；示例区使用中性表面和细边框，代码区提供复制按钮与 TSX 语言标记。

首页和组件页重点展示“完成一个任务”的组合案例，而非只把所有 props 平铺出来。首期示例如下：

| 页面 | 组合示例 |
|---|---|
| Button | 主按钮、变体矩阵、图标按钮、提交加载态 |
| Input | 基础输入、带 Field 的标签/说明/错误、禁用状态 |
| Dialog | 基础确认、删除确认、包含 Field 与 Input 的表单对话框 |

## 质量与测试

`apps/docs` 必须提供 `dev`、`build`、`typecheck` 与 `test` 脚本，并纳入根 `pnpm verify` 的递归命令。构建必须在工作区包构建之后执行，延续当前“先 build、再 typecheck”的依赖顺序。

测试使用 Vitest 和 Testing Library，至少覆盖：首页包含快速开始入口；Button、Input、Dialog 文档页能渲染对应真实组件示例；API 表格与示例源码区域存在。MDX 页面与示例之间的导入错误由 `pnpm --filter @yb/docs build` 捕获。

现有 `.github/workflows/verify.yml` 增加文档站构建命令。Storybook 继续保留在同一工作流中；两者分别承担文档官网与组件验收职责。

## 非目标

- 本期不发布或托管文档站。
- 本期不加入账号、权限、埋点、评论、国际化路由或暗色主题界面。
- 本期不为所有现有组件补齐官网页；仅完成 Button、Input、Dialog 的完整模板。
- 本期不将 Storybook 改造成主文档站，也不删除已有 stories。

## 验收标准

1. `pnpm docs` 可启动独立中文文档站，且页面使用 YB 公共包渲染真实组件。
2. `pnpm build-docs` 可静态构建文档站。
3. 首页、4 个设计规范页、3 个组件文档页均可通过导航访问。
4. Button、Input、Dialog 页面各有主示例、多个组合示例、源码展示、API 表格与使用注意事项。
5. `pnpm verify`、文档站测试、Storybook 构建均通过，并在 CI 中执行。
