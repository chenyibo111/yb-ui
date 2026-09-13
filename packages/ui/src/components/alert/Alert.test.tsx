import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Alert, AlertDescription, AlertTitle } from "./Alert"

describe("Alert", () => {
  it("uses an alert role for destructive feedback", () => {
    render(<Alert variant="destructive"><AlertTitle>保存失败</AlertTitle><AlertDescription>请稍后重试</AlertDescription></Alert>)
    expect(screen.getByRole("alert")).toHaveTextContent("保存失败")
  })
})
