"use client"

import { Button, Empty } from "@chenyibo111/ui"

export function EmptyBasicExample() {
  return (
    <Empty
      action={<Button>新建项目</Button>}
      description="创建第一个项目后，它会显示在这里。"
      title="暂无项目"
    />
  )
}
