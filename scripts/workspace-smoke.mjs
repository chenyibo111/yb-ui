import assert from "node:assert/strict"
import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"

const root = resolve(import.meta.dirname, "..")
const workspacePath = resolve(root, "pnpm-workspace.yaml")

assert.ok(existsSync(workspacePath), "pnpm workspace configuration must exist")

const workspace = readFileSync(workspacePath, "utf8")
const workspacePatterns = [...workspace.matchAll(/^\s*-\s*['"]?([^'"\s]+)['"]?\s*$/gm)].map(
  ([, pattern]) => pattern,
)

assert.deepEqual(
  workspacePatterns,
  ["packages/*", "apps/*"],
  "workspace must include package and application directories",
)

const expectedPackages = [
  ["packages/tokens", "@chenyibo111/tokens"],
  ["packages/icons", "@chenyibo111/icons"],
  ["packages/ui", "@chenyibo111/ui"],
  ["apps/playground", "@chenyibo111/playground"],
  ["apps/storybook", "@chenyibo111/storybook"],
]

for (const [directory, expectedName] of expectedPackages) {
  const manifestPath = resolve(root, directory, "package.json")
  assert.ok(existsSync(manifestPath), `${directory} must have a package manifest`)

  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"))
  assert.equal(manifest.name, expectedName, `${directory} must use ${expectedName}`)
}

console.log("Workspace package contract is valid.")
