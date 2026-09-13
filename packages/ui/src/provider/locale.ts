export type YBLocaleCode = "zh-CN" | "en-US"

export type YBLocale = {
  code: YBLocaleCode
  pagination: {
    previous: string
    next: string
    page: (page: number) => string
  }
  calendar: {
    chooseDate: string
    chooseRange: string
    clear: string
    previousMonth: string
    nextMonth: string
  }
  actions: {
    close: string
  }
}

export type YBLocaleInput = YBLocale | YBLocaleCode
