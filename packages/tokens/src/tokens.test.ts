import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { describe, expect, it } from "vitest"

import { ybTokenNames } from "./tokens"

const stylesPath = fileURLToPath(new URL("./styles.css", import.meta.url))
const styles = readFileSync(stylesPath, "utf8")

function readCustomProperties(selector: string) {
  const block = styles.match(new RegExp(`${selector}\\s*\\{([\\s\\S]*?)\\}`))?.[1] ?? ""
  return [...block.matchAll(/(--yb-[\w-]+)\s*:/g)].map(([, property]) => property)
}

describe("Cobalt Pulse token contract", () => {
  it("exports the semantic tokens consumed by components", () => {
    expect(ybTokenNames).toEqual(
      expect.arrayContaining([
        "background",
        "foreground",
        "primary",
        "primary-foreground",
        "muted",
        "border",
        "ring",
        "font-sans",
      ]),
    )
  })

  it("declares every exported semantic token in the light theme", () => {
    const rootProperties = readCustomProperties(":root")

    expect(rootProperties).toEqual(
      expect.arrayContaining(ybTokenNames.map((name) => `--yb-${name}`)),
    )
  })

  it("keeps a structurally complete dark-theme token surface", () => {
    expect(readCustomProperties("\\.dark")).toEqual(readCustomProperties(":root"))
  })
})
