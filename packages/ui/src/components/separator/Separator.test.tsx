import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Separator } from "./Separator"

describe("Separator", () => {
  it("renders an accessible horizontal separator", () => {
    render(<Separator />)

    expect(screen.getByRole("separator")).toHaveAttribute("data-slot", "separator")
  })
})
