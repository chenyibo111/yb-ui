"use client"

import { Badge, Stack } from "@chenyibo111/ui"

export function BadgeBasicExample() {
  return (
    <Stack direction="horizontal" gap="3">
      <Badge>草稿</Badge>
      <Badge variant="success">已启用</Badge>
      <Badge variant="warning">待确认</Badge>
      <Badge variant="destructive">已阻塞</Badge>
    </Stack>
  )
}
