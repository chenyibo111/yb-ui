import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./Dialog"
export default { title: "反馈 / Dialog", component: Dialog }
export const Default={render:()=> <Dialog><DialogTrigger>打开设置</DialogTrigger><DialogContent><DialogTitle>设置</DialogTitle><p>对话框内容</p></DialogContent></Dialog>}
