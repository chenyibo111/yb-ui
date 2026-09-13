import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./DropdownMenu"

describe("DropdownMenu", () => {
  it("opens from the keyboard", async () => {
    const user = userEvent.setup()
    render(<DropdownMenu><DropdownMenuTrigger>更多操作</DropdownMenuTrigger><DropdownMenuContent><DropdownMenuItem>编辑</DropdownMenuItem></DropdownMenuContent></DropdownMenu>)
    await user.tab()
    await user.keyboard("{Enter}")
    expect(screen.getByRole("menuitem", { name: "编辑" })).toBeVisible()
  })
})
