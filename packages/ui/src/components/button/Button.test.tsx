import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { Button } from "./Button"

describe("Button", () => {
  it("keeps its accessible name while loading and prevents clicks", () => {
    render(<Button loading>保存</Button>)

    expect(screen.getByRole("button", { name: "保存" })).toBeDisabled()
    expect(screen.getByRole("status")).toBeInTheDocument()
  })

  it("has a visible keyboard focus target", async () => {
    const user = userEvent.setup()
    render(<Button>保存</Button>)

    await user.tab()

    expect(screen.getByRole("button", { name: "保存" })).toHaveFocus()
  })

  it("can apply button styling to a link", () => {
    render(
      <Button asChild>
        <a href="/docs">查看文档</a>
      </Button>,
    )

    expect(screen.getByRole("link", { name: "查看文档" })).toHaveAttribute("href", "/docs")
  })
})
