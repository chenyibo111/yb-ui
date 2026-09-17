# YB UI 文档站完善 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 YB UI 文档站从 3 个组件示例页扩展为可发现、可运行、可复制且能随 Token 演进的组件库使用入口。

**Architecture:** `apps/docs` 继续使用 Next.js、Fumadocs 和 MDX；组件页面和示例仅消费已发布的 `@chenyibo111/*` 公开入口。组件总览与 Token Reference 使用文档侧的结构化目录驱动，运行时色值始终通过 `var(--yb-*)` 渲染，避免复制 CSS 常量。

**Tech Stack:** Next.js 16、React 19、Fumadocs、MDX、TypeScript、Vitest、Testing Library、Tailwind CSS 4、`@chenyibo111/ui`、`@chenyibo111/icons`、`@chenyibo111/tokens`。

**Spec:** `docs/superpowers/specs/2026-09-14-yb-ui-docs-design.md`（原始文档站架构）及已确认的“组件覆盖优先、再完善 Token 与 Recipes”路线。

## Global Constraints

- 工作目录为 `D:\AI\yb-ui` 的 `main` 分支；直接在当前仓库提交，不创建工作区副本。
- 文档页、示例和测试只能从 `@chenyibo111/ui`、`@chenyibo111/icons`、`@chenyibo111/tokens` 的公开入口导入；禁止从 `packages/*/src` 导入。
- 所有新增可见文案使用中文，URL 维持英文、稳定且可预测的片段。
- 当前只展示浅色主题；不新增深色主题开关，也不暗示暗色 Token 已交付。
- 所有色彩示例以 `var(--yb-*)` 绘制；不得在文档组件或 CSS 中手抄 Token 的 OKLCH/Hex 值。
- 组件页面均包含用途与边界、至少一个可运行示例、对应源码、公共 API、无障碍/使用注意事项和关联链接。
- 行为性 React 示例遵循 TDD：先写失败的 Vitest/Testing Library 测试，再写最小实现；MDX 静态文案不单独添加脆弱的文本快照测试。
- 每批修改运行 `pnpm --filter @chenyibo111/docs test` 与 `pnpm build-docs`；所有批次完成时运行 `pnpm verify` 与 `pnpm build-storybook`。
- 文档内容变更不修改 `packages/ui` 或 `packages/tokens` 的版本；仅文档站变更无需 npm 发版，推送 `main` 后由 Vercel 部署。

---

## 文件结构与内容分类

```text
apps/docs/
├─ components/
│  ├─ docs/component-catalog.tsx          组件总览的可访问目录卡片
│  ├─ docs/component-catalog.test.tsx
│  ├─ foundations/token-reference.tsx     非颜色 Token 的真实变量展示
│  ├─ foundations/token-reference.test.tsx
│  ├─ examples/<component>/*.tsx          每个组件的真实运行示例
│  └─ recipes/*.tsx                       业务无关的组合场景
├─ content/docs/
│  ├─ components/index.mdx                全部组件入口
│  ├─ components/forms/*.mdx              表单与输入组件
│  ├─ components/feedback/*.mdx           状态与反馈组件
│  ├─ components/overlay/*.mdx            浮层与确认组件
│  ├─ components/navigation/*.mdx         导航组件
│  ├─ components/data-display/*.mdx       数据与展示组件
│  ├─ foundations/*.mdx                   色彩、排版、间距、Token Reference、主题规划
│  └─ recipes/*.mdx                       可复制的组合方案
└─ lib/
   ├─ component-catalog.ts                33 个组件的名称、分类、摘要与文档状态
   └─ token-catalog.ts                    `ybTokenNames` 的分类与用途说明
```

组件目录的固定分类如下，避免侧边栏按实现文件夹随机增长：

