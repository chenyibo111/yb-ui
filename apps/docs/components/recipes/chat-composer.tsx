"use client"

import { useState } from "react"

import { Button, Field, Stack, Text, Textarea } from "@chenyibo111/ui"

export function ChatComposerRecipe() {
  const [message, setMessage] = useState("")
  const [sending, setSending] = useState(false)
  const [sentMessage, setSentMessage] = useState("")

  async function sendMessage() {
    if (!message.trim() || sending) return

    setSending(true)
    await new Promise((resolve) => window.setTimeout(resolve, 120))
    setSentMessage(message.trim())
    setMessage("")
    setSending(false)
  }

  return (
    <Stack gap="4">
      <Field description="Enter 发送；Shift + Enter 换行。" label="回复客户">
        <Textarea
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault()
              void sendMessage()
            }
          }}
          placeholder="输入一条回复…"
          value={message}
        />
      </Field>
      <div>
        <Button disabled={!message.trim()} loading={sending} onClick={() => void sendMessage()}>
          发送回复
        </Button>
      </div>
      {sentMessage ? <Text tone="muted">已发送：{sentMessage}</Text> : null}
    </Stack>
  )
}
