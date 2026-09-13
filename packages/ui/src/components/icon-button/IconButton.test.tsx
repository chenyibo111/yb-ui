import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { IconButton } from "./IconButton"

describe("IconButton", () => {
  it("requires an accessible name for icon-only actions", () => {
    render(<IconButton aria-label="关闭">×</IconButton>)

    expect(screen.getByRole("button", { name: "关闭" })).toHaveAttribute("data-slot", "icon-button")
  })
})
