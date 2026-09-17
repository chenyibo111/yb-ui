import { render, screen } from "@testing-library/react"
import { expect, test } from "vitest"

import { ColorTokenGrid } from "./color-token-grid"

test("renders semantic color tokens as CSS-variable swatches", () => {
  render(<ColorTokenGrid />)

  expect(screen.getByLabelText("主要操作：--yb-primary")).toHaveStyle({
    backgroundColor: "var(--yb-primary)",
  })
  expect(screen.getByLabelText("危险操作：--yb-destructive")).toHaveStyle({
    backgroundColor: "var(--yb-destructive)",
  })
  expect(screen.getByText("--yb-warning")).toBeInTheDocument()
})
