import defaultMdxComponents from "fumadocs-ui/mdx"
import type { MDXComponents } from "mdx/types"

import { ApiTable } from "./docs/api-table"
import { ComponentCatalog } from "./docs/component-catalog"
import { ComponentPreview } from "./docs/component-preview"
import { SourceCode } from "./docs/source-code"

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ApiTable,
    ComponentCatalog,
    ComponentPreview,
    SourceCode,
    ...components,
  } satisfies MDXComponents
}

export const useMDXComponents = getMDXComponents

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>
}
