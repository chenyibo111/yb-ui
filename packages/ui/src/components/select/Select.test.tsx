import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./Select"

describe("Select", () => {
  it("opens and selects an option from the keyboard", async () => {
    const user = userEvent.setup()
    render(
      <Select>
        <SelectTrigger aria-label="项目状态"><SelectValue placeholder="请选择" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="draft">草稿</SelectItem>
          <SelectItem value="active">进行中</SelectItem>
        </SelectContent>
      </Select>,
    )

    await user.tab()
    await user.keyboard("{Enter}{ArrowDown}{Enter}")

    expect(screen.getByRole("combobox", { name: "项目状态" })).toHaveTextContent("进行中")
  })
})
