"use client"

import { Button, Spinner, Stack, Text } from "@chenyibo111/ui"

export function LoadingFeedbackExample() {
  return (
    <Stack direction="horizontal" gap="4">
      <Button loading>保存更改</Button>
      <Stack align="center" direction="horizontal" gap="2">
        <Spinner label="正在同步数据" />
        <Text tone="muted">正在同步数据</Text>
      </Stack>
    </Stack>
  )
}
