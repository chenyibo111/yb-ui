"use client"

import { useState } from "react"

import { Calendar } from "@chenyibo111/ui"

export function CalendarBasicExample() {
  const [selected, setSelected] = useState<Date>()

  return (
    <Calendar
      mode="single"
      onSelect={setSelected}
      selected={selected}
      showOutsideDays
    />
  )
}
