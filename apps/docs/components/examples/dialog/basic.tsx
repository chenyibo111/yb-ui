"use client"

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Stack,
  Text,
} from "@chenyibo111/ui"

export function DialogBasicExample() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">查看发布说明</Button>
      </DialogTrigger>
      <DialogContent>
        <Stack gap="4">
          <div>
            <DialogTitle>发布说明</DialogTitle>
            <DialogDescription>YB UI 组件库本次更新包含新的文档体验。</DialogDescription>
          </div>
          <Text tone="muted">关闭后可以继续浏览其他组件页面。</Text>
          <DialogClose asChild>
            <Button>我知道了</Button>
          </DialogClose>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
