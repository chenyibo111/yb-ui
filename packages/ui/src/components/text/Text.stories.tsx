import { Text } from "./Text"

export default { title: "排版 / Text", component: Text }

export const Default = { args: { children: "支持中英文混排的正文文本。" } }
export const Muted = { args: { children: "辅助说明文本", tone: "muted" } }
export const Emphasis = { args: { children: "重点说明", weight: "semibold", size: "lg" } }
