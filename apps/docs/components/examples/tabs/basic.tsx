"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger, Text } from "@chenyibo111/ui"

export function TabsExample() {
  return <Tabs defaultValue="overview"><TabsList aria-label="项目设置"><TabsTrigger value="overview">概览</TabsTrigger><TabsTrigger value="members">成员</TabsTrigger></TabsList><TabsContent value="overview"><Text>在这里查看项目的基本设置和进度。</Text></TabsContent><TabsContent value="members"><Text>邀请成员后，他们可以访问该项目。</Text></TabsContent></Tabs>
}
