"use client"

import { Badge, Stack, Text } from "@chenyibo111/ui"

export function StackExample() {
  return <Stack align="center" direction="horizontal" gap="3"><Badge variant="success">已启用</Badge><Text>通知规则将在下一次任务运行时生效。</Text></Stack>
}
