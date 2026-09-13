import { Checkbox } from "./Checkbox"

export default { title: "表单 / Checkbox", component: Checkbox }
export const Default = { args: { "aria-label": "同意协议" } }
export const Checked = { args: { "aria-label": "已同意协议", defaultChecked: true } }
export const Disabled = { args: { "aria-label": "不可用选项", disabled: true } }
