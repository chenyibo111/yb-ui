"use client"

import { Button, Stack } from "@yb/ui"

export function ButtonVariantsExample() {
  return (
    <Stack direction="horizontal" gap="2" className="yb-docs-example-row">
      <Button>主要操作</Button>
      <Button variant="secondary">次要操作</Button>
      <Button variant="outline">描边操作</Button>
      <Button variant="ghost">幽灵操作</Button>
      <Button variant="destructive">删除</Button>
    </Stack>
  )
}
