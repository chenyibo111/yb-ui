"use client"

import { Switch, Text } from "@chenyibo111/ui"

export function SwitchBasicExample() {
  return (
    <label className="yb-docs-inline-control">
      <Switch aria-label="任务完成后通知我" defaultChecked />
      <Text>任务完成后通知我</Text>
    </label>
  )
}
