import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { YBProvider, useYBLocale } from "./YBProvider"

function LocaleProbe() {
  return <span>{useYBLocale().pagination.next}</span>
}

describe("YBProvider", () => {
  it("uses Chinese pagination copy by default", () => {
    render(<YBProvider><LocaleProbe /></YBProvider>)

    expect(screen.getByText("下一页")).toBeInTheDocument()
  })

  it("switches built-in copy when English locale is selected", () => {
    render(<YBProvider locale="en-US"><LocaleProbe /></YBProvider>)

    expect(screen.getByText("Next page")).toBeInTheDocument()
  })
})
