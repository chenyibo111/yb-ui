import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Skeleton } from "./Skeleton"
describe("Skeleton",()=>{it("stays hidden from assistive technology",()=>{render(<Skeleton data-testid="s"/>);expect(screen.getByTestId("s")).toHaveAttribute("aria-hidden","true")})})
