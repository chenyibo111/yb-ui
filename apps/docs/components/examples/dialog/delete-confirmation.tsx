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
} from "@chenyibo111/ui"

export function DeleteConfirmationExample() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">删除项目</Button>
      </DialogTrigger>
      <DialogContent>
        <Stack gap="4">
          <div>
            <DialogTitle>确认删除项目？</DialogTitle>
            <DialogDescription>此操作无法撤销，项目中的所有数据将被永久移除。</DialogDescription>
          </div>
          <Stack direction="horizontal" gap="2" justify="end">
            <DialogClose asChild>
              <Button variant="secondary">取消</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="destructive">确认删除</Button>
            </DialogClose>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
