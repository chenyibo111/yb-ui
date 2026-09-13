import { Input } from "../input/Input"
import { Field } from "./Field"

export default { title: "表单 / Field", component: Field }

export const WithDescription = {
  render: () => <Field description="用于页面顶部展示" label="项目名称" required><Input placeholder="输入名称" /></Field>,
}

export const WithError = {
  render: () => <Field error="名称不能为空" label="项目名称" required><Input /></Field>,
}
