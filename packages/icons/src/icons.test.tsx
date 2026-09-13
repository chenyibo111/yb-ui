import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { AddIcon } from "./index"

describe("YB icon boundary", () => {
  it("renders an accessible icon through the stable YB export", () => {
    render(<AddIcon aria-label="新增项目" />)

    expect(screen.getByLabelText("新增项目").tagName).toBe("svg")
  })
})
