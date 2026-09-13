import * as P from "@radix-ui/react-popover"
import { cn } from "../../lib/cn"
export const Popover=P.Root; export const PopoverTrigger=P.Trigger; export const PopoverAnchor=P.Anchor
export function PopoverContent({className,sideOffset=8,...props}:React.ComponentPropsWithoutRef<typeof P.Content>){return <P.Portal><P.Content className={cn("yb-popover",className)} data-slot="popover-content" sideOffset={sideOffset} {...props}/></P.Portal>}
