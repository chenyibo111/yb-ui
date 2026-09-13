import { cn } from "../../lib/cn"
export function Skeleton({className,...props}:React.HTMLAttributes<HTMLDivElement>){return <div aria-hidden="true" className={cn("yb-skeleton",className)} data-slot="skeleton" {...props}/>}