| 分类 | 组件 |
| --- | --- |
| 表单与输入 | Input、Textarea、Field、Checkbox、RadioGroup、Select、Switch、Calendar、DatePicker |
| 反馈与状态 | Alert、Badge、Empty、Skeleton、Spinner、Toast、Tooltip |
| 浮层与操作 | Dialog、Drawer、DropdownMenu、Popover、Button、IconButton |
| 导航与结构 | Breadcrumb、Tabs、Pagination、Separator、Stack、Grid、Heading、Text |
| 数据与展示 | Avatar、Card、Table |

每个 `meta.json` 中的页面顺序与此表一致；`components/index.mdx` 是总入口，不替代单个组件页。

### Task 1: 建立组件目录与完整导航入口

**Files:**
- Create: `apps/docs/lib/component-catalog.ts`
- Create: `apps/docs/components/docs/component-catalog.tsx`
- Create: `apps/docs/components/docs/component-catalog.test.tsx`
- Create: `apps/docs/content/docs/components/index.mdx`
- Modify: `apps/docs/content/docs/components/meta.json`
- Modify: `apps/docs/components/mdx.tsx`

**Interfaces:**
- Consumes: 已发布 `@chenyibo111/ui` 的 33 个公共组件目录与 Fumadocs MDX 注册机制。
- Produces: `ComponentCatalogEntry`、`componentCatalog`、`ComponentCatalog()` 和 `/docs/components` 总览路由。

- [ ] **Step 1: 写组件目录的失败测试**

创建 `component-catalog.test.tsx`，渲染两个最小条目并断言分类标题、组件名称、摘要和链接均可访问：

```tsx
render(<ComponentCatalog entries={entries} />)
expect(screen.getByRole("heading", { name: "表单与输入" })).toBeInTheDocument()
expect(screen.getByRole("link", { name: "Select 选择器" })).toHaveAttribute("href", "/docs/components/select")
```

- [ ] **Step 2: 运行测试并确认红灯**

Run: `pnpm --filter @chenyibo111/docs test -- components/docs/component-catalog.test.tsx`

Expected: 因 `ComponentCatalog` 或 `ComponentCatalogEntry` 尚不存在而失败。

- [ ] **Step 3: 实现结构化目录与总览组件**

在 `component-catalog.ts` 定义：

```ts
export type ComponentCatalogEntry = {
  category: "表单与输入" | "反馈与状态" | "浮层与操作" | "导航与结构" | "数据与展示"
  description: string
  href: string
  name: string
  status: "documented" | "planned"
}
```

录入全部 33 个组件；已经有完整页面的 Button、Input、Dialog 标记为 `documented`，其余标记为 `planned`。`ComponentCatalog` 使用语义 `<section>`、`<h2>` 和链接列表渲染分组，状态文本使用“已完善”或“文档编写中”，不将未完成项伪装成已可用页面。

- [ ] **Step 4: 增加 `/docs/components` MDX 页面与导航**

在 `index.mdx` 说明组件库以公开 API 为准，并插入 `<ComponentCatalog />`。在 `meta.json` 中将 `index` 放在首位，随后按固定分类排序已完成页面；未有 MDX 的组件暂不写入 Fumadocs 页面导航，只通过总览标记“文档编写中”。

- [ ] **Step 5: 验证并提交**

Run: `pnpm --filter @chenyibo111/docs test -- components/docs/component-catalog.test.tsx; pnpm build-docs`

Expected: 组件总览可静态生成，且每个已存在链接对应真实页面。

```bash
git add apps/docs/lib/component-catalog.ts apps/docs/components/docs/component-catalog.tsx apps/docs/components/docs/component-catalog.test.tsx apps/docs/components/mdx.tsx apps/docs/content/docs/components
git commit -m "docs: add component catalog and overview"
```

### Task 2: 交付表单与输入组件文档批次

**Files:**
- Create: `apps/docs/content/docs/components/forms/{field,textarea,checkbox,radio-group,select,switch,calendar,date-picker}.mdx`
- Create: `apps/docs/components/examples/{field,textarea,checkbox,radio-group,select,switch,calendar,date-picker}/*.tsx`
- Create: `apps/docs/components/examples/forms-examples.test.tsx`
- Create: `apps/docs/content/docs/components/forms/meta.json`
- Modify: `apps/docs/content/docs/components/meta.json`
- Modify: `apps/docs/lib/component-catalog.ts`

