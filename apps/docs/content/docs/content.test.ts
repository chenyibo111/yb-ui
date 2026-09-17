import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import { expect, test } from "vitest"

import { componentCatalog } from "../../lib/component-catalog"

function readPage(path: string) {
  return readFileSync(resolve("content/docs", path), "utf8")
}

test("exposes the required foundation pages", () => {
  expect(readPage("foundations/color.mdx")).toContain("title: 色彩")
  expect(readPage("foundations/themes.mdx")).toContain("title: 主题规划")
})

test("exposes the component catalog, token reference, and every recipe", () => {
  expect(readPage("components/index.mdx")).toContain("title: 组件总览")
  expect(readPage("foundations/token-reference.mdx")).toContain("title: Token Reference")

  for (const recipe of [
    "async-submit",
    "field-errors",
    "confirm-destructive-action",
    "chat-composer",
    "consumer-css-boundaries",
  ]) {
    expect(existsSync(resolve("content/docs/recipes", `${recipe}.mdx`))).toBe(true)
  }
})

test("provides an MDX page for every documented catalog component", () => {
  const documentedEntries = componentCatalog.filter((entry) => entry.status === "documented")

  expect(documentedEntries).not.toHaveLength(0)

  for (const entry of documentedEntries) {
    const page = entry.href.replace("/docs/", "")
    expect(existsSync(resolve("content/docs", `${page}.mdx`))).toBe(true)
  }
})
