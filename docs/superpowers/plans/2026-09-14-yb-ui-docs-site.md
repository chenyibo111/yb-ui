# YB UI 文档站 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在现有 pnpm 工作区中交付一个使用 Next.js、Fumadocs 和 MDX 的 YB UI 中文组件库官网，并保留 Storybook 作为内部组件验收工具。

**Architecture:** 新增 `apps/docs` 独立 Next.js App Router 应用，使用 Fumadocs MDX 从本地 `content/docs` 构建导航与检索。站点组件与 MDX 示例只从 `@yb/ui`、`@yb/icons` 和 `@yb/tokens` 的公开入口消费组件；Storybook 不迁移、不删除。

**Tech Stack:** Next.js 16、React 19、TypeScript、Fumadocs Core/UI/MDX、Tailwind CSS 4、Vitest、Testing Library、pnpm workspaces。

**Spec:** `docs/superpowers/specs/2026-09-14-yb-ui-docs-design.md`

## Global Constraints

- 工作目录为 `D:\AI\yb-ui` 的 `main` 分支；不要创建 git worktree。
- `apps/docs` 中的组件示例只能导入 `@yb/ui`、`@yb/icons`、`@yb/tokens/styles.css`、`@yb/ui/styles.css`，不能导入 `packages/ui/src`。
- 首期所有可见文案为中文；URL 使用稳定英文片段；不实现暗色主题开关、登录、部署、埋点或业务数据。
- Fumadocs 当前版本要求 Node.js 22；将根 `engines.node` 更新为 `>=22.0.0`，CI 继续使用 Node 24。
- `@yb/ui` 的聚合入口包含 React Client Components；任何直接从该入口导入组件的 docs 展示模块都以 `"use client"` 作为文件第一行，路由页保持 Server Component 并只渲染这些展示模块。
- 每个行为性 React 组件先写 Vitest/Testing Library 失败测试，再实施最小实现；Next/Fumadocs 配置文件不适用 TDD。
- 构建依赖顺序保持 `lint → build → typecheck → test`；文档站的 `build` 必须从干净工作区使用已构建的 `@yb` 包成功。

---

## 文件结构

```text
apps/docs/
├─ app/
│  ├─ (home)/page.tsx
│  ├─ api/search/route.ts
│  ├─ docs/[[...slug]]/page.tsx
│  ├─ docs/layout.tsx
│  ├─ layout.tsx
│  └─ globals.css
├─ components/
│  ├─ docs/api-table.tsx
│  ├─ docs/component-preview.tsx
│  ├─ docs/source-code.tsx
│  ├─ examples/button/*.tsx
│  ├─ examples/input/*.tsx
│  ├─ examples/dialog/*.tsx
│  ├─ home/home-page.tsx
│  └─ mdx.tsx
├─ content/docs/
│  ├─ meta.json
│  ├─ getting-started.mdx
│  ├─ foundations/{meta.json,color,typography,spacing-and-layout,themes}.mdx
│  └─ components/{meta.json,button,input,dialog}.mdx
├─ lib/{layout.shared,source}.ts
├─ source.config.ts
├─ next.config.mjs
├─ vitest.config.ts
├─ postcss.config.mjs
├─ package.json
└─ tsconfig.json
```

### Task 1: 创建文档站工作区与 Fumadocs 基础配置

**Files:**
- Create: `apps/docs/package.json`
- Create: `apps/docs/tsconfig.json`
- Create: `apps/docs/next.config.mjs`
- Create: `apps/docs/postcss.config.mjs`
- Create: `apps/docs/source.config.ts`
- Create: `apps/docs/lib/source.ts`
- Create: `apps/docs/lib/layout.shared.tsx`
- Create: `apps/docs/app/layout.tsx`
- Create: `apps/docs/app/globals.css`
- Create: `apps/docs/app/docs/layout.tsx`
- Create: `apps/docs/app/docs/[[...slug]]/page.tsx`
- Create: `apps/docs/app/api/search/route.ts`
- Create: `apps/docs/components/mdx.tsx`
- Modify: `package.json`
- Modify: `.gitignore`

**Interfaces:**
- Consumes: `@yb/tokens/styles.css`, `@yb/ui/styles.css`, public `@yb/ui` exports and the repository root pnpm workspace definition.
- Produces: package `@yb/docs`; `pnpm docs`, `pnpm build-docs`, `pnpm --filter @yb/docs build`, Fumadocs `source`, `baseOptions`, and catch-all `/docs/*` routing.

