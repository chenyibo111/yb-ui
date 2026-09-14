import { Calendar } from "./Calendar"
export default {title:"日期 / Calendar",component:Calendar}
export const Single={args:{mode:"single",defaultMonth:new Date(2026,8,1)}}
export const Range={args:{mode:"range",defaultMonth:new Date(2026,8,1)}}
