import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { Input } from "./Input"

describe("Input", () => {
  it("preserves native text entry and forwards a ref", async () => {
    const user = userEvent.setup()
    render(<Input aria-label="项目名称" />)

    await user.type(screen.getByLabelText("项目名称"), "YB UI")

    expect(screen.getByLabelText("项目名称")).toHaveValue("YB UI")
  })
})
