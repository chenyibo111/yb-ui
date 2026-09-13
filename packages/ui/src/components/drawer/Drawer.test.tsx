import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "./Drawer"

describe("Drawer", () => {
  it("renders an accessible side-panel dialog", async () => {
    const user = userEvent.setup()
    render(<Drawer><DrawerTrigger>筛选</DrawerTrigger><DrawerContent side="right"><DrawerTitle>筛选条件</DrawerTitle></DrawerContent></Drawer>)
    await user.click(screen.getByRole("button", { name: "筛选" }))
    expect(screen.getByRole("dialog", { name: "筛选条件" })).toBeInTheDocument()
  })
})
