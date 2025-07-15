import type { ReactNode } from "react"
import { cookies } from "next/headers"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import "./globals.css" // Importe o CSS global aqui

type Props = {
  children: ReactNode
  params: { locale: string }
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  // Lê o cookie do idioma
  const cookieLocale = cookies().get("NEXT_LOCALE")?.value || "pt"
  const messages = await getMessages({ locale: cookieLocale })

  return (
    <html lang={cookieLocale}>
      <body>
        <NextIntlClientProvider locale={cookieLocale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