**Interfaces:**
- Consumes: `ComponentPreview`、`SourceCode`、`ApiTable` 与公开的 `Field`、`Textarea`、`Checkbox`、`RadioGroup`、`Select`、`Switch`、`Calendar`、`DatePicker`。
- Produces: 8 个独立路由和覆盖标签、错误状态、受控值、禁用、键盘操作与日期选择的真实示例。

- [ ] **Step 1: 写三类高风险交互的失败测试**

在 `forms-examples.test.tsx` 添加三个独立测试：`Field` 将错误关联至输入框、`Select` 能以键盘选择选项、`DatePicker` 显示中文可访问名称。示例：

```tsx
await user.click(screen.getByRole("combobox", { name: "处理优先级" }))
await user.keyboard("{ArrowDown}{Enter}")
expect(screen.getByRole("combobox", { name: "处理优先级" })).toHaveTextContent("高")
```

- [ ] **Step 2: 运行测试并确认红灯**

Run: `pnpm --filter @chenyibo111/docs test -- components/examples/forms-examples.test.tsx`

Expected: 因表单示例模块尚不存在而失败。

- [ ] **Step 3: 实现最小可运行示例**

每个示例单独导出一个 React 组件；受控组件用 `useState`，不使用模拟 API。`Field` 示例必须包含 `error`、`description` 与关联输入；Select/DatePicker 示例必须使用 YB 已提供的组合原语和 `zhCN` 文案；Textarea 示例明确聊天输入与普通长文本的不同 resize 约束。

- [ ] **Step 4: 编写 8 篇 MDX 页面**

每页按固定顺序写用途、何时不用、预览、同源源码、API 和无障碍注意事项。Select 页面必须说明它是受控浮层，不能用原生 `<select>` 样式猜测打开菜单；DatePicker 页面明确当前的日期值与时区策略由业务应用决定。

- [ ] **Step 5: 更新目录状态、验证并提交**

将 8 个条目的 `status` 设为 `documented`，更新 `meta.json`。运行：

```bash
pnpm --filter @chenyibo111/docs test -- components/examples/forms-examples.test.tsx
pnpm build-docs
git add apps/docs/components/examples apps/docs/content/docs/components/forms apps/docs/content/docs/components/meta.json apps/docs/lib/component-catalog.ts
git commit -m "docs: add form component guides"
```

### Task 3: 交付反馈与状态组件文档批次

**Files:**
- Create: `apps/docs/content/docs/components/feedback/{alert,badge,empty,skeleton,spinner,toast,tooltip}.mdx`
- Create: `apps/docs/components/examples/{alert,badge,empty,skeleton,spinner,toast,tooltip}/*.tsx`
- Create: `apps/docs/components/examples/feedback-examples.test.tsx`
- Create: `apps/docs/content/docs/components/feedback/meta.json`
- Modify: `apps/docs/content/docs/components/meta.json`
- Modify: `apps/docs/lib/component-catalog.ts`

**Interfaces:**
- Consumes: `Alert`、`Badge`、`Empty`、`Skeleton`、`Spinner`、Toast 原语、Tooltip 原语和 Button。
- Produces: 7 个组件页面，说明反馈范围、可访问状态和可恢复操作。

- [ ] **Step 1: 写反馈行为的失败测试**

添加测试，验证 destructive Alert 使用 `role="alert"`、loading Button/Spinner 提供状态文本、Toast 能由明确的触发操作打开。测试不校验 `.yb-*` 类名。

- [ ] **Step 2: 运行测试并确认红灯**

Run: `pnpm --filter @chenyibo111/docs test -- components/examples/feedback-examples.test.tsx`

Expected: 因反馈示例尚不存在而失败。

- [ ] **Step 3: 实现示例与状态边界**

