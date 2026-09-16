"use client"

import { Button, Card, CardContent, CardHeader, CardTitle, Heading, Text } from "@chenyibo111/ui"
import { ChevronRightIcon } from "@chenyibo111/icons"

const capabilities = [
  {
    index: "01",
    title: "设计令牌",
    description: "以 Cobalt Pulse 语义令牌统一色彩、间距、圆角与层级，并为深色主题保留结构。",
  },
  {
    index: "02",
    title: "可访问组件",
    description: "基于 React 与 Radix UI 构建，键盘操作、焦点管理和 ARIA 均是组件体验的一部分。",
  },
  {
    index: "03",
    title: "组合示例",
    description: "从单个组件的 API 到可直接复用的界面组合，帮助团队更快形成一致的产品界面。",
  },
]

export function HomePage() {
  return (
    <main className="yb-docs-home">
      <section className="yb-docs-home-hero" aria-labelledby="yb-docs-home-title">
        <span className="yb-docs-home-eyebrow">Cobalt Pulse / React Design System</span>
        <Heading className="yb-docs-home-title" id="yb-docs-home-title" level={1}>
          YB UI
        </Heading>
        <Text className="yb-docs-home-description" size="lg">
          一套为内部 React 项目打造的通用设计系统。用清晰的令牌、可访问的基础组件与可复制的示例，让界面保持一致并持续演进。
        </Text>
        <div className="yb-docs-home-actions">
          <Button asChild>
            <a href="/docs/getting-started">
              快速开始
              <ChevronRightIcon aria-hidden="true" size={16} />
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href="/docs/components/button">浏览组件</a>
          </Button>
        </div>
      </section>

      <section aria-label="YB UI 能力概览">
        <div className="yb-docs-home-grid">
          {capabilities.map((capability) => (
            <Card className="yb-docs-home-card" key={capability.index}>
              <CardHeader>
                <span className="yb-docs-home-card-index">{capability.index}</span>
                <CardTitle>{capability.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Text className="yb-docs-home-card-description">{capability.description}</Text>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}
