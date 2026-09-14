import { render,screen } from "@testing-library/react"; import { describe,expect,it } from "vitest"; import { Badge } from "./Badge"
describe("Badge",()=>{it("exposes its variant",()=>{render(<Badge variant="success">已启用</Badge>);expect(screen.getByText("已启用")).toHaveAttribute("data-variant","success")})})
