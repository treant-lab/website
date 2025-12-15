import createMiddleware from "next-intl/middleware"
import { locales, defaultLocale } from "./i18n"

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always", // Always show locale in URL for SSG
})

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}