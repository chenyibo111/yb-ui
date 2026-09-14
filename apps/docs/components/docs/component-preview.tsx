import type { ReactNode } from "react"

export function ComponentPreview({ children, title }: { children: ReactNode; title: string }) {
  return (
    <section className="yb-docs-component-preview" aria-label={`${title} 示例`}>
      <div className="yb-docs-component-preview-label">示例 · {title}</div>
      <div className="yb-docs-component-preview-canvas">{children}</div>
    </section>
  )
}
