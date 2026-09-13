import { Alert, AlertDescription, AlertTitle } from "./Alert"
export default { title: "反馈 / Alert", component: Alert }
export const Destructive={render:()=> <Alert variant="destructive"><AlertTitle>保存失败</AlertTitle><AlertDescription>请检查输入后重试。</AlertDescription></Alert>}
