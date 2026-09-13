import * as P from "@radix-ui/react-dialog"
import { CloseIcon } from "@yb/icons"
import { cn } from "../../lib/cn"
export const Dialog=P.Root; export const DialogTrigger=P.Trigger; export const DialogTitle=P.Title; export const DialogDescription=P.Description; export const DialogClose=P.Close
export function DialogContent({children,className,...props}:React.ComponentPropsWithoutRef<typeof P.Content>){return <P.Portal><P.Overlay className="yb-overlay"/><P.Content className={cn("yb-dialog",className)} data-slot="dialog-content" {...props}>{children}<P.Close aria-label="关闭" className="yb-dialog-close"><CloseIcon aria-hidden="true"/></P.Close></P.Content></P.Portal>}
