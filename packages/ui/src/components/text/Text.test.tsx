import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Text } from "./Text"

describe("Text", () => {
  it("renders semantic text styling on its native element", () => {
    render(<Text tone="muted" weight="medium">辅助说明</Text>)

    expect(screen.getByText("辅助说明")).toHaveAttribute("data-slot", "text")
  })
})
