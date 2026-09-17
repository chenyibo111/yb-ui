"use client"

import { AddIcon } from "@chenyibo111/icons"
import { IconButton, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@chenyibo111/ui"

export function TooltipIconButtonExample() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <IconButton aria-label="创建项目" variant="outline">
            <AddIcon aria-hidden="true" />
          </IconButton>
        </TooltipTrigger>
        <TooltipContent>创建项目</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
