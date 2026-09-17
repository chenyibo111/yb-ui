"use client"

import { RadioGroup, RadioGroupItem, Stack, Text } from "@chenyibo111/ui"

export function RadioGroupBasicExample() {
  return (
    <RadioGroup aria-label="项目可见范围" defaultValue="team">
      <Stack gap="3">
        <label className="yb-docs-inline-control">
          <RadioGroupItem value="team" />
          <Text>团队成员可见</Text>
        </label>
        <label className="yb-docs-inline-control">
          <RadioGroupItem value="private" />
          <Text>仅自己可见</Text>
        </label>
      </Stack>
    </RadioGroup>
  )
}
