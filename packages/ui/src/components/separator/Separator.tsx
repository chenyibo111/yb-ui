import type { HTMLAttributes } from "react"

import { cn } from "../../lib/cn"

export type SeparatorProps = HTMLAttributes<HTMLDivElement> & {
  orientation?: "horizontal" | "vertical"
}

export function Separator({ className, orientation = "horizontal", ...props }: SeparatorProps) {
  return (
    <div
      aria-orientation={orientation}
      className={cn("yb-separator", `yb-separator-${orientation}`, className)}
      data-slot="separator"
      role="separator"
      {...props}
    />
  )
}
