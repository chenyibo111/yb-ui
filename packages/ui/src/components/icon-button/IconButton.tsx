import type { ReactNode } from "react"

import { Button, type ButtonProps } from "../button/Button"

export type IconButtonProps = Omit<ButtonProps, "aria-label" | "children" | "size"> & {
  "aria-label": string
  children: ReactNode
}

export function IconButton({ children, ...props }: IconButtonProps) {
  return (
    <Button {...props} data-slot="icon-button" size="icon">
      {children}
    </Button>
  )
}
