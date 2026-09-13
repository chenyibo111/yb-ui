import type { HTMLAttributes } from "react"

import { cn } from "../../lib/cn"

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  level?: HeadingLevel
}

export function Heading({ className, level = 2, ...props }: HeadingProps) {
  const Component = `h${level}` as const

  return <Component className={cn("yb-heading", `yb-heading-${level}`, className)} data-slot="heading" {...props} />
}
