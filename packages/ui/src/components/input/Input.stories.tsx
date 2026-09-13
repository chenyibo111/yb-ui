import { Input } from "./Input"

export default { title: "表单 / Input", component: Input }

export const Default = { args: { placeholder: "请输入项目名称" } }
export const Disabled = { args: { defaultValue: "不可编辑的内容", disabled: true } }
export const Invalid = { args: { "aria-invalid": true, defaultValue: "不符合要求" } }
