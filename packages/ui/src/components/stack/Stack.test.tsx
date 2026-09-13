import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Stack } from "./Stack"

describe("Stack", () => {
  it("maps layout props to deterministic utility classes", () => {
    const { getByTestId } = render(
      <Stack align="center" data-testid="stack" direction="horizontal" gap="4" justify="between" />,
    )

    expect(getByTestId("stack")).toHaveClass("flex-row", "gap-[var(--yb-space-4)]", "items-center", "justify-between")
  })
})
