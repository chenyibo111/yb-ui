import { useState } from "react"
import { format } from "date-fns"
import { Calendar, type CalendarProps } from "../calendar/Calendar"
import { Popover,PopoverContent,PopoverTrigger } from "../popover/Popover"
import { useYBLocale } from "../../provider/YBProvider"
export type DatePickerProps=CalendarProps
export function DatePicker({mode="single",selected,defaultSelected,onSelect,...props}:DatePickerProps){const l=useYBLocale();const [open,setOpen]=useState(false);const [value,setValue]=useState(selected??defaultSelected);const label=mode==="range"?l.calendar.chooseRange:l.calendar.chooseDate;const handle=(next:any)=>{if(selected===undefined)setValue(next);onSelect?.(next);if(mode==="single"||next?.to)setOpen(false)};const text=value instanceof Date?format(value,"yyyy-MM-dd"):label;return <Popover open={open} onOpenChange={setOpen}><PopoverTrigger asChild><button aria-label={label} className="yb-select-trigger">{text}</button></PopoverTrigger><PopoverContent><Calendar mode={mode} onSelect={handle} selected={selected??value} {...props}/></PopoverContent></Popover>}
