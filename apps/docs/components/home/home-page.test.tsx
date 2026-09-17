import { render, screen } from "@testing-library/react"
import { expect, test } from "vitest"

import { HomePage } from "./home-page"

test("renders quick start and documentation entry points", () => {
  render(<HomePage />)

  expect(screen.getByRole("heading", { name: "YB UI" })).toBeInTheDocument()
  expect(screen.getByRole("link", { name: "快速开始" })).toHaveAttribute("href", "/docs/getting-started")
  expect(screen.getByRole("link", { name: "浏览组件" })).toHaveAttribute("href", "/docs/components/button")
  expect(screen.getByRole("link", { name: "组件总览" })).toHaveAttribute("href", "/docs/components")
  expect(screen.getByRole("link", { name: "Token Reference" })).toHaveAttribute("href", "/docs/foundations/token-reference")
  expect(screen.getByRole("link", { name: "业务 Recipes" })).toHaveAttribute("href", "/docs/recipes/async-submit")
})
