import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "@yb/icons"
import { cn } from "../../lib/cn"

export type CheckboxProps = React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>

export function Checkbox({ className, ...props }: CheckboxProps) {
  return <CheckboxPrimitive.Root className={cn("yb-checkbox", className)} data-slot="checkbox" {...props}><CheckboxPrimitive.Indicator className="yb-checkbox-indicator"><CheckIcon aria-hidden="true" /></CheckboxPrimitive.Indicator></CheckboxPrimitive.Root>
}
