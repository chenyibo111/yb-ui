"use client"

import { useState } from "react"

import { Alert, AlertDescription, AlertTitle, Button, Field, Input, Stack } from "@chenyibo111/ui"

export function AsyncSubmitRecipe() {
  const [name, setName] = useState("")
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("submitting")
    await new Promise((resolve) => window.setTimeout(resolve, 120))
    setStatus("error")
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Stack gap="4">
        <Field description="失败时保留用户已经输入的内容。" label="项目名称">
          <Input onChange={(event) => setName(event.target.value)} value={name} />
        </Field>
        {status === "error" ? (
          <Alert variant="destructive">
            <AlertTitle>保存未完成</AlertTitle>
            <AlertDescription>保存失败，请稍后重试。</AlertDescription>
          </Alert>
        ) : null}
        <div>
          <Button loading={status === "submitting"} type="submit">
            保存项目
          </Button>
        </div>
      </Stack>
    </form>
  )
}
