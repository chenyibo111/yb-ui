import * as P from "@radix-ui/react-dialog"
import { CloseIcon } from "@yb/icons"
import { cn } from "../../lib/cn"
export const Drawer=P.Root; export const DrawerTrigger=P.Trigger; export const DrawerTitle=P.Title; export const DrawerDescription=P.Description; export const DrawerClose=P.Close
export function DrawerContent({children,className,side="right",...props}:React.ComponentPropsWithoutRef<typeof P.Content>&{side?:"left"|"right"|"top"|"bottom"}){return <P.Portal><P.Overlay className="yb-overlay"/><P.Content className={cn("yb-drawer",`yb-drawer-${side}`,className)} data-slot="drawer-content" {...props}>{children}<P.Close aria-label="关闭" className="yb-dialog-close"><CloseIcon aria-hidden="true"/></P.Close></P.Content></P.Portal>}