- [ ] **Step 1: Add the workspace package and framework dependencies**

Create `apps/docs/package.json` with scripts `dev: next dev`, `build: next build`, `typecheck: tsc --noEmit`, and `test: vitest run`. Declare workspace dependencies on all three `@yb` packages and React 19; add Next 16, `fumadocs-core`, `fumadocs-mdx`, `fumadocs-ui`, `@types/mdx`, Tailwind CSS 4, `@tailwindcss/postcss`, Vitest, jsdom, and Testing Library dependencies. Add root shortcut scripts:

```json
{
  "docs": "pnpm --filter @yb/docs dev",
  "build-docs": "pnpm --filter @yb/docs build"
}
```

Change root Node engine to `>=22.0.0`; add `apps/docs/.next/` and `apps/docs/.source/` to `.gitignore`.

- [ ] **Step 2: Install and verify dependency resolution**

Run: `pnpm install`

Expected: `pnpm-lock.yaml` contains `@yb/docs` and resolves Next/Fumadocs without altering unrelated workspace packages.

- [ ] **Step 3: Configure the content source and Fumadocs shell**

Configure `next.config.mjs` using Fumadocs `createMDX()`. Create `source.config.ts` using `defineDocs({ dir: "content/docs" })`; create `lib/source.ts` by loading its Fumadocs source with `baseUrl: "/docs"`. `lib/layout.shared.tsx` returns `BaseLayoutProps` with `nav.title: "YB UI"`, a GitHub link, and a Storybook link. Root layout imports both YB CSS entry points before site CSS, wraps children in `RootProvider`, and sets `<html lang="zh-CN">`.

```tsx
export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
})
```

`app/docs/layout.tsx` uses `DocsLayout` with `source.pageTree`; the catch-all page loads `source.getPage(slug)`, renders `DocsPage`, title, description, table of contents and MDX body, and returns `notFound()` for unknown slugs. Search route returns `createFromSource(source)`.

- [ ] **Step 4: Run the first production build**

Run: `pnpm --filter @yb/docs build`

Expected: the new application compiles its route shell; the build may have no content pages yet but must not have unresolved `@yb/*` imports.

- [ ] **Step 5: Commit the workspace foundation**

```bash
git add package.json pnpm-lock.yaml .gitignore apps/docs
git commit -m "feat: add YB UI docs application foundation"
```

### Task 2: 交付官网首页、视觉壳与可测试导航

**Files:**
- Create: `apps/docs/components/home/home-page.tsx`
- Create: `apps/docs/components/home/home-page.test.tsx`
- Create: `apps/docs/app/(home)/page.tsx`
- Create: `apps/docs/vitest.config.ts`
- Create: `apps/docs/src/test/setup.ts`
- Modify: `apps/docs/app/globals.css`

**Interfaces:**
- Consumes: `Button`, `Card`, `CardContent`, `CardHeader`, `CardTitle`, `Heading`, `Text` from `@yb/ui` and `ArrowRightIcon` from `@yb/icons`.
- Produces: `HomePage(): JSX.Element`, linked navigation to `/docs/getting-started`, `/docs/foundations/color`, `/docs/components/button`, and a testable Cobalt Pulse homepage.

- [ ] **Step 1: Write the failing homepage test**

Create `home-page.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react"
import { HomePage } from "./home-page"

test("renders quick start and documentation entry points", () => {
  render(<HomePage />)
  expect(screen.getByRole("heading", { name: "YB UI" })).toBeInTheDocument()
  expect(screen.getByRole("link", { name: "快速开始" })).toHaveAttribute("href", "/docs/getting-started")
  expect(screen.getByRole("link", { name: "浏览组件" })).toHaveAttribute("href", "/docs/components/button")
})
```

- [ ] **Step 2: Run the test to verify the expected failure**

Run: `pnpm --filter @yb/docs test -- home-page.test.tsx`

Expected: FAIL because `./home-page` does not exist.

- [ ] **Step 3: Implement the minimal homepage and styles**

Implement `HomePage` with a hero headed `YB UI`, copy describing Cobalt Pulse, a primary `快速开始` link and secondary `浏览组件` link. Add three feature cards for “设计令牌”“可访问组件”“组合示例”. Define only documentation-site layout classes in `globals.css`; use YB semantic CSS variables for surfaces, borders, typography and focus states.

