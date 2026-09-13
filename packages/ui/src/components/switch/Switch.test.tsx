import { useState } from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { Switch } from "./Switch"

function ControlledSwitch() {
  const [checked, setChecked] = useState(false)
  return <Switch aria-label="启用通知" checked={checked} onCheckedChange={setChecked} />
}

describe("Switch", () => {
  it("supports controlled checked state", async () => {
    const user = userEvent.setup()
    render(<ControlledSwitch />)

    await user.click(screen.getByRole("switch", { name: "启用通知" }))

    expect(screen.getByRole("switch", { name: "启用通知" })).toBeChecked()
  })
})
