import { useState } from "react"
import { AddIcon } from "@yb/icons"
import { Button, DatePicker, Dialog, DialogContent, DialogTitle, DialogTrigger, Field, Input, Pagination, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, YBProvider } from "@yb/ui"

function ConsumerScreen() {
  const [page, setPage] = useState(1)
  return <main style={{ display: "grid", gap: 24, margin: "0 auto", maxWidth: 960, padding: 32 }}><header><h1>YB UI Playground</h1><p>公开包入口的消费者集成验证。</p></header><section style={{ display: "flex", gap: 12 }}><Button><AddIcon aria-hidden="true" size={16} />新建项目</Button><Button variant="secondary">保存</Button><Dialog><DialogTrigger asChild><Button variant="outline">打开设置</Button></DialogTrigger><DialogContent><DialogTitle>项目设置</DialogTitle><p>该对话框来自公开 API。</p></DialogContent></Dialog></section><section style={{ display: "grid", gap: 16, maxWidth: 420 }}><Field description="用于识别项目" label="项目名称" required><Input placeholder="输入项目名称" /></Field><Select defaultValue="active"><SelectTrigger aria-label="项目状态"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="active">进行中</SelectItem><SelectItem value="draft">草稿</SelectItem></SelectContent></Select><DatePicker mode="single" /></section><Table><TableHeader><TableRow><TableHead>项目</TableHead><TableHead>状态</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell>YB UI</TableCell><TableCell>进行中</TableCell></TableRow></TableBody></Table><Pagination onPageChange={setPage} page={page} pageCount={3} /></main>
}
export function App() { return <YBProvider locale="zh-CN"><ConsumerScreen /></YBProvider> }
