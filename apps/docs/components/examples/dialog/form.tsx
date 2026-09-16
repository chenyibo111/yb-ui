"use client"

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Field,
  Input,
  Stack,
} from "@chenyibo111/ui"

export function DialogFormExample() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>新建项目</Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={(event) => event.preventDefault()}>
          <Stack gap="4">
            <div>
              <DialogTitle>新建项目</DialogTitle>
              <DialogDescription>填写名称后即可创建项目。</DialogDescription>
            </div>
            <Field label="项目名称" required>
              <Input autoFocus placeholder="例如：设计系统升级" />
            </Field>
            <Stack direction="horizontal" gap="2" justify="end">
              <DialogClose asChild>
                <Button type="button" variant="secondary">取消</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="submit">创建项目</Button>
              </DialogClose>
            </Stack>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  )
}
