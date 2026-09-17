import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { expect, test } from "vitest"

import { AlertVariantsExample } from "./alert/variants"
import { LoadingFeedbackExample } from "./spinner/loading"
import { ToastTriggerExample } from "./toast/trigger"

test("renders destructive Alert with alert semantics", () => {
  render(<AlertVariantsExample />)

  expect(screen.getByRole("alert")).toHaveTextContent("删除后无法恢复")
})

test("provides readable loading states for Button and Spinner", () => {
  render(<LoadingFeedbackExample />)

  expect(screen.getByRole("button", { name: "保存更改" })).toBeDisabled()
  expect(screen.getByRole("button", { name: "保存更改" })).toHaveAttribute("aria-busy", "true")
  expect(screen.getByRole("status", { name: "正在加载" })).toBeInTheDocument()
  expect(screen.getByRole("status", { name: "正在同步数据" })).toBeInTheDocument()
})

test("opens Toast from an explicit user action", async () => {
  const user = userEvent.setup()

  render(<ToastTriggerExample />)

  await user.click(screen.getByRole("button", { name: "显示保存提示" }))

  expect(screen.getByText("项目已保存")).toBeInTheDocument()
})
