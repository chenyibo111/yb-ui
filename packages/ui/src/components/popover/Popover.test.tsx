import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { Popover, PopoverContent, PopoverTrigger } from "./Popover"

describe("Popover", () => {
  it("opens from its keyboard-focusable trigger", async () => {
    const user = userEvent.setup()
    render(<Popover><PopoverTrigger>更多信息</PopoverTrigger><PopoverContent>详细内容</PopoverContent></Popover>)
    await user.click(screen.getByRole("button", { name: "更多信息" }))
    expect(screen.getByText("详细内容")).toBeVisible()
  })
})
