import { Toast, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "./Toast"
export default { title: "反馈 / Toast", component: Toast }
export const Default={render:()=> <ToastProvider><Toast open><ToastTitle>已保存</ToastTitle><ToastDescription>项目配置已更新。</ToastDescription></Toast><ToastViewport/></ToastProvider>}
