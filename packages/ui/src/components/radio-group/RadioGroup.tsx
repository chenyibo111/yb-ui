import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { cn } from "../../lib/cn"

export type RadioGroupProps = React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
export type RadioGroupItemProps = React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>

export function RadioGroup({ className, ...props }: RadioGroupProps) {
  return <RadioGroupPrimitive.Root className={cn("yb-radio-group", className)} data-slot="radio-group" {...props} />
}

export function RadioGroupItem({ className, ...props }: RadioGroupItemProps) {
  return <RadioGroupPrimitive.Item className={cn("yb-radio", className)} data-slot="radio-group-item" {...props}><RadioGroupPrimitive.Indicator className="yb-radio-indicator" /></RadioGroupPrimitive.Item>
}
