import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Toast, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "./Toast"
describe("Toast",()=>{it("announces feedback through a live region",()=>{render(<ToastProvider><Toast open><ToastTitle>已保存</ToastTitle><ToastDescription>项目已更新</ToastDescription></Toast><ToastViewport/></ToastProvider>);expect(screen.getByText("已保存")).toBeInTheDocument()})})
