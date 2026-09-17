import { render, screen } from "@testing-library/react"
import { expect, test } from "vitest"
import { ybTokenNames } from "@chenyibo111/tokens"

import { tokenCatalog } from "../../lib/token-catalog"
import { TokenReference } from "./token-reference"

test("classifies every public token exactly once", () => {
  expect(new Set(tokenCatalog.map((item) => item.name))).toEqual(new Set(ybTokenNames))
  expect(tokenCatalog).toHaveLength(ybTokenNames.length)
})

test("uses the space token as a visible measurement", () => {
  render(<TokenReference />)
  expect(screen.getByLabelText("间距 4：--yb-space-4")).toHaveStyle({ width: "var(--yb-space-4)" })
})
