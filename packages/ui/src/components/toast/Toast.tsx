import * as P from "@radix-ui/react-toast"
import { cn } from "../../lib/cn"
export const ToastProvider=P.Provider; export const ToastTitle=P.Title; export const ToastDescription=P.Description; export const ToastAction=P.Action; export const ToastClose=P.Close
export function Toast({className,...props}:React.ComponentPropsWithoutRef<typeof P.Root>){return <P.Root className={cn("yb-toast",className)} data-slot="toast" {...props}/>}
export function ToastViewport({className,...props}:React.ComponentPropsWithoutRef<typeof P.Viewport>){return <P.Viewport className={cn("yb-toast-viewport",className)} {...props}/>}
