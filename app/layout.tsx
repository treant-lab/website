import type { ReactNode } from "react"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server" // Isso é compatível com SSG
import "./globals.css" // Importe o CSS global aqui

type Props = {
  children: ReactNode
  params: { locale: string }
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  // Fornecendo todas as mensagens para o lado do cliente
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}
