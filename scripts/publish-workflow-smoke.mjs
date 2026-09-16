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
