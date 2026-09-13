import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Grid } from "./Grid"

describe("Grid", () => {
  it("creates a grid layout root", () => {
    const { getByTestId } = render(<Grid columns={3} data-testid="grid" />)

    expect(getByTestId("grid")).toHaveAttribute("data-slot", "grid")
  })
})
