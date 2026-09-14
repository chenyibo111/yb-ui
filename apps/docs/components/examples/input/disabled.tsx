"use client"

import { Field, Input } from "@yb/ui"

export function InputDisabledExample() {
  return (
    <Field label="已归档项目">
      <Input disabled value="2026 年度设计系统" readOnly />
    </Field>
  )
}
