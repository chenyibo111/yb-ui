import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { expect, test } from "vitest"
import { DeleteConfirmationExample } from "./delete-confirmation"

test("opens destructive confirmation content from its trigger", async () => {
  const user = userEvent.setup()
  render(<DeleteConfirmationExample />)

  await user.click(screen.getByRole("button", { name: "删除项目" }))

  expect(screen.getByRole("dialog")).toHaveTextContent("此操作无法撤销")
})