Alert 展示 info/success/warning/destructive 的用途；Badge 区分静态状态与可点击操作；Empty 携带可选恢复按钮；Skeleton 固定示例几何；Spinner 使用真实可读标签；Toast 展示触发、关闭与动作；Tooltip 只补充图标按钮，不承担唯一信息来源。

- [ ] **Step 4: 编写 MDX、更新目录与验证**

每页包含恰当的 `aria-live`/`role` 使用说明，强调 Toast 不应承载唯一的错误恢复指引。将 7 个组件状态更新为 `documented`，运行：

```bash
pnpm --filter @chenyibo111/docs test -- components/examples/feedback-examples.test.tsx
pnpm build-docs
git add apps/docs/components/examples apps/docs/content/docs/components/feedback apps/docs/content/docs/components/meta.json apps/docs/lib/component-catalog.ts
git commit -m "docs: add feedback component guides"
```

### Task 4: 交付浮层、导航、结构与数据展示组件文档批次

**Files:**
- Create: `apps/docs/content/docs/components/{overlay,navigation,data-display,layout}/**/*.mdx`
- Create: `apps/docs/components/examples/{drawer,dropdown-menu,popover,breadcrumb,tabs,pagination,avatar,card,table,grid,heading,icon-button,separator,stack,text}/*.tsx`
- Create: `apps/docs/components/examples/navigation-and-data-examples.test.tsx`
- Create: `apps/docs/content/docs/components/{overlay,navigation,data-display,layout}/meta.json`
- Modify: `apps/docs/content/docs/components/meta.json`
- Modify: `apps/docs/lib/component-catalog.ts`

**Interfaces:**
- Consumes: 15 个公开组件及现有 Dialog 文档的交互约定。
- Produces: Drawer、DropdownMenu、Popover、Breadcrumb、Tabs、Pagination、Avatar、Card、Table、Grid、Heading、IconButton、Separator、Stack、Text 的独立使用页。

- [ ] **Step 1: 写浮层、导航和表格的失败测试**

至少覆盖：DropdownMenu 键盘打开和关闭、Tabs 切换时关联 panel 可见、Pagination 当前页有 `aria-current`、Table 使用原生 `table` 语义。每项写独立的 Testing Library 测试。

- [ ] **Step 2: 运行测试并确认红灯**

Run: `pnpm --filter @chenyibo111/docs test -- components/examples/navigation-and-data-examples.test.tsx`

Expected: 因对应示例模块不存在而失败。

- [ ] **Step 3: 实现示例**

Drawer 与 Popover 页面说明模态/非模态边界；DropdownMenu 展示禁用项和分组；Breadcrumb、Tabs、Pagination 使用真实链接或受控状态；Table 示例展示 caption、表头和空数据边界；布局组件仅展示组合节奏，不变成业务页面模板。

- [ ] **Step 4: 编写 MDX 与目录状态**

每个浮层页面记录焦点、Escape、触发元素和关闭恢复规则；Table 页面说明无界大数据、排序、筛选和虚拟滚动不属于首期 Table；布局页说明组件与业务 CSS 的责任边界。更新全部已完成组件为 `documented`。

- [ ] **Step 5: 验证并提交**

```bash
pnpm --filter @chenyibo111/docs test -- components/examples/navigation-and-data-examples.test.tsx
pnpm build-docs
git add apps/docs/components/examples apps/docs/content/docs/components apps/docs/lib/component-catalog.ts
git commit -m "docs: add navigation and data component guides"
```

### Task 5: 交付完整 Token Reference 与主题边界说明

**Files:**
- Create: `apps/docs/lib/token-catalog.ts`
- Create: `apps/docs/components/foundations/token-reference.tsx`
- Create: `apps/docs/components/foundations/token-reference.test.tsx`
- Create: `apps/docs/content/docs/foundations/token-reference.mdx`
- Modify: `apps/docs/content/docs/foundations/{meta.json,typography.mdx,spacing-and-layout.mdx,themes.mdx}`

**Interfaces:**
- Consumes: `ybTokenNames`、`YBTokenName` 与已存在的颜色色板。
- Produces: `/docs/foundations/token-reference`，展示 46 个 Token 的分类、CSS 变量名、用途和真实运行时外观。

