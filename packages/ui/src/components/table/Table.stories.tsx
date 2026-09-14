import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow } from "./Table"
export default { title:"数据展示 / Table",component:Table }
export const Default={render:()=> <Table><TableHeader><TableRow><TableHead>项目</TableHead><TableHead>状态</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell>YB UI</TableCell><TableCell>进行中</TableCell></TableRow></TableBody></Table>}
