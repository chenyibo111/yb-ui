import { render,screen } from "@testing-library/react"; import { describe,expect,it } from "vitest"; import { Card,CardTitle } from "./Card"
describe("Card",()=>{it("provides a card landmark",()=>{render(<Card><CardTitle>统计</CardTitle></Card>);expect(screen.getByText("统计").closest("section")).toHaveAttribute("data-slot","card")})})
