import { Textarea } from "./Textarea"

export default { title: "表单 / Textarea", component: Textarea }

export const Default = { args: { placeholder: "请输入备注" } }
export const Disabled = { args: { defaultValue: "不可编辑的内容", disabled: true } }
