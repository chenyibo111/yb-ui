"use client"

import { useState } from "react"

import { Button, Field, Input, Stack } from "@chenyibo111/ui"

export function FieldErrorsRecipe() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const error = submitted && !email.includes("@") ? "请输入有效的工作邮箱地址。" : undefined

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault()
        setSubmitted(true)
      }}
    >
      <Stack gap="4">
        <Field description="我们只会将项目通知发送到这个地址。" error={error} label="工作邮箱" required>
          <Input onChange={(event) => setEmail(event.target.value)} type="email" value={email} />
        </Field>
        <div>
          <Button type="submit">验证邮箱</Button>
        </div>
      </Stack>
    </form>
  )
}
