import { Button } from "./Button"

export default { title: "基础 / Button", component: Button }

export const Primary = { args: { children: "保存" } }
export const Secondary = { args: { children: "取消", variant: "secondary" } }
export const Outline = { args: { children: "预览", variant: "outline" } }
export const Ghost = { args: { children: "更多", variant: "ghost" } }
export const Destructive = { args: { children: "删除", variant: "destructive" } }
export const Small = { args: { children: "保存", size: "sm" } }
export const Large = { args: { children: "保存", size: "lg" } }
export const Loading = { args: { children: "保存", loading: true } }
export const Disabled = { args: { children: "保存", disabled: true } }
