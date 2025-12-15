import { getRequestConfig } from "next-intl/server"

export const locales = ["en", "pt"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "pt"

export default getRequestConfig(async ({ locale }) => {
  // Use a valid locale or fall back to default
  const validLocale = locales.includes(locale as any) ? locale : defaultLocale

  return {
    messages: (await import(`./messages/${validLocale}.json`)).default,
    locale: validLocale as string
  }
})
