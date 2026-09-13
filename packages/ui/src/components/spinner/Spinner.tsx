import { SpinnerIcon } from "@yb/icons"
import { cn } from "../../lib/cn"
export function Spinner({className,label,...props}:{label:string}&React.HTMLAttributes<SVGSVGElement>){return <SpinnerIcon aria-label={label} className={cn("yb-spinner",className)} role="status" {...props}/>}
