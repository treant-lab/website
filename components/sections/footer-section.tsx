"use client"

import { useTranslations } from "next-intl"

// Brand marks aren't in lucide-react, so they're inline SVG. Sized 18px to sit
// level with the 14px legal links.
const LinkedInIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.75-1.95 4 0 4.75 2.5 4.75 5.75V21h-4v-5.6c0-1.34-.03-3.07-1.9-3.07-1.9 0-2.2 1.46-2.2 2.97V21h-4z" />
  </svg>
)
const GitHubIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
  </svg>
)
const XIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.22-6.82-5.97 6.82H1.66l7.73-8.84L1.24 2.25h6.83l4.71 6.23zm-1.16 17.52h1.83L7.01 4.13H5.05z" />
  </svg>
)

// Verified against the repo's git remote (org is treant-lab, not treantlab) and
// a live check of the LinkedIn company page.
const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/treantlab", Icon: LinkedInIcon },
  { label: "GitHub", href: "https://github.com/treant-lab", Icon: GitHubIcon },
  { label: "X", href: "https://x.com/treantlab", Icon: XIcon },
]

// Minimal footer. Copy comes from the existing Footer.* i18n block (already
// present in both locales); the phone/email/cnpj strings are stored with their
// labels baked in ("Telefone: ...") so they render as-is.
//
// Deliberately quiet: one hairline rule, legal links inline, no columns and no
// repeated nav — the contact form directly above is the real end of the page.

export function FooterSection() {
  const t = useTranslations("Footer")
  const year = new Date().getFullYear()

  const legal = [
    { key: "privacy_policy", href: "#" },
    { key: "terms_of_use", href: "#" },
    { key: "cookie_policy", href: "#" },
  ]

  return (
    <footer className="relative border-t border-white/[0.07]">
      <div className="mx-auto max-w-[1180px] px-8 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Wordmark + contact details */}
          <div>
            <div className="text-[20px] font-semibold tracking-tight">
              Treant<span className="text-emerald-400">Lab</span>
            </div>
            <div className="mt-4 space-y-1.5 text-[14px] leading-relaxed text-gray-400">
              <p>
                <a
                  href="mailto:contato@treantlab.org"
                  className="transition-colors hover:text-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60"
                >
                  {t("email")}
                </a>
              </p>
              <p>
                <a
                  href="tel:+5515996988717"
                  className="transition-colors hover:text-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60"
                >
                  {t("phone")}
                </a>
              </p>
              <p>{t("cnpj")}</p>
            </div>
          </div>

          {/* Social + legal */}
          <div className="flex flex-col gap-6 md:items-end">
            <nav className="flex gap-2" aria-label="Social">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-gray-400 transition-all duration-300 hover:border-emerald-400 hover:text-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </nav>

            <nav className="flex flex-wrap gap-x-7 gap-y-2 md:justify-end">
              {legal.map(({ key, href }) => (
                <a
                  key={key}
                  href={href}
                  className="text-[14px] text-gray-400 transition-colors hover:text-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60"
                >
                  {t(key)}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <p className="mt-12 border-t border-white/[0.07] pt-6 text-[13px] text-gray-500">
          {t("copyright", { year })}
        </p>
      </div>
    </footer>
  )
}
