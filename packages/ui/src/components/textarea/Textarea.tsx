import { forwardRef, type TextareaHTMLAttributes } from "react"

import { cn } from "../../lib/cn"

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea({ className, ...props }, ref) {
  return <textarea className={cn("yb-textarea", className)} data-slot="textarea" ref={ref} {...props} />
})
