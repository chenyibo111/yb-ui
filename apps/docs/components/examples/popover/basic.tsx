"use client"

import { Button, Popover, PopoverContent, PopoverTrigger, Stack, Text } from "@chenyibo111/ui"

export function PopoverExample() {
  return <Popover><PopoverTrigger asChild><Button variant="outline">查看说明</Button></PopoverTrigger><PopoverContent><Stack gap="2"><Text weight="semibold">发布前检查</Text><Text size="sm" tone="muted">确认负责人、日期和通知范围已设置。</Text></Stack></PopoverContent></Popover>
}
