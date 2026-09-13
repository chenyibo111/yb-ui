import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { Textarea } from "./Textarea"

describe("Textarea", () => {
  it("preserves native multiline text entry", async () => {
    const user = userEvent.setup()
    render(<Textarea aria-label="备注" />)

    await user.type(screen.getByLabelText("备注"), "第一行{enter}第二行")

    expect(screen.getByLabelText("备注")).toHaveValue("第一行\n第二行")
  })
})
