import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { expect, test } from "vitest"

import { DatePickerBasicExample } from "./date-picker/basic"
import { FieldErrorExample } from "./field/error"
import { SelectControlledExample } from "./select/controlled"

test("associates a Field error message with its input", () => {
  render(<FieldErrorExample />)

  const input = screen.getByRole("textbox", { name: "工作邮箱" })

  expect(input).toHaveAttribute("aria-invalid", "true")
  expect(input).toHaveAccessibleDescription(/请使用公司邮箱，格式如 name@example\.com。\s*请输入有效的工作邮箱地址。/)
  expect(screen.getByRole("alert")).toHaveTextContent("请输入有效的工作邮箱地址。")
})

test("selects the next priority option with the keyboard", async () => {
  const user = userEvent.setup()

  render(<SelectControlledExample />)

  const select = screen.getByRole("combobox", { name: "处理优先级" })
  await user.click(select)
  await user.keyboard("{ArrowDown}{Enter}")

  expect(select).toHaveTextContent("中")
})

test("exposes the localized accessible name for DatePicker", () => {
  render(<DatePickerBasicExample />)

  expect(screen.getByRole("button", { name: "选择日期" })).toBeInTheDocument()
})
