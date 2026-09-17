import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { expect, test } from "vitest"

import { DropdownMenuExample } from "./dropdown-menu/basic"
import { PaginationExample } from "./pagination/basic"
import { TableExample } from "./table/basic"
import { TabsExample } from "./tabs/basic"

test("opens and closes DropdownMenu with the keyboard", async () => {
  const user = userEvent.setup()

  render(<DropdownMenuExample />)

  const trigger = screen.getByRole("button", { name: "更多项目操作" })
  trigger.focus()
  await user.keyboard("{Enter}")
  expect(screen.getByRole("menuitem", { name: "复制项目链接" })).toBeInTheDocument()

  await user.keyboard("{Escape}")
  expect(screen.queryByRole("menuitem", { name: "复制项目链接" })).not.toBeInTheDocument()
})

test("shows the selected Tabs panel", async () => {
  const user = userEvent.setup()

  render(<TabsExample />)
  await user.click(screen.getByRole("tab", { name: "成员" }))

  expect(screen.getByRole("tabpanel")).toHaveTextContent("邀请成员后，他们可以访问该项目。")
})

test("marks the active pagination page", () => {
  render(<PaginationExample />)

  expect(screen.getByRole("button", { name: "第 2 页" })).toHaveAttribute("aria-current", "page")
})

test("renders structured data with native table semantics", () => {
  render(<TableExample />)

  expect(screen.getByRole("table", { name: "项目状态" })).toBeInTheDocument()
  expect(screen.getAllByRole("columnheader")).toHaveLength(2)
})