- [ ] **Step 1: 写 Token 覆盖失败测试**

测试把 `ybTokenNames` 与 token catalog 中的条目比较，断言每个公共 Token 恰好被分类一次；并渲染空间 Token，断言它使用 `var(--yb-space-*)` 作为可见长度。示例：

```tsx
expect(new Set(tokenCatalog.map((item) => item.name))).toEqual(new Set(ybTokenNames))
expect(screen.getByLabelText("间距 4：--yb-space-4")).toHaveStyle({ width: "var(--yb-space-4)" })
```

- [ ] **Step 2: 运行测试并确认红灯**

Run: `pnpm --filter @chenyibo111/docs test -- components/foundations/token-reference.test.tsx`

Expected: 因 Token catalog 与 Token Reference 不存在而失败。

- [ ] **Step 3: 实现 Token catalog 和真实预览**

Color Token 继续复用已有 `ColorTokenGrid`；字体展示使用 `font-family: var(--yb-font-*)`；间距用真实宽度尺；圆角用相同表面不同 `border-radius`；阴影用相同卡片不同 `box-shadow`；z-index 仅展示用途与层级关系，不伪造可交互堆叠演示。

- [ ] **Step 4: 更新基础规范文档**

色彩、排版、间距页面增加指向 Token Reference 的链接。主题页面明确：`.dark` 选择器是架构入口，当前值与浅色相同，不提供主题切换 UI；暗色 Token 实施时仅更新 `@chenyibo111/tokens`，文档预览将自动反映变化。

- [ ] **Step 5: 验证并提交**

```bash
pnpm --filter @chenyibo111/docs test -- components/foundations/token-reference.test.tsx
pnpm build-docs
git add apps/docs/lib/token-catalog.ts apps/docs/components/foundations apps/docs/content/docs/foundations
git commit -m "docs: add complete token reference"
```

### Task 6: 交付真实消费者 Recipes 与 CSS 扩展契约

**Files:**
- Create: `apps/docs/content/docs/recipes/meta.json`
- Create: `apps/docs/content/docs/recipes/{async-submit,field-errors,confirm-destructive-action,chat-composer,consumer-css-boundaries}.mdx`
- Create: `apps/docs/components/recipes/{async-submit,field-errors,confirm-destructive-action,chat-composer}.tsx`
- Create: `apps/docs/components/recipes/recipes.test.tsx`
- Modify: `apps/docs/content/docs/meta.json`

**Interfaces:**
- Consumes: Button、Field、Input、Textarea、Alert、Dialog、Card、Spinner、YBProvider 和 Token CSS 公开入口。
- Produces: 5 个与业务无关但可复制的接入方案，吸收智能客服消费者项目中的经验而不导入其业务代码。

- [ ] **Step 1: 写异步与错误恢复的失败测试**

测试 `AsyncSubmitRecipe` 点击后 Button 进入 `aria-busy` 并禁用，失败后保留输入值且显示 destructive Alert；测试删除确认示例只在确认后改变结果文本。

- [ ] **Step 2: 运行测试并确认红灯**

Run: `pnpm --filter @chenyibo111/docs test -- components/recipes/recipes.test.tsx`

Expected: 因 Recipe 示例尚不存在而失败。

- [ ] **Step 3: 实现可交互 Recipe 示例**

使用本地 Promise 与显式成功/失败状态，不请求网络。聊天输入示例展示 `Textarea`、发送 loading 和禁用规则；字段错误示例展示 `Field error`；确认操作示例使用 Dialog；CSS 边界页面明确消费者应使用 props、`className` 和 `--yb-*`，不得依赖 `.yb-*` 内部类或 `yb-*` 动画名。

- [ ] **Step 4: 编写 Recipes MDX 并接入导航**

每篇内容给出最小可复制代码、适用范围和不适用场景。`consumer-css-boundaries.mdx` 明确公共 CSS 导入顺序：Tokens、UI、应用样式，并给出 `CardContent className` 的应用自有选择器示例。

