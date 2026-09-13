import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Heading } from "./Heading"

describe("Heading", () => {
  it("uses the requested semantic heading level", () => {
    render(<Heading level={2}>页面标题</Heading>)

    expect(screen.getByRole("heading", { level: 2, name: "页面标题" })).toHaveAttribute(
      "data-slot",
      "heading",
    )
  })
})
