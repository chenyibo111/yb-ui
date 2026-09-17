"use client"

import { Checkbox, Stack, Text } from "@chenyibo111/ui"

export function CheckboxBasicExample() {
  return (
    <Stack gap="3">
      <label className="yb-docs-inline-control">
        <Checkbox defaultChecked />
        <Text>接收产品更新邮件</Text>
      </label>
      <label className="yb-docs-inline-control">
        <Checkbox />
        <Text>同步通知给项目成员</Text>
      </label>
    </Stack>
  )
}