- [ ] **Step 5: 验证并提交**

```bash
pnpm --filter @chenyibo111/docs test -- components/recipes/recipes.test.tsx
pnpm build-docs
git add apps/docs/components/recipes apps/docs/content/docs/recipes apps/docs/content/docs/meta.json
git commit -m "docs: add consumer integration recipes"
```

### Task 7: 完善首页、跨页发现性与文档交付门槛

**Files:**
- Modify: `apps/docs/components/home/home-page.tsx`
- Modify: `apps/docs/components/home/home-page.test.tsx`
- Modify: `apps/docs/app/globals.css`
- Modify: `apps/docs/content/docs/getting-started.mdx`
- Modify: `apps/docs/content/docs/content.test.ts`
- Modify: `.github/workflows/verify.yml`
- Modify: `README.md`

**Interfaces:**
- Consumes: Task 1 的 component catalog、Task 5 的 Token Reference、Task 6 的 Recipes 路由和既有 Vercel 部署。
- Produces: 首页通往组件总览、Token Reference、Recipes 与 Storybook 的明确入口；CI 对所有 MDX 页面和交互示例执行校验。

- [ ] **Step 1: 写首页发现性失败测试**

在 `home-page.test.tsx` 添加断言：首页具有“组件总览”“Token Reference”“业务 Recipes”三个链接，分别指向 `/docs/components`、`/docs/foundations/token-reference`、`/docs/recipes/async-submit`。

- [ ] **Step 2: 运行测试并确认红灯**

Run: `pnpm --filter @chenyibo111/docs test -- components/home/home-page.test.tsx`

Expected: 因首页尚未提供三个入口而失败。

- [ ] **Step 3: 实现首页与跨页链接**

首页保持钴蓝脉冲现有视觉语言，新增三张明确指向上述内容的入口卡片，不增加装饰性统计数字。快速开始页增加“按任务查找组件”的总览链接；每个分类首页链接到相邻分类和 Token Reference。

- [ ] **Step 4: 扩展内容完整性测试与 CI**

`content.test.ts` 断言组件总览、Token Reference、5 个 Recipes 路由存在，并断言目录中的每个 `documented` 条目均对应可加载的 MDX 页面。`verify.yml` 继续执行 docs 测试、`pnpm build-docs` 和 Storybook 构建；README 区分 Docs（使用说明、示例、API、Recipes）与 Storybook（开发状态、Controls、组件验收）。

- [ ] **Step 5: 执行最终验证并提交**

```bash
pnpm --filter @chenyibo111/docs test
pnpm build-docs
pnpm verify
pnpm build-storybook
git diff --check
git status --short
git add apps/docs .github/workflows/verify.yml README.md
git commit -m "docs: complete YB UI documentation experience"
```

Expected: 所有 Docs 路由静态构建成功，33 个组件在总览中均可发现，完成状态的组件页面均可访问，Token 与 Recipes 页面均从公开包入口运行。

## 交付顺序与发布策略

1. 先执行 Task 1，使全部能力可发现；它不依赖任何新组件页面。
2. Task 2、Task 3、Task 4 按顺序执行，避免同一 `meta.json` 与 catalog 文件在并行任务中发生冲突。
3. Task 5 在组件页面稳定后执行，作为 Token 的唯一完整参考。
4. Task 6 用真实消费者经验沉淀使用契约。
5. Task 7 仅在前六项可访问后收束首页与 CI 门槛。
6. 每个任务独立提交并推送 `main`；Vercel 自动部署文档站。仅文档变更不运行 `pnpm changeset`，不触发 npm 包发布。

## 计划自检

- 组件发现性、31 个待补页面、46 个 Token、真实消费者 Recipes、首页入口与 CI 门槛均有对应任务。
- 没有新增暗色主题、业务 API、私有源码导入或 npm 发布流程。
- Task 2 至 Task 7 都含有失败测试、绿灯验证和独立提交边界。
