import { createContext, useContext, type PropsWithChildren } from "react"

import { locales } from "./locales"
import type { YBLocale, YBLocaleInput } from "./locale"

const YBLocaleContext = createContext<YBLocale>(locales["zh-CN"])

export type YBProviderProps = PropsWithChildren<{
  locale?: YBLocaleInput
}>

function resolveLocale(locale?: YBLocaleInput): YBLocale {
  if (!locale) return locales["zh-CN"]

  return typeof locale === "string" ? locales[locale] : locale
}

export function YBProvider({ children, locale }: YBProviderProps) {
  return (
    <YBLocaleContext.Provider value={resolveLocale(locale)}>
      {children}
    </YBLocaleContext.Provider>
  )
}

export function useYBLocale() {
  return useContext(YBLocaleContext)
}
