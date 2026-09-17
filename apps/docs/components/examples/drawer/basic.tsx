"use client"

import { Button, Drawer, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger, Stack, Text } from "@chenyibo111/ui"

export function DrawerExample() {
  return (
    <Drawer>
      <DrawerTrigger asChild><Button variant="outline">打开项目详情</Button></DrawerTrigger>
      <DrawerContent side="right">
        <Stack gap="4">
          <div><DrawerTitle>项目详情</DrawerTitle><DrawerDescription>在不离开当前列表的情况下查看补充信息。</DrawerDescription></div>
          <Text tone="muted">这里适合较长的辅助内容和后续操作。</Text>
        </Stack>
      </DrawerContent>
    </Drawer>
  )
}
