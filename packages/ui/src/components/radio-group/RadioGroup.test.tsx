import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { RadioGroup, RadioGroupItem } from "./RadioGroup"

describe("RadioGroup", () => {
  it("honours its uncontrolled default value", () => {
    render(
      <RadioGroup defaultValue="team">
        <RadioGroupItem aria-label="团队可见" value="team" />
        <RadioGroupItem aria-label="仅自己可见" value="private" />
      </RadioGroup>,
    )

    expect(screen.getByRole("radio", { name: "团队可见" })).toBeChecked()
    expect(screen.getByRole("radio", { name: "仅自己可见" })).not.toBeChecked()
  })
})
