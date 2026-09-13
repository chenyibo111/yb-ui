import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./Tooltip"
export default { title: "反馈 / Tooltip", component: Tooltip }
export const Default={render:()=> <TooltipProvider><Tooltip><TooltipTrigger asChild><button>删除</button></TooltipTrigger><TooltipContent>删除项目 Delete project</TooltipContent></Tooltip></TooltipProvider>}
