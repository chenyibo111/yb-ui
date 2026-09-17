"use client"

import { Avatar, AvatarFallback, AvatarImage, Stack, Text } from "@chenyibo111/ui"

export function AvatarExample() {
  return <Stack align="center" direction="horizontal" gap="3"><Avatar aria-label="王小明"><AvatarImage alt="王小明" src="/avatar-not-found.png" /><AvatarFallback>王</AvatarFallback></Avatar><Text>王小明</Text></Stack>
}
