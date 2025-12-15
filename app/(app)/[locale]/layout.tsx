import type { ReactNode } from "react"
import type { Metadata, Viewport } from "next"
import { NextIntlClientProvider } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { Inter } from "next/font/google"
import { locales, type Locale } from "@/i18n"
import "../../globals.css"

async function getMessagesForLocale(locale: Locale) {
  return (await import(`@/messages/${locale}.json`)).default
}

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://treantlab.github.io/website"),
  title: "TreantLab - Cybersecurity Specialists",
  description: "Specialists in cybersecurity offering advanced pentest, threat intelligence, and strategic consulting solutions for companies that take security seriously.",
  keywords: ["cybersecurity", "pentest", "threat intelligence", "devsecops", "security", "hacking", "penetration testing"],
  authors: [{ name: "TreantLab" }],
  creator: "TreantLab",
  publisher: "TreantLab",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://treantlab.org",
    siteName: "TreantLab",
    title: "TreantLab - Cybersecurity Specialists",
    description: "Advanced pentest, threat intelligence, and strategic consulting solutions.",
    images: [
      {
        url: "/static/logo.svg",
        width: 1200,
        height: 630,
        alt: "TreantLab - Cybersecurity",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TreantLab - Cybersecurity Specialists",
    description: "Advanced pentest, threat intelligence, and strategic consulting solutions.",
    images: ["/static/logo.svg"],
    creator: "@treantlab",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/static/logo_head.png",
    apple: "/static/logo_head.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#10b981",
  width: "device-width",
  initialScale: 1,
}

// Generate static params for all locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

type Props = {
  children: ReactNode
  params: { locale: string }
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  // Enable static rendering
  setRequestLocale(locale)
  const messages = await getMessagesForLocale(locale as Locale)

  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}
