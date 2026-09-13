import { Popover, PopoverContent, PopoverTrigger } from "./Popover"
export default { title: "反馈 / Popover", component: Popover }
export const Default={render:()=> <Popover><PopoverTrigger>更多信息</PopoverTrigger><PopoverContent>补充说明内容</PopoverContent></Popover>}
