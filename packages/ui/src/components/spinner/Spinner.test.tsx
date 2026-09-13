import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Spinner } from "./Spinner"
describe("Spinner",()=>{it("has an accessible status label",()=>{render(<Spinner label="正在保存"/>);expect(screen.getByRole("status",{name:"正在保存"})).toBeInTheDocument()})})
