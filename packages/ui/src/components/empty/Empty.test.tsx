import { render,screen } from "@testing-library/react"; import { describe,expect,it } from "vitest"; import { Empty } from "./Empty"
describe("Empty",()=>{it("renders a supplied action",()=>{render(<Empty action={<button>新建项目</button>} title="暂无项目"/>);expect(screen.getByRole("button",{name:"新建项目"})).toBeInTheDocument()})})
