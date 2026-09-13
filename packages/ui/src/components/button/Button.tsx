import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import type { ButtonHTMLAttributes, MouseEvent } from "react"

import { SpinnerIcon } from "@yb/icons"

import { cn } from "../../lib/cn"

export const buttonVariants = cva("yb-button", {
  variants: {
    variant: {
      primary: "yb-button-primary",
      secondary: "yb-button-secondary",
      outline: "yb-button-outline",
      ghost: "yb-button-ghost",
      destructive: "yb-button-destructive",
    },
    size: {
      sm: "yb-button-sm",
      md: "yb-button-md",
      lg: "yb-button-lg",
      icon: "yb-button-icon",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
})

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean
    asChild?: boolean
  }

export function Button({
  asChild = false,
  children,
  className,
  disabled,
  loading = false,
  onClick,
  size,
  variant,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    if (asChild && isDisabled) {
      event.preventDefault()
      return
    }

    onClick?.(event)
  }

  if (asChild) {
    return (
      <Slot
        aria-busy={loading || undefined}
        aria-disabled={isDisabled || undefined}
        className={cn(buttonVariants({ size, variant }), className)}
        data-loading={loading || undefined}
        data-slot="button"
        onClick={handleClick}
        {...props}
      >
        {children}
      </Slot>
    )
  }

  return (
    <>
      <button
        aria-busy={loading || undefined}
        className={cn(buttonVariants({ size, variant }), className)}
        data-loading={loading || undefined}
        data-slot="button"
        disabled={isDisabled}
        onClick={handleClick}
        {...props}
      >
        {loading ? <SpinnerIcon aria-hidden="true" className="yb-button-spinner" /> : null}
        {children}
      </button>
      {loading ? <span aria-label="正在加载" className="yb-sr-only" role="status" /> : null}
    </>
  )
}
