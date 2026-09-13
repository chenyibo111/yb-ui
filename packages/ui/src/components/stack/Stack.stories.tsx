import { Stack } from "./Stack"

export default { title: "布局 / Stack", component: Stack }

export const Vertical = { args: { children: ["第一项", "第二项", "第三项"], gap: "4" } }
export const Horizontal = { args: { children: ["取消", "保存"], direction: "horizontal", gap: "3" } }
