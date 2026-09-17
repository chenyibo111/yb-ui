"use client"

import { useState } from "react"

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Stack,
  Text,
} from "@chenyibo111/ui"

export function ConfirmDestructiveActionRecipe() {
  const [deleted, setDeleted] = useState(false)

  return (
    <Stack gap="4">
      <Text>{deleted ? "项目已删除。" : "项目仍会保留。"}</Text>
      <Dialog>
        <DialogTrigger asChild>
          <Button disabled={deleted} variant="destructive">
            删除项目
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Stack gap="4">
            <div>
              <DialogTitle>确认删除项目？</DialogTitle>
              <DialogDescription>删除后无法恢复，请确认没有成员仍在使用该项目。</DialogDescription>
            </div>
            <Stack gap="2">
              <DialogClose asChild>
                <Button onClick={() => setDeleted(true)} variant="destructive">
                  确认删除
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button variant="outline">取消</Button>
              </DialogClose>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    </Stack>
  )
}
