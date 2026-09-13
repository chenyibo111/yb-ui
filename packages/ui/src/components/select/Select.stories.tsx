import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./Select"

export default { title: "表单 / Select", component: Select }
export const Default = { render: () => <Select><SelectTrigger aria-label="项目状态"><SelectValue placeholder="请选择状态" /></SelectTrigger><SelectContent><SelectItem value="draft">草稿 Draft</SelectItem><SelectItem value="active">进行中 Active</SelectItem><SelectItem disabled value="closed">已关闭 Closed</SelectItem></SelectContent></Select> }
