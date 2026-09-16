import type { Preview } from "@storybook/react-vite"
import { createElement } from "react"

import "@chenyibo111/tokens/styles.css"
import "@chenyibo111/ui/styles.css"
import { YBProvider, type YBLocaleCode } from "@chenyibo111/ui"

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
  },
  globalTypes: { locale: { defaultValue: "zh-CN", toolbar: { items: ["zh-CN", "en-US"] } } },
  decorators: [(Story, context) => createElement(YBProvider, { locale: context.globals.locale as YBLocaleCode }, createElement(Story))],
}

export default preview
