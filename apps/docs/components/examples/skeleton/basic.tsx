"use client"

import { Skeleton, Stack } from "@chenyibo111/ui"

export function SkeletonBasicExample() {
  return (
    <Stack gap="3">
      <Skeleton style={{ height: "var(--yb-space-6)", width: "calc(var(--yb-space-10) * 5)" }} />
      <Skeleton style={{ height: "var(--yb-space-4)", width: "calc(var(--yb-space-10) * 7)" }} />
      <Skeleton style={{ height: "var(--yb-space-4)", width: "calc(var(--yb-space-10) * 4)" }} />
    </Stack>
  )
}
