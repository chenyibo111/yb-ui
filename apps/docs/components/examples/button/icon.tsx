"use client"

import { AddIcon } from "@yb/icons"
import { IconButton } from "@yb/ui"

export function ButtonIconExample() {
  return (
    <IconButton aria-label="新增项目">
      <AddIcon aria-hidden="true" />
    </IconButton>
  )
}
