import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cn } from "../../lib/cn"

export type SwitchProps = React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>

export function Switch({ className, ...props }: SwitchProps) {
  return <SwitchPrimitive.Root className={cn("yb-switch", className)} data-slot="switch" {...props}><SwitchPrimitive.Thumb className="yb-switch-thumb" /></SwitchPrimitive.Root>
}
