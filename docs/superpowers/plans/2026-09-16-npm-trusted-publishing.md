# npm Trusted Publishing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a manually triggered GitHub Actions workflow that publishes only new YB UI package versions through npm Trusted Publishing without storing an npm token.

**Architecture:** A dedicated `publish.yml` workflow runs only when a maintainer manually dispatches it. Its publish job rejects non-`main` refs, installs the locked pnpm workspace, runs the full quality gate, and recursively publishes only `packages/*`. A small Node contract test asserts the security-sensitive YAML markers and is run in the existing Verify workflow.

**Tech Stack:** GitHub Actions, pnpm 11.19.0, Node.js 24, npm CLI 11.15.0, npm OIDC Trusted Publishing, Node.js `assert`.

**Spec:** `docs/superpowers/specs/2026-09-16-npm-trusted-publishing-design.md`

## Global Constraints

- The workflow filename is exactly `.github/workflows/publish.yml`; npm package settings must bind the filename `publish.yml`.
- Only `workflow_dispatch` may trigger publishing; do not add push, tag, pull request, schedule, or reusable-workflow triggers.
- The job must reject any `GITHUB_REF` other than `refs/heads/main`.
- Job permissions are exactly `contents: read` and `id-token: write`; no npm token environment variable, `.npmrc` authentication, or GitHub secret is allowed.
- Use GitHub-hosted Ubuntu, Node 24, pnpm 11.19.0, and npm CLI 11.15.0.
- Install with `pnpm install --frozen-lockfile`, then run `pnpm verify` before publishing.
- Publish only `packages/*` with `pnpm --filter "./packages/*" -r publish --access public --no-git-checks --report-summary`.
- Existing npm versions must not be replaced; pnpm’s default no-force behavior determines the set of new versions.
- Do not add automatic versioning, tags, release PRs, GitHub Environments, or npm Tokens.

---

### Task 1: Add the release-workflow contract test

**Files:**
- Create: `scripts/publish-workflow-smoke.mjs`
- Test: `scripts/publish-workflow-smoke.mjs`

**Interfaces:**
- Consumes: `.github/workflows/publish.yml` as UTF-8 text.
- Produces: exit code `0` only when the workflow satisfies the repository’s manual OIDC release contract.

- [ ] **Step 1: Write the failing contract test**

Create `scripts/publish-workflow-smoke.mjs` with the following initial assertion, before adding the workflow file:

```js
import assert from "node:assert/strict"
import { existsSync } from "node:fs"
import { resolve } from "node:path"

const root = resolve(import.meta.dirname, "..")
const workflowPath = resolve(root, ".github", "workflows", "publish.yml")

assert.ok(existsSync(workflowPath), "publish workflow must exist")
```

- [ ] **Step 2: Run the contract test and verify the expected failure**

Run:

```powershell
node scripts/publish-workflow-smoke.mjs
```

Expected: a non-zero exit with `AssertionError: publish workflow must exist`.

- [ ] **Step 3: Expand the test into the final static contract**

Replace the test content with this complete implementation:

```js
import assert from "node:assert/strict"
import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"

const root = resolve(import.meta.dirname, "..")
const workflowPath = resolve(root, ".github", "workflows", "publish.yml")

assert.ok(existsSync(workflowPath), "publish workflow must exist")

const workflow = readFileSync(workflowPath, "utf8")

assert.match(workflow, /^\s*workflow_dispatch:\s*$/m, "workflow must be manually triggered")
assert.doesNotMatch(workflow, /^\s*(push|pull_request|schedule|workflow_call):/m, "workflow must not auto-trigger")
assert.match(workflow, /GITHUB_REF.*refs\/heads\/main/, "workflow must reject non-main refs")
assert.match(workflow, /contents:\s*read/, "workflow must grant contents read")
assert.match(workflow, /id-token:\s*write/, "workflow must grant an OIDC token")
assert.match(workflow, /pnpm install --frozen-lockfile/, "workflow must install from the lockfile")
assert.match(workflow, /pnpm verify/, "workflow must verify before publish")
assert.match(
  workflow,
  /pnpm --filter "\.\/packages\/\*" -r publish --access public --no-git-checks --report-summary/,
  "workflow must only publish package workspaces",
)
assert.doesNotMatch(workflow, /NPM_TOKEN|NODE_AUTH_TOKEN|_authToken/, "workflow must not use an npm token")

console.log("Publish workflow contract is valid.")
```

