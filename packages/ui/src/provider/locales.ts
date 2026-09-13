import type { YBLocale } from "./locale"

export const zhCN: YBLocale = {
  code: "zh-CN",
  pagination: {
    previous: "上一页",
    next: "下一页",
    page: (page) => `第 ${page} 页`,
  },
  calendar: {
    chooseDate: "选择日期",
    chooseRange: "选择日期范围",
    clear: "清除",
    previousMonth: "上个月",
    nextMonth: "下个月",
  },
  actions: {
    close: "关闭",
  },
}

export const enUS: YBLocale = {
  code: "en-US",
  pagination: {
    previous: "Previous page",
    next: "Next page",
    page: (page) => `Page ${page}`,
  },
  calendar: {
    chooseDate: "Choose date",
    chooseRange: "Choose date range",
    clear: "Clear",
    previousMonth: "Previous month",
    nextMonth: "Next month",
  },
  actions: {
    close: "Close",
  },
}

export const locales = {
  "zh-CN": zhCN,
  "en-US": enUS,
} as const
