import { tokenCatalog } from "../../lib/token-catalog"
import { ColorTokenGrid } from "./color-token-grid"
const categories = ["字体", "间距", "圆角", "阴影", "层级"] as const
export function TokenReference() { return <div><ColorTokenGrid />{categories.map((category) => <section key={category}><h2>{category}</h2><ul>{tokenCatalog.filter((item) => item.category === category).map((item) => { const variable = "--yb-" + item.name; return <li key={item.name}><code>{variable}</code>{category === "间距" ? <span aria-label={"间距 " + item.name.replace("space-", "") + "：" + variable} style={{ display: "block", width: "var(" + variable + ")" }} /> : category === "字体" ? <span style={{ fontFamily: "var(" + variable + ")" }}>YB UI 文本</span> : <span>{item.name}</span>}</li> })}</ul></section>)}</div> }
