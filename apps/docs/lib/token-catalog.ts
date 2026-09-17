import { ybTokenNames, type YBTokenName } from "@chenyibo111/tokens"
export type TokenCategory = "颜色" | "字体" | "间距" | "圆角" | "阴影" | "层级"
export type TokenCatalogEntry = { category: TokenCategory; name: YBTokenName }
function categoryFor(name: YBTokenName): TokenCategory { if (name.startsWith("font-")) return "字体"; if (name.startsWith("space-")) return "间距"; if (name.startsWith("radius-")) return "圆角"; if (name.startsWith("shadow-")) return "阴影"; if (name.startsWith("z-")) return "层级"; return "颜色" }
export const tokenCatalog: readonly TokenCatalogEntry[] = ybTokenNames.map((name) => ({ category: categoryFor(name), name }))
