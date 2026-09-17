"use client"

import { Separator, Stack, Text } from "@chenyibo111/ui"

export function SeparatorExample() {
  return <Stack gap="3"><Text weight="semibold">项目概览</Text><Separator /><Text tone="muted">最后更新于今天 15:30。</Text></Stack>
}