- [ ] **Step 4: Run the focused test and application type check**

Run: `pnpm --filter @yb/docs test -- home-page.test.tsx; pnpm --filter @yb/docs typecheck`

Expected: PASS; TypeScript finds only public `@yb` imports.

- [ ] **Step 5: Commit the homepage**

```bash
git add apps/docs
git commit -m "feat: add YB UI documentation homepage"
```

### Task 3: 实现 MDX 组件、源码展示与 API 表格

**Files:**
- Create: `apps/docs/components/docs/api-table.tsx`
- Create: `apps/docs/components/docs/api-table.test.tsx`
- Create: `apps/docs/components/docs/component-preview.tsx`
- Create: `apps/docs/components/docs/source-code.tsx`
- Modify: `apps/docs/components/mdx.tsx`

**Interfaces:**
- Consumes: `ReactNode` and Fumadocs default MDX components.
- Produces: `ApiProp`, `ApiTable({ rows })`, `ComponentPreview({ title, children })`, and `SourceCode({ code })` available inside MDX.

- [ ] **Step 1: Write the failing API table test**

Create `api-table.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react"
import { ApiTable } from "./api-table"

test("renders prop name type default value and description", () => {
  render(<ApiTable rows={[{ name: "loading", type: "boolean", defaultValue: "false", description: "显示加载状态" }]} />)
  expect(screen.getByRole("cell", { name: "loading" })).toBeInTheDocument()
  expect(screen.getByText("boolean")).toBeInTheDocument()
  expect(screen.getByText("显示加载状态")).toBeInTheDocument()
})
```

- [ ] **Step 2: Run the test to verify the expected failure**

Run: `pnpm --filter @yb/docs test -- api-table.test.tsx`

Expected: FAIL because `ApiTable` is not exported.

- [ ] **Step 3: Implement reusable documentation primitives**

Define and export:

```ts
export type ApiProp = {
  name: string
  type: string
  defaultValue: string
  description: string
}
```

Render an accessible HTML table with headers “属性”“类型”“默认值”“说明”. Render examples inside semantic `<section>` elements; render source as `<pre><code className="language-tsx">`. Register all three primitives in `getMDXComponents()` alongside `fumadocs-ui/mdx` defaults.

- [ ] **Step 4: Run the focused test**

