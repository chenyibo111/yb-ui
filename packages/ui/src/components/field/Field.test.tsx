import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Input } from "../input/Input"
import { Field } from "./Field"

describe("Field", () => {
  it("connects its label, description, and error to a single input", () => {
    render(
      <Field description="用于页面顶部展示" error="名称不能为空" label="名称" required>
        <Input />
      </Field>,
    )

    const input = screen.getByLabelText("名称")
    expect(input).toBeRequired()
    expect(input.getAttribute("aria-describedby")).toContain("description")
    expect(input.getAttribute("aria-describedby")).toContain("error")
    expect(screen.getByText("名称不能为空")).toHaveAttribute("role", "alert")
  })
})
