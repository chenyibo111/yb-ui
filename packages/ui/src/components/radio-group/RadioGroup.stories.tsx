import { RadioGroup, RadioGroupItem } from "./RadioGroup"

export default { title: "表单 / RadioGroup", component: RadioGroup }
export const Default = { render: () => <RadioGroup defaultValue="team"><RadioGroupItem aria-label="团队可见" value="team" /><RadioGroupItem aria-label="仅自己可见" value="private" /></RadioGroup> }
