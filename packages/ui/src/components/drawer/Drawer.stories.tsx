import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "./Drawer"
export default { title: "反馈 / Drawer", component: Drawer }
export const Right={render:()=> <Drawer><DrawerTrigger>打开筛选</DrawerTrigger><DrawerContent side="right"><DrawerTitle>筛选条件</DrawerTitle></DrawerContent></Drawer>}
