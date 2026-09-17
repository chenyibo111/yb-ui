"use client"

import { useState } from "react"

import { Pagination, Stack, Text } from "@chenyibo111/ui"

export function PaginationExample() {
  const [page, setPage] = useState(2)
  return <Stack gap="3"><Pagination onPageChange={setPage} page={page} pageCount={4} /><Text size="sm" tone="muted">当前第 {page} 页</Text></Stack>
}
