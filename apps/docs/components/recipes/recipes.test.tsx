import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { expect, test } from "vitest"

import { AsyncSubmitRecipe } from "./async-submit"
import { ConfirmDestructiveActionRecipe } from "./confirm-destructive-action"

test("keeps form input and exposes an error after an asynchronous submit fails", async () => {
  const user = userEvent.setup()

  render(<AsyncSubmitRecipe />)

  const input = screen.getByRole("textbox", { name: "项目名称" })
  await user.type(input, "客户服务控制台")
  await user.click(screen.getByRole("button", { name: "保存项目" }))

  expect(screen.getByRole("button", { name: "保存项目" })).toBeDisabled()
  expect(screen.getByRole("button", { name: "保存项目" })).toHaveAttribute("aria-busy", "true")

  expect(await screen.findByRole("alert")).toHaveTextContent("保存失败，请稍后重试。")
  expect(input).toHaveValue("客户服务控制台")
})

test("only changes the destructive action result after confirmation", async () => {
  const user = userEvent.setup()

  render(<ConfirmDestructiveActionRecipe />)

  expect(screen.getByText("项目仍会保留。")).toBeInTheDocument()
  await user.click(screen.getByRole("button", { name: "删除项目" }))
  expect(screen.getByRole("dialog")).toBeInTheDocument()
  await user.click(screen.getByRole("button", { name: "确认删除" }))

  expect(screen.getByText("项目已删除。")).toBeInTheDocument()
})
