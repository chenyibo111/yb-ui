import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { App } from "./App"

describe("Playground consumer screen", () => {
  it("uses the public YB package API", () => {
    render(<App />)

    expect(screen.getByRole("button", { name: "保存" })).toBeInTheDocument()
    expect(screen.getByRole("table")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "选择日期" })).toBeInTheDocument()
  })
})
