"use client"

import { Field, Input } from "@chenyibo111/ui"

export function FieldErrorExample() {
  return (
    <Field
      description="请使用公司邮箱，格式如 name@example.com。"
      error="请输入有效的工作邮箱地址。"
      label="工作邮箱"
      required
    >
      <Input defaultValue="yb-ui.example" type="email" />
    </Field>
  )
}
