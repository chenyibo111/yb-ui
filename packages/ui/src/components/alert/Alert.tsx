import { cn } from "../../lib/cn"
export type AlertProps=React.HTMLAttributes<HTMLDivElement>&{variant?:"default"|"info"|"success"|"warning"|"destructive"}
export function Alert({className,variant="default",...props}:AlertProps){return <div className={cn("yb-alert",`yb-alert-${variant}`,className)} data-slot="alert" role={variant==="destructive"?"alert":"status"} {...props}/>}
export function AlertTitle({className,...props}:React.HTMLAttributes<HTMLHeadingElement>){return <h5 className={cn("yb-alert-title",className)} {...props}/>}; export function AlertDescription({className,...props}:React.HTMLAttributes<HTMLDivElement>){return <div className={cn("yb-alert-description",className)} {...props}/>}
