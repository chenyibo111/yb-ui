"use client"

import { useState } from "react"

import {
  Button,
  Toast,
  ToastAction,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@chenyibo111/ui"

export function ToastTriggerExample() {
  const [open, setOpen] = useState(false)

  return (
    <ToastProvider>
      <Button onClick={() => setOpen(true)} variant="outline">显示保存提示</Button>
      <Toast onOpenChange={setOpen} open={open}>
        <ToastTitle>项目已保存</ToastTitle>
        <ToastDescription>新设置已经应用到下次任务运行。</ToastDescription>
        <ToastAction altText="撤销本次保存">撤销</ToastAction>
      </Toast>
      <ToastViewport />
    </ToastProvider>
  )
}
