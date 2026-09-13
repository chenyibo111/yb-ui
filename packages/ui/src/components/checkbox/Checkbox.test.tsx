import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { Checkbox } from "./Checkbox"

describe("Checkbox", () => {
  it("toggles from the keyboard", async () => {
    const user = userEvent.setup()
    render(<Checkbox aria-label="同意协议" />)

    await user.tab()
    await user.keyboard(" ")

    expect(screen.getByRole("checkbox", { name: "同意协议" })).toBeChecked()
  })
})
