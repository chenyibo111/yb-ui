import * as P from "@radix-ui/react-dropdown-menu"
import { cn } from "../../lib/cn"
export const DropdownMenu=P.Root; export const DropdownMenuTrigger=P.Trigger; export const DropdownMenuGroup=P.Group; export const DropdownMenuLabel=P.Label; export const DropdownMenuSeparator=P.Separator
export function DropdownMenuContent({className,sideOffset=6,...props}:React.ComponentPropsWithoutRef<typeof P.Content>){return <P.Portal><P.Content className={cn("yb-menu",className)} data-slot="dropdown-menu-content" sideOffset={sideOffset} {...props}/></P.Portal>}
export function DropdownMenuItem({className,...props}:React.ComponentPropsWithoutRef<typeof P.Item>){return <P.Item className={cn("yb-menu-item",className)} data-slot="dropdown-menu-item" {...props}/>} 
