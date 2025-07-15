import type { ReactNode } from "react"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import "./globals.css"

type Props = {
  children: ReactNode
}

// Para builds estáticos sem [locale] na URL, o locale para o build
// será o padrão definido em i18n.ts. Assumimos 'pt' como padrão para o HTML inicial.
const defaultBuildLocale = "pt" // Ajuste para 'en' se o seu idioma padrão de build for inglês

export default async function RootLayout({ children }: Props) {
  // getMessages precisa de um locale. Para o build estático sem [locale] na URL,
  // ele usará o locale padrão para carregar as mensagens no servidor.
  const messages = await getMessages({ locale: defaultBuildLocale })

  return (
    <html lang={defaultBuildLocale}>
      <head>
        <title>TreantLab - Cybersecurity Specialists</title> {/* Título do site adicionado */}
        <link rel="icon" href="/static/logo_head.png" /> {/* Favicon adicionado */}
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}
