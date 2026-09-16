import * as SelectPrimitive from "@radix-ui/react-select"
import { CheckIcon, ChevronDownIcon } from "@chenyibo111/icons"
import { cn } from "../../lib/cn"

export const Select = SelectPrimitive.Root
export const SelectValue = SelectPrimitive.Value
export const SelectGroup = SelectPrimitive.Group

export type SelectTriggerProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
export function SelectTrigger({ children, className, ...props }: SelectTriggerProps) {
  return <SelectPrimitive.Trigger className={cn("yb-select-trigger", className)} data-slot="select-trigger" {...props}>{children}<SelectPrimitive.Icon asChild><ChevronDownIcon aria-hidden="true" /></SelectPrimitive.Icon></SelectPrimitive.Trigger>
}

export type SelectContentProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
export function SelectContent({ children, className, ...props }: SelectContentProps) {
  return <SelectPrimitive.Portal><SelectPrimitive.Content className={cn("yb-select-content", className)} data-slot="select-content" position="popper" {...props}><SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport></SelectPrimitive.Content></SelectPrimitive.Portal>
}

export type SelectItemProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
export function SelectItem({ children, className, ...props }: SelectItemProps) {
  return <SelectPrimitive.Item className={cn("yb-select-item", className)} data-slot="select-item" {...props}><SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText><SelectPrimitive.ItemIndicator className="yb-select-item-indicator"><CheckIcon aria-hidden="true" /></SelectPrimitive.ItemIndicator></SelectPrimitive.Item>
}
