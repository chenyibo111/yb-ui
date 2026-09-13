# YB UI v0.1.0 Design

## Goal

Build a reusable React design-system foundation for future internal projects. The first release is `@yb/ui` v0.1.0: a light-theme, Chinese-and-English-capable package of general UI components. It is not a business-component library or an application framework.

## Decisions

- React is the only target framework.
- Components are authored with Tailwind CSS and CSS variables. Consumers import compiled CSS instead of configuring Tailwind to scan the component package.
- Visual direction is **Cobalt Pulse**: an indigo/cobalt primary, cool neutral surfaces, medium-to-large radii, and restrained shadows.
- The initial release ships light theme only. Components may only use semantic tokens; the token structure and provider API reserve a future `.dark` theme without changing component APIs.
- Chinese-English mixed typesetting is a first-class requirement. Tokens expose a sans-serif font stack with Chinese fallbacks; the package does not force font-file downloads.
- Baseline accessibility is required: keyboard access, visible focus, correct label/error relationships, meaningful ARIA usage, and AA contrast for primary tokens.
- `YBProvider` supplies `zh-CN` and `en-US` locale support for built-in strings.
- Lucide React is the source icon set. `@yb/icons` is the stable import boundary for exported icons.
- Form primitives are form-library neutral. A React Hook Form adapter, if needed, is a later package rather than an `@yb/ui` dependency.

## Repository and Packages

```text
yb-ui/
├─ apps/
│  ├─ storybook/       # Component docs, interactive examples, visual baseline
│  └─ playground/      # Consumer-style integration validation
├─ packages/
│  ├─ tokens/          # @yb/tokens: semantic CSS tokens and types
│  ├─ icons/           # @yb/icons: selected Lucide exports
│  └─ ui/              # @yb/ui: React components, styles, provider, locales
├─ registry/           # Reserved for future source-distributed blocks/templates
└─ docs/
   └─ superpowers/specs/
```

`@yb/tokens` exports `styles.css`. `@yb/ui` exports components, `YBProvider`, locales, and `styles.css`. Future consumer projects use the package model:

```tsx
import "@yb/tokens/styles.css"
import "@yb/ui/styles.css"
import { Button, YBProvider } from "@yb/ui"

export function App() {
  return <YBProvider locale="zh-CN"><Button>保存</Button></YBProvider>
}
```

The first release does not publish to a private npm registry yet; Storybook and the playground consume workspace packages. A private registry is added only when a real project needs it. A shadcn-compatible source Registry may later distribute blocks and templates that need project-level modification; it is not used for stable primitives in v0.1.0.

## Component Scope

### Foundation and layout

`Text`, `Heading`, `Stack`, `Grid`, `Separator`.

### Actions and form controls

`Button`, `IconButton`, `Input`, `Textarea`, `Field`, `Checkbox`, `RadioGroup`, `Switch`, `Select`.

### Overlays and feedback

`Dialog`, `Drawer`, `Popover`, `DropdownMenu`, `Tooltip`, `Toast`, `Alert`, `Skeleton`, `Spinner`.

### Navigation and display

`Tabs`, `Breadcrumb`, `Card`, `Badge`, `Avatar`, `Empty`.

### Data and date

`Table`, `Pagination`, `Calendar`, `DatePicker`.

`Table` remains presentational: it supplies semantic structure, visual states, horizontal scrolling, fixed-header support, and empty/loading states, but no fetching, filtering, sorting, virtualization, column configuration, or bulk business actions. `DatePicker` supports single-date and date-range selection in the two initial locales. It excludes date-time selection, time-zone behavior, and business validation.

## API Rules

- Use semantic variants such as `default`, `secondary`, `outline`, `ghost`, and `destructive`; avoid arbitrary color variants.
- Provide a consistent `size`, `disabled`, `loading` when applicable, `className`, and relevant `data-*` attributes.
- Stateful input and selection components support controlled and uncontrolled React patterns.
- `Field` owns label, description, required marker, error presentation, and accessible associations; it never owns form state.
- No package component performs network requests, authorization checks, business validation, or data fetching.

## Documentation, Testing, and Release Quality

Storybook is the source of component documentation, live examples, and visual baselines. Every released component needs a typed public API, stories for its key variants and states, interaction tests, baseline accessibility checks, and a visual regression baseline.

The pull-request pipeline runs linting, type-checking, package builds, unit/interaction tests, accessibility checks, and a Storybook build with visual regression coverage. Releases use semantic versioning and changelog entries: fixes are patches, compatible additions are minors, and breaking API changes are majors.

## Delivery Milestones

1. Establish the workspace, package boundaries, Storybook, playground, build, and test pipeline.
2. Implement semantic light tokens, typography, locale provider, and icon boundary.
3. Implement the frequent foundation and form primitives.
4. Implement overlays, feedback, navigation, and display primitives.
5. Implement table, pagination, calendar, and date picker.
6. Complete stories, testing, accessibility, visual validation, and v0.1.0 release preparation.

## Explicit Non-goals for v0.1.0

- Fully designed dark mode.
- React Hook Form adapter package.
- Business components, page templates, or application shells.
- A running private source Registry service.
- Private npm publishing and migration of an existing application.
- Date-time/time-zone support and advanced data-grid capabilities.