- [ ] **Step 4: Commit the red test state only if it is being reviewed separately**

For normal implementation, keep the test and workflow in the same task so the default branch is never left with a deliberately failing CI check. Do not commit the failing state to `main`.

### Task 2: Implement the manual OIDC publishing workflow

**Files:**
- Create: `.github/workflows/publish.yml`
- Modify: `scripts/publish-workflow-smoke.mjs`
- Test: `scripts/publish-workflow-smoke.mjs`

**Interfaces:**
- Consumes: the checked-out `main` ref, `pnpm-lock.yaml`, the public package manifests under `packages/*`, npm OIDC credentials supplied by GitHub, and Trusted Publisher records configured on npm.
- Produces: npm publish requests only for new versions of `@chenyibo111/tokens`, `@chenyibo111/icons`, and `@chenyibo111/ui`; `pnpm-publish-summary.json` in the runner workspace.

- [ ] **Step 1: Create the workflow with the exact manual trigger and least permissions**

Create `.github/workflows/publish.yml`:

```yaml
name: Publish packages

on:
  workflow_dispatch:

permissions: {}

concurrency:
  group: npm-publish
  cancel-in-progress: false

jobs:
  publish:
    runs-on: ubuntu-latest
    timeout-minutes: 30
    permissions:
      contents: read
      id-token: write
    steps:
      - name: Enforce main branch
        run: |
          if [ "$GITHUB_REF" != "refs/heads/main" ]; then
            echo "Publishing is allowed only from main; received $GITHUB_REF."
            exit 1
          fi
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 11.19.0
          run_install: false
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          registry-url: https://registry.npmjs.org
      - name: Ensure npm CLI supports trusted publishing
        run: npm install --global npm@11.15.0
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      - name: Verify workspace
        run: pnpm verify
      - name: Publish new public package versions
        run: pnpm --filter "./packages/*" -r publish --access public --no-git-checks --report-summary
```

The `permissions: {}` default prevents unrelated permissions. The job-level grant is the only place where OIDC is available. The main-ref shell guard intentionally runs before checkout so a manually selected tag or branch fails before dependency installation.

- [ ] **Step 2: Run the contract test and verify it passes**

Run:

```powershell
node scripts/publish-workflow-smoke.mjs
```

Expected: `Publish workflow contract is valid.` and exit code `0`.

- [ ] **Step 3: Inspect the workflow’s no-token surface**

Run:

```powershell
rg -n "NPM_TOKEN|NODE_AUTH_TOKEN|_authToken|workflow_dispatch|id-token|packages/\\*" .github/workflows/publish.yml
```

Expected: the output contains `workflow_dispatch`, `id-token: write`, and the `packages/*` publish selector; it contains no npm token matches.

- [ ] **Step 4: Commit the workflow and contract test**

```powershell
git add .github/workflows/publish.yml scripts/publish-workflow-smoke.mjs
git commit -m "ci: add manual npm trusted publishing"
```

### Task 3: Run the contract test in pull-request and main verification

**Files:**
- Modify: `.github/workflows/verify.yml`
- Test: `scripts/publish-workflow-smoke.mjs`

**Interfaces:**
- Consumes: the contract script from Task 1 and `publish.yml` from Task 2.
- Produces: a failed Verify run when a future edit weakens the manual/OIDC publishing contract.

- [ ] **Step 1: Add the contract check after dependency installation**

In `.github/workflows/verify.yml`, add this step immediately after `pnpm install --frozen-lockfile`:

```yaml
      - run: node scripts/publish-workflow-smoke.mjs
```

- [ ] **Step 2: Run the same check locally**

Run:

```powershell
node scripts/publish-workflow-smoke.mjs
```

Expected: `Publish workflow contract is valid.` and exit code `0`.

- [ ] **Step 3: Run the full release-safe quality gate**

Run:

```powershell
pnpm verify
```

Expected: linting, builds, type checks, and all workspace tests pass. This command must not contact npm to publish a version.

