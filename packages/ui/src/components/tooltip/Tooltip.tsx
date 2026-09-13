import * as P from "@radix-ui/react-tooltip"
import { cn } from "../../lib/cn"
export const TooltipProvider=P.Provider; export const Tooltip=P.Root; export const TooltipTrigger=P.Trigger
export function TooltipContent({className,sideOffset=6,...props}:React.ComponentPropsWithoutRef<typeof P.Content>){return <P.Portal><P.Content className={cn("yb-tooltip",className)} data-slot="tooltip-content" sideOffset={sideOffset} {...props}/></P.Portal>}
