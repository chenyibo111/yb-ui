import type { ElementType, HTMLAttributes } from "react"

import { cn } from "../../lib/cn"

export type TextSize = "sm" | "md" | "lg"
export type TextWeight = "regular" | "medium" | "semibold"
export type TextTone = "default" | "muted" | "primary" | "destructive" | "success" | "warning"

export type TextProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType
  size?: TextSize
  tone?: TextTone
  weight?: TextWeight
}

export function Text({ as: Component = "p", className, size = "md", tone = "default", weight = "regular", ...props }: TextProps) {
  return (
    <Component
      className={cn("yb-text", `yb-text-${size}`, `yb-text-${tone}`, `yb-text-${weight}`, className)}
      data-slot="text"
      {...props}
    />
  )
}
