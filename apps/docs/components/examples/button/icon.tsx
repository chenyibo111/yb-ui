"use client"

import { AddIcon } from "@chenyibo111/icons"
import { IconButton } from "@chenyibo111/ui"

export function ButtonIconExample() {
  return (
    <IconButton aria-label="新增项目">
      <AddIcon aria-hidden="true" />
    </IconButton>
  )
}
