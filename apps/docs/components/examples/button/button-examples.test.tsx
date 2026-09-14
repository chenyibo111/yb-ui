import { render, screen } from "@testing-library/react"
import { expect, test } from "vitest"
import { ButtonLoadingExample } from "./loading"

test("renders a disabled loading YB Button", () => {
  render(<ButtonLoadingExample />)

  expect(screen.getByRole("button", { name: "保存" })).toBeDisabled()
  expect(screen.getByRole("status", { name: "正在加载" })).toBeInTheDocument()
})
