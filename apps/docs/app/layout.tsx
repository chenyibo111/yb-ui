import type { Metadata } from "next"
import type { ReactNode } from "react"
import { RootProvider } from "fumadocs-ui/provider/next"

import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "YB UI",
    template: "%s | YB UI",
  },
  description: "面向内部 React 项目的 YB UI 组件库文档。",
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  )
}
