"use client"

import { Field, Textarea } from "@chenyibo111/ui"

export function TextareaBasicExample() {
  return (
    <Field description="最多 500 个字符，用于补充任务背景。" label="任务说明">
      <Textarea placeholder="描述这项任务的目标和限制" rows={4} />
    </Field>
  )
}
