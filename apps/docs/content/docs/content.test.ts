import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { expect, test } from "vitest"

function readPage(path: string) {
  return readFileSync(resolve("content/docs", path), "utf8")
}

test("exposes the required foundation pages", () => {
  expect(readPage("foundations/color.mdx")).toContain("title: 色彩")
  expect(readPage("foundations/themes.mdx")).toContain("title: 主题规划")
})
