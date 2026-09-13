import type { HTMLAttributes } from "react"

import { cn } from "../../lib/cn"

export type Space = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10"
export type StackDirection = "vertical" | "horizontal"
export type StackAlign = "start" | "center" | "end" | "stretch"
export type StackJustify = "start" | "center" | "end" | "between" | "around"

export type StackProps = HTMLAttributes<HTMLDivElement> & {
  align?: StackAlign
  direction?: StackDirection
  gap?: Space
  justify?: StackJustify
}

const directionClasses: Record<StackDirection, string> = {
  horizontal: "flex-row",
  vertical: "flex-col",
}

const alignClasses: Record<StackAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
}

const justifyClasses: Record<StackJustify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
}

export function Stack({
  align = "stretch",
  className,
  direction = "vertical",
  gap = "3",
  justify = "start",
  ...props
}: StackProps) {
  return (
    <div
      className={cn(
        "yb-stack",
        directionClasses[direction],
        `yb-gap-${gap}`,
        `gap-[var(--yb-space-${gap})]`,
        alignClasses[align],
        justifyClasses[justify],
        className,
      )}
      data-slot="stack"
      {...props}
    />
  )
}