- [ ] **Step 4: Commit the CI guard**

```powershell
git add .github/workflows/verify.yml
git commit -m "ci: verify trusted publishing workflow contract"
```

### Task 4: Document maintainer activation and release procedure

**Files:**
- Modify: `README.md`
- Test: `README.md`, `.github/workflows/publish.yml`, and `scripts/publish-workflow-smoke.mjs`

**Interfaces:**
- Consumes: workflow filename `publish.yml`, exact package names, and the manual Changesets versioning flow.
- Produces: instructions allowing a maintainer to bind all packages on npm and safely publish a later version without a token.

- [ ] **Step 1: Add a “后续 npm 发布” section to README**

Add the following Chinese content after “质量门槛”:

```markdown
## 后续 npm 发布

首次版本已发布。后续版本使用 Changesets 与 GitHub Actions Trusted Publishing，不在仓库或 GitHub Secrets 保存 npm Token。

1. 修改公开包时运行 `pnpm changeset`，选择受影响的 `@chenyibo111/*` 包和语义化版本级别，并提交生成的 Changeset。
2. 准备发布时运行 `pnpm version-packages`，提交由此生成的包版本、变更日志和锁文件到 `main`。
3. 确认 npm 中的三个包都在 Settings → Trusted Publisher 中绑定 GitHub Actions：user or organization 为 `chenyibo111`，repository 为 `yb-ui`，workflow filename 为 `publish.yml`，并允许 `npm publish`。
4. 在 GitHub Actions 手动运行 “Publish packages”，并选择 `main`。工作流会重新执行 `pnpm verify`，再发布 npm 中尚不存在的版本。

`publish.yml` 不会因普通 push 或 tag 自动发布。工作流使用 GitHub OIDC 短期凭据；不要添加 `NPM_TOKEN`、`NODE_AUTH_TOKEN` 或 `.npmrc` 认证信息。
```

- [ ] **Step 2: Verify the documented commands and contract agree**

Run:

```powershell
node scripts/publish-workflow-smoke.mjs
rg -n "pnpm changeset|pnpm version-packages|publish.yml|NPM_TOKEN|NODE_AUTH_TOKEN" README.md
```

Expected: the contract is valid; README contains the two versioning commands, `publish.yml`, and the explicit no-token rule.

- [ ] **Step 3: Commit the maintainer documentation**

```powershell
git add README.md
git commit -m "docs: explain trusted npm releases"
```

### Task 5: Push workflow configuration and perform human-controlled activation

**Files:**
- Modify: npm package Settings for `@chenyibo111/tokens`, `@chenyibo111/icons`, and `@chenyibo111/ui` (external npm configuration; no repository file).
- Test: GitHub Actions workflow dispatch and npm package Settings UI.

**Interfaces:**
- Consumes: the pushed `.github/workflows/publish.yml` and the maintainer’s 2FA-enabled npm account.
- Produces: one trusted GitHub Actions publisher binding per public package, limited to direct npm publish.

- [ ] **Step 1: Push the verified repository commits to `origin/main`**

Run:

```powershell
git push origin main
```

Expected: GitHub displays `publish.yml` at `.github/workflows/publish.yml`.

- [ ] **Step 2: Bind each existing npm package to the exact workflow**

For each package, open npmjs.com → package → Settings → Trusted Publisher → GitHub Actions and enter:

```text
GitHub user or organization: chenyibo111
Repository: yb-ui
Workflow filename: publish.yml
Environment: leave blank
Allowed action: npm publish
```

Save each package setting. Configure only the three public package names; do not configure docs, playground, Storybook, or the root project.

- [ ] **Step 3: Validate the workflow without releasing a new package**

In GitHub Actions, run “Publish packages” from `main` while all three local versions remain `0.1.0`.

Expected: checkout, install, `pnpm verify`, and OIDC setup succeed; pnpm detects the already published `0.1.0` versions and sends no replacement publish. Review the workflow log and `pnpm-publish-summary.json` if produced.

- [ ] **Step 4: Leave npm immutable-state failures untouched**

If npm reports a package version already exists, never rerun with `--force` and never unpublish to reuse the version. Increment through a Changeset and repeat the manual workflow with the new version.
