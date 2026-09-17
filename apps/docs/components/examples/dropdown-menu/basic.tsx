"use client"

import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@chenyibo111/ui"

export function DropdownMenuExample() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild><Button aria-label="更多项目操作" variant="outline">更多操作</Button></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>项目操作</DropdownMenuLabel>
        <DropdownMenuGroup><DropdownMenuItem>复制项目链接</DropdownMenuItem><DropdownMenuItem>归档项目</DropdownMenuItem></DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>删除项目</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
