import type { Preview } from "@storybook/react-vite"
import { createElement } from "react"

import "@yb/tokens/styles.css"
import "@yb/ui/styles.css"
import { YBProvider, type YBLocaleCode } from "@yb/ui"

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
  },
  globalTypes: { locale: { defaultValue: "zh-CN", toolbar: { items: ["zh-CN", "en-US"] } } },
  decorators: [(Story, context) => createElement(YBProvider, { locale: context.globals.locale as YBLocaleCode }, createElement(Story))],
}

export default preview
