import type { HTMLAttributes } from "react"

import { cn } from "../../lib/cn"
import type { Space } from "../stack/Stack"

export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6

export type GridProps = HTMLAttributes<HTMLDivElement> & {
  columns?: GridColumns
  gap?: Space
}

export function Grid({ className, columns = 1, gap = "4", ...props }: GridProps) {
  return (
    <div className={cn("yb-grid", `yb-grid-cols-${columns}`, `yb-grid-gap-${gap}`, className)} data-slot="grid" {...props} />
  )
}
