"use client"

import { Field, Input, Stack } from "@yb/ui"

export function InputFieldStatesExample() {
  return (
    <Stack gap="4">
      <Field description="用于接收项目通知。" label="通知邮箱">
        <Input type="email" />
      </Field>
      <Field error="请输入有效的邮箱地址" label="工作邮箱" required>
        <Input defaultValue="yb-ui.example" type="email" />
      </Field>
    </Stack>
  )
}