Run: `pnpm --filter @yb/docs test -- api-table.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit the MDX primitives**

```bash
git add apps/docs/components
git commit -m "feat: add documentation example and API primitives"
```

### Task 4: 添加快速开始与四个设计规范页面

**Files:**
- Create: `apps/docs/content/docs/meta.json`
- Create: `apps/docs/content/docs/getting-started.mdx`
- Create: `apps/docs/content/docs/foundations/meta.json`
- Create: `apps/docs/content/docs/foundations/color.mdx`
- Create: `apps/docs/content/docs/foundations/typography.mdx`
- Create: `apps/docs/content/docs/foundations/spacing-and-layout.mdx`
- Create: `apps/docs/content/docs/foundations/themes.mdx`

**Interfaces:**
- Consumes: registered MDX primitives and YB semantic CSS variables.
- Produces: sidebar entries under “开始使用” and “设计规范”, navigable `/docs/*` pages with explicit frontmatter titles and descriptions.

- [ ] **Step 1: Write the failing navigation content test**

Create `apps/docs/content/docs/content.test.ts`:

```ts
import { source } from "../../lib/source"

test("exposes the required foundation pages", () => {
  expect(source.getPage(["foundations", "color"])?.data.title).toBe("色彩")
  expect(source.getPage(["foundations", "themes"])?.data.title).toBe("主题规划")
})
```

- [ ] **Step 2: Run the test to verify the expected failure**

Run: `pnpm --filter @yb/docs test -- content.test.ts`

Expected: FAIL because the foundation MDX files are absent.

- [ ] **Step 3: Add the MDX content and navigation metadata**

Write `getting-started.mdx` with package installation and provider/style imports. Write color, typography and spacing pages with only delivered Cobalt Pulse semantic tokens and existing `Stack`/`Grid` usage. Write the theme page saying light mode is delivered and `.dark` token structure is reserved; do not show a theme switch control. Use `meta.json` ordering: getting started, foundations, components.

- [ ] **Step 4: Run the content test and static build**

Run: `pnpm --filter @yb/docs test -- content.test.ts; pnpm --filter @yb/docs build`

Expected: PASS; generated routes include the five new pages.

- [ ] **Step 5: Commit the foundations content**

```bash
git add apps/docs/content
git commit -m "docs: add YB UI getting started and foundations pages"
```

### Task 5: 交付 Button 文档、真实示例与 API

**Files:**
- Create: `apps/docs/components/examples/button/basic.tsx`
- Create: `apps/docs/components/examples/button/variants.tsx`
- Create: `apps/docs/components/examples/button/loading.tsx`
- Create: `apps/docs/components/examples/button/button-examples.test.tsx`
- Create: `apps/docs/content/docs/components/meta.json`
- Create: `apps/docs/content/docs/components/button.mdx`

**Interfaces:**
- Consumes: `Button`, `IconButton`, `Field` from `@yb/ui`; `AddIcon` from `@yb/icons`; `ApiTable`, `ComponentPreview`, `SourceCode` from Task 3.
- Produces: `/docs/components/button` with four live examples and an API table covering `variant`, `size`, `loading`, and `asChild`.

- [ ] **Step 1: Write the failing real-component example test**

Create `button-examples.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react"
import { ButtonLoadingExample } from "./loading"

test("renders a disabled loading YB Button", () => {
  render(<ButtonLoadingExample />)
  expect(screen.getByRole("button", { name: "保存" })).toBeDisabled()
  expect(screen.getByRole("status", { name: "正在加载" })).toBeInTheDocument()
})
```

- [ ] **Step 2: Run the test to verify the expected failure**

Run: `pnpm --filter @yb/docs test -- button-examples.test.tsx`

Expected: FAIL because the example module is absent.

- [ ] **Step 3: Implement examples and the Button MDX page**

Implement `ButtonBasicExample`, `ButtonVariantsExample`, and `ButtonLoadingExample`; use actual public `Button` props and `loading` on the final example. In `button.mdx`, include purpose, four previews, source snippets taken from each example, `ApiTable` rows, keyboard/loading accessibility notes, and links to Input and Dialog.

- [ ] **Step 4: Run focused tests and build**

Run: `pnpm --filter @yb/docs test -- button-examples.test.tsx; pnpm --filter @yb/docs build`

Expected: PASS; Button route compiles against public package exports.

- [ ] **Step 5: Commit the Button documentation**

```bash
git add apps/docs/components/examples/button apps/docs/content/docs/components
git commit -m "docs: add Button component guide"
```

### Task 6: 交付 Input 文档、真实示例与 API

**Files:**
- Create: `apps/docs/components/examples/input/basic.tsx`
- Create: `apps/docs/components/examples/input/field-states.tsx`
- Create: `apps/docs/components/examples/input/input-examples.test.tsx`
- Create: `apps/docs/content/docs/components/input.mdx`

**Interfaces:**
- Consumes: `Input` and `Field` from `@yb/ui`; Task 3 MDX primitives.
- Produces: `/docs/components/input` with basic, labelled/help/error and disabled examples, plus `InputProps` oriented API guidance.

- [ ] **Step 1: Write the failing field state test**

Create `input-examples.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react"
import { InputFieldStatesExample } from "./field-states"

test("associates an invalid input with its error message", () => {
  render(<InputFieldStatesExample />)
  expect(screen.getByLabelText("工作邮箱")).toHaveAttribute("aria-invalid", "true")
  expect(screen.getByText("请输入有效的邮箱地址")).toBeInTheDocument()
})
```

- [ ] **Step 2: Run the test to verify the expected failure**

Run: `pnpm --filter @yb/docs test -- input-examples.test.tsx`

Expected: FAIL because the input example module is absent.

- [ ] **Step 3: Implement Input examples and MDX**

Use `Input` in basic and disabled examples. Use the shipped `Field` public interface to render label, description and error state in `InputFieldStatesExample`. The MDX page lists native input props as pass-through props, documents `disabled`, `aria-invalid` and `type`, and explains external form-library compatibility.

- [ ] **Step 4: Run focused tests and build**

Run: `pnpm --filter @yb/docs test -- input-examples.test.tsx; pnpm --filter @yb/docs build`

Expected: PASS; rendered DOM exposes associated label and validation semantics.

- [ ] **Step 5: Commit the Input documentation**

```bash
git add apps/docs/components/examples/input apps/docs/content/docs/components/input.mdx
git commit -m "docs: add Input component guide"
```

### Task 7: 交付 Dialog 文档、真实示例与 API

**Files:**
- Create: `apps/docs/components/examples/dialog/basic.tsx`
- Create: `apps/docs/components/examples/dialog/delete-confirmation.tsx`
- Create: `apps/docs/components/examples/dialog/form.tsx`
- Create: `apps/docs/components/examples/dialog/dialog-examples.test.tsx`
- Create: `apps/docs/content/docs/components/dialog.mdx`

**Interfaces:**
- Consumes: `Dialog`, `DialogTrigger`, `DialogContent`, `DialogTitle`, `DialogDescription`, `DialogClose`, `Button`, `Field`, `Input` from `@yb/ui`.
- Produces: `/docs/components/dialog` with basic, destructive confirmation and form examples; API notes for composed Radix Dialog primitives.

- [ ] **Step 1: Write the failing dialog interaction test**

Create `dialog-examples.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { DeleteConfirmationExample } from "./delete-confirmation"

test("opens destructive confirmation content from its trigger", async () => {
  const user = userEvent.setup()
  render(<DeleteConfirmationExample />)
  await user.click(screen.getByRole("button", { name: "删除项目" }))
  expect(screen.getByRole("dialog")).toHaveTextContent("此操作无法撤销")
})
```

- [ ] **Step 2: Run the test to verify the expected failure**

Run: `pnpm --filter @yb/docs test -- dialog-examples.test.tsx`

Expected: FAIL because the dialog example module is absent.

- [ ] **Step 3: Implement Dialog examples and MDX**

Use the public composition API for all examples. The destructive example must provide an accessible title and description, a cancel close control, and an explicitly destructive confirmation button. The form example uses `Field` and `Input` inside `DialogContent`. The MDX API area documents each exposed primitive and focuses on title/description, focus management and close behavior.

- [ ] **Step 4: Run focused tests and build**

Run: `pnpm --filter @yb/docs test -- dialog-examples.test.tsx; pnpm --filter @yb/docs build`

Expected: PASS; the test opens a real Radix-backed dialog and the static docs route compiles.

- [ ] **Step 5: Commit the Dialog documentation**

```bash
git add apps/docs/components/examples/dialog apps/docs/content/docs/components/dialog.mdx
git commit -m "docs: add Dialog component guide"
```

### Task 8: 接入根脚本、CI 与项目说明，并完成交付验证

**Files:**
- Modify: `.github/workflows/verify.yml`
- Modify: `README.md`
- Modify: `package.json`
- Test: `apps/docs/components/home/home-page.test.tsx`
- Test: `apps/docs/components/docs/api-table.test.tsx`
- Test: `apps/docs/components/examples/button/button-examples.test.tsx`
- Test: `apps/docs/components/examples/input/input-examples.test.tsx`
- Test: `apps/docs/components/examples/dialog/dialog-examples.test.tsx`

**Interfaces:**
- Consumes: all previous tasks and root `verify` script.
- Produces: CI coverage for docs build and a README that identifies the separate documentation website and its commands.

- [ ] **Step 1: Add documentation build to CI**

After the existing `pnpm verify` step, add:

```yaml
- run: pnpm --filter @yb/docs test
- run: pnpm build-docs
```

Keep the existing Storybook build; it remains a separate quality boundary.

- [ ] **Step 2: Update README operating instructions**

Add `@yb/docs` to the workspace table. Document `pnpm docs`, `pnpm build-docs`, and the difference between Docs (“使用说明、示例、API”) and Storybook (“状态、Controls、a11y”). State that docs deployment is intentionally out of scope for this release.

- [ ] **Step 3: Run complete verification**

Run: `$env:CI='true'; pnpm verify; pnpm --filter @yb/docs test; pnpm build-docs; pnpm build-storybook`

Expected: all commands exit 0. Inspect `git diff --check` and `git status --short` to ensure only intended source, content, config and lockfile changes are present.

- [ ] **Step 4: Commit delivery integration**

```bash
git add .github/workflows/verify.yml README.md package.json pnpm-lock.yaml apps/docs
git commit -m "chore: verify YB UI documentation site"
```
