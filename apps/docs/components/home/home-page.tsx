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

const documentationRoutes = [
  {
    description: "按能力分类浏览全部 33 个公开组件，并从单个页面查看示例、API 与注意事项。",
    href: "/docs/components",
    index: "01",
    title: "组件总览",
  },
  {
    description: "查看当前主题的真实颜色、字体、间距、圆角、阴影与层级 Token。",
    href: "/docs/foundations/token-reference",
    index: "02",
    title: "Token Reference",
  },
  {
    description: "从异步提交到消费者 CSS 边界，复制经过验证的组合模式。",
    href: "/docs/recipes/async-submit",
    index: "03",
    title: "业务 Recipes",
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

      <section aria-labelledby="yb-docs-home-routes-title">
        <div className="yb-docs-home-section-heading">
          <Heading id="yb-docs-home-routes-title" level={2}>
            从任务开始探索
          </Heading>
          <Text tone="muted">选择一个入口，快速找到适合当前工作的说明与示例。</Text>
        </div>
        <div className="yb-docs-home-grid">
          {documentationRoutes.map((route) => (
            <Card className="yb-docs-home-card" key={route.href}>
              <CardHeader>
                <span className="yb-docs-home-card-index">{route.index}</span>
                <CardTitle>{route.title}</CardTitle>
              </CardHeader>
              <CardContent className="yb-docs-home-route-content">
                <Text className="yb-docs-home-card-description">{route.description}</Text>
                <a className="yb-docs-home-route-link" href={route.href}>
                  {route.title}
                  <ChevronRightIcon aria-hidden="true" size={16} />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}
