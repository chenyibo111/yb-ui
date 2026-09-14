import { render, screen } from "@testing-library/react"
import { expect, test } from "vitest"

import { ApiTable } from "./api-table"

test("renders prop name type default value and description", () => {
  render(
    <ApiTable
      rows={[
        {
          name: "loading",
          type: "boolean",
          defaultValue: "false",
          description: "显示加载状态",
        },
      ]}
    />,
  )

  expect(screen.getByRole("cell", { name: "loading" })).toBeInTheDocument()
  expect(screen.getByText("boolean")).toBeInTheDocument()
  expect(screen.getByText("显示加载状态")).toBeInTheDocument()
})
