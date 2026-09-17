"use client"

import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle, Text } from "@chenyibo111/ui"

export function CardExample() {
  return <Card><CardHeader><CardTitle>设计系统周报</CardTitle></CardHeader><CardContent><Text tone="muted">本周新增 8 个表单组件文档，并完成消费者项目接入验证。</Text></CardContent><CardFooter><Button size="sm" variant="outline">查看详情</Button></CardFooter></Card>
}
