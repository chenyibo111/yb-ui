import { render, screen } from "@testing-library/react"
import { expect, test } from "vitest"

import { ComponentCatalog } from "./component-catalog"

test("links documented components while marking unfinished guides without a broken link", () => {
  render(
    <ComponentCatalog
      entries={[
        {
          category: "表单与输入",
          description: "从预定义选项中选择一个值。",
          href: "/docs/components/select",
          name: "Select 选择器",
          status: "planned",
        },
        {
          category: "浮层与操作",
          description: "触发明确的用户操作。",
          href: "/docs/components/button",
          name: "Button 按钮",
          status: "documented",
        },
      ]}
    />,
  )

    expect(screen.getByRole("heading", { name: "表单与输入" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Button 按钮" })).toHaveAttribute("href", "/docs/components/button")
    expect(screen.getByText("从预定义选项中选择一个值。")).toBeInTheDocument()
    expect(screen.getByText("文档编写中")).toBeInTheDocument()
  expect(screen.queryByRole("link", { name: "Select 选择器" })).not.toBeInTheDocument()
})
