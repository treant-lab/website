"use client"

import { useTranslations } from "next-intl"

// Approved in design lab: 3 cards in one row, wider container (1480) than the
// section header (1180), hover lift + emerald border/glow.
//
// NOTE: quotes are placeholders. Real testimonials need written client approval
// before this ships — see CaseStudies.items in messages/*.json.

interface CaseStudy {
  id: string
}

const CASES: CaseStudy[] = [
  { id: "fintech" },
  { id: "exchange" },
  { id: "health" },
]

export function CaseStudiesSection() {
  const t = useTranslations("CaseStudies")

  return (
    <section id="cases" className="relative">
      <div className="mx-auto max-w-[1180px] px-8 pb-16 pt-40">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-24">
          <h2 className="max-w-[20ch] text-balance text-[3.75rem] font-light leading-[1.04] tracking-[-0.035em] text-white lg:text-[5rem]">
            {t("section_title")}
          </h2>
          <p className="text-[23px] font-light leading-[1.5] text-white lg:pt-[1.25rem]">
            {t("section_subtitle")}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1480px] px-8 pb-40">
        <div className="grid gap-5 lg:grid-cols-3">
          {CASES.map((c) => {
            const item = t.raw(`items.${c.id}`) as {
              quote: string
              client: string
              role: string
              sector: string
            }
            return (
              <article
                key={c.id}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.02] p-10 transition-all duration-500 hover:-translate-y-1 hover:border-emerald-500/30 hover:bg-white/[0.04] hover:shadow-[0_24px_60px_-24px] hover:shadow-emerald-500/25"
              >
                <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <p className="text-[21px] font-light leading-[1.5] text-white">{item.quote}</p>
                <div className="mt-9 flex items-center gap-4 border-t border-white/[0.07] pt-7 transition-colors duration-500 group-hover:border-emerald-500/20">
                  <span className="h-9 w-9 shrink-0 rounded-full border border-white/10 bg-white/[0.04] transition-colors duration-500 group-hover:border-emerald-500/30" />
                  <span>
                    <span className="block text-[15px] text-white">{item.client}</span>
                    <span className="block text-[13px] text-gray-500">
                      {item.role} · {item.sector}
                    </span>
                  </span>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
