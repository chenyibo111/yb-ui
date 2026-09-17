"use client"

import { useState } from "react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@chenyibo111/ui"

export function SelectControlledExample() {
  const [priority, setPriority] = useState("")

  return (
    <Select onValueChange={setPriority} value={priority}>
      <SelectTrigger aria-label="处理优先级">
        <SelectValue placeholder="选择优先级" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="high">高</SelectItem>
        <SelectItem value="medium">中</SelectItem>
        <SelectItem value="low">低</SelectItem>
      </SelectContent>
    </Select>
  )
}
