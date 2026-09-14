import { DayPicker } from "react-day-picker"
import { enUS, zhCN } from "date-fns/locale"
import { useYBLocale } from "../../provider/YBProvider"
export type CalendarProps=any
export function Calendar({locale,...props}:CalendarProps){const yb=useYBLocale();return <DayPicker locale={locale??(yb.code==="zh-CN"?zhCN:enUS)} {...props}/>}
