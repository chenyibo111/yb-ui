import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./DropdownMenu"
export default { title: "反馈 / DropdownMenu", component: DropdownMenu }
export const Default={render:()=> <DropdownMenu><DropdownMenuTrigger>更多操作</DropdownMenuTrigger><DropdownMenuContent><DropdownMenuItem>编辑</DropdownMenuItem><DropdownMenuItem>删除</DropdownMenuItem></DropdownMenuContent></DropdownMenu>}
