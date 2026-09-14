import { render, screen } from "@testing-library/react"
import { expect, test } from "vitest"
import { InputFieldStatesExample } from "./field-states"

test("associates an invalid input with its error message", () => {
  render(<InputFieldStatesExample />)

  expect(screen.getByLabelText("工作邮箱")).toHaveAttribute("aria-invalid", "true")
  expect(screen.getByText("请输入有效的邮箱地址")).toBeInTheDocument()
})
