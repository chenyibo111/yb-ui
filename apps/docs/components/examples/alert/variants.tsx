"use client"

import { Alert, AlertDescription, AlertTitle, Stack } from "@chenyibo111/ui"

export function AlertVariantsExample() {
  return (
    <Stack gap="3">
      <Alert variant="info">
        <AlertTitle>可共享给团队</AlertTitle>
        <AlertDescription>项目成员可以查看本次变更。</AlertDescription>
      </Alert>
      <Alert variant="success">
        <AlertTitle>配置已保存</AlertTitle>
        <AlertDescription>新的通知规则将在下一次任务运行时生效。</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTitle>还缺少负责人</AlertTitle>
        <AlertDescription>未分配负责人时，任务不会进入自动排期。</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>删除后无法恢复</AlertTitle>
        <AlertDescription>继续前请确认该项目不再需要保留。</AlertDescription>
      </Alert>
    </Stack>
  )
}
