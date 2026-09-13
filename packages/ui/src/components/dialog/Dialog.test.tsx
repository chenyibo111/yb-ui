import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./Dialog"

describe("Dialog", () => {
  it("moves focus into content and restores it after Escape", async () => {
    const user = userEvent.setup()
    render(<Dialog><DialogTrigger>打开设置</DialogTrigger><DialogContent><DialogTitle>设置</DialogTitle><button>保存</button></DialogContent></Dialog>)
    const trigger = screen.getByRole("button", { name: "打开设置" })
    await user.click(trigger)
    expect(screen.getByRole("dialog")).toHaveAccessibleName("设置")
    await user.keyboard("{Escape}")
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })
})
