import { cloneElement, isValidElement, useId, type HTMLAttributes, type ReactNode } from "react"

import { cn } from "../../lib/cn"

export type FieldProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  description?: ReactNode
  error?: ReactNode
  id?: string
  label?: ReactNode
  required?: boolean
}

export function Field({ children, className, description, error, id, label, required = false, ...props }: FieldProps) {
  const generatedId = useId().replace(/:/g, "")
  const controlId = id ?? `yb-field-${generatedId}`
  const descriptionId = `${controlId}-description`
  const errorId = `${controlId}-error`

  if (!isValidElement<Record<string, unknown>>(children)) {
    throw new Error("Field expects exactly one form control child.")
  }

  const childId = typeof children.props.id === "string" ? children.props.id : undefined
  const childRequired = typeof children.props.required === "boolean" ? children.props.required : undefined
  const existingDescription = typeof children.props["aria-describedby"] === "string" ? children.props["aria-describedby"] : ""
  const describedBy = [existingDescription, description ? descriptionId : "", error ? errorId : ""].filter(Boolean).join(" ")

  const control = cloneElement(children, {
    "aria-describedby": describedBy || undefined,
    "aria-invalid": error ? true : children.props["aria-invalid"],
    id: childId ?? controlId,
    required: childRequired ?? required,
  })

  return (
    <div className={cn("yb-field", className)} data-slot="field" {...props}>
      {label ? (
        <label className="yb-field-label" data-required={required || undefined} htmlFor={childId ?? controlId}>
          {label}
        </label>
      ) : null}
      {control}
      {description ? <div className="yb-field-description" id={descriptionId}>{description}</div> : null}
      {error ? <div className="yb-field-error" id={errorId} role="alert">{error}</div> : null}
    </div>
  )
}
