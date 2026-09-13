import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./Tooltip"

describe("Tooltip", () => {
  it("displays its label after hovering", async () => {
    const user = userEvent.setup()
    render(<TooltipProvider delayDuration={0}><Tooltip><TooltipTrigger asChild><button>删除</button></TooltipTrigger><TooltipContent>删除项目</TooltipContent></Tooltip></TooltipProvider>)
    await user.hover(screen.getByRole("button", { name: "删除" }))
    expect(await screen.findByRole("tooltip")).toHaveTextContent("删除项目")
  })
})
