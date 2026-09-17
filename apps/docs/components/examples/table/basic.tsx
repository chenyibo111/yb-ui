"use client"

import { Badge, Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@chenyibo111/ui"

export function TableExample() {
  return <Table><TableCaption>项目状态</TableCaption><TableHeader><TableRow><TableHead>项目</TableHead><TableHead>状态</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell>YB UI 文档站</TableCell><TableCell><Badge variant="success">已启用</Badge></TableCell></TableRow><TableRow><TableCell>智能客服</TableCell><TableCell><Badge variant="warning">待验证</Badge></TableCell></TableRow></TableBody></Table>
}
