"use client"

import { useTranslations } from "next-intl"
import type { ComponentType, SVGProps } from "react"

// Approved in design lab (variant S2): split header + 3x2 bordered rows.
// Thin 1.5px stroke icons — the legacy /static/*.svg art is far too heavy for these rows.

type IconProps = SVGProps<SVGSVGElement>

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
}

const PentestIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" {...stroke} {...p}>
    <path d="M12 3 4 6v6c0 5 3.4 7.6 8 9 4.6-1.4 8-4 8-9V6z" />
    <path d="m9.5 12 2 2 3.5-4" />
  </svg>
)
const IntelIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" {...stroke} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
    <path d="M11 8v3l2 2" />
  </svg>
)
const DevSecOpsIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" {...stroke} {...p}>
    <path d="M8 6 3 12l5 6" />
    <path d="m16 6 5 6-5 6" />
    <path d="M13 4l-2 16" />
  </svg>
)
const TrainingIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" {...stroke} {...p}>
    <path d="M3 7l9-4 9 4-9 4z" />
    <path d="M7 10v5c0 1.5 2.2 3 5 3s5-1.5 5-3v-5" />
  </svg>
)
const IncidentIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" {...stroke} {...p}>
    <path d="M12 3v4" /><path d="M12 17v4" />
    <path d="M3 12h4" /><path d="M17 12h4" />
    <circle cx="12" cy="12" r="4" />
  </svg>
)
const ComplianceIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" {...stroke} {...p}>
    <path d="M6 3h9l3 3v15H6z" />
    <path d="M9 9h6" /><path d="M9 13h6" /><path d="M9 17h3" />
  </svg>
)

interface ServiceRow {
  /** i18n key under Services.* */
  titleKey: string
  Icon: ComponentType<IconProps>
}

// NOTE: incident_response_title and compliance_title need adding to messages/*.json.
const SERVICES: ServiceRow[] = [
  { titleKey: "advanced_pentest_title", Icon: PentestIcon },
  { titleKey: "threat_intelligence_title", Icon: IntelIcon },
  { titleKey: "devsecops_title", Icon: DevSecOpsIcon },
  { titleKey: "specialized_training_title", Icon: TrainingIcon },
  { titleKey: "incident_response_title", Icon: IncidentIcon },
  { titleKey: "compliance_title", Icon: ComplianceIcon },
]

export function ServicesSection() {
  const t = useTranslations("Services")

  return (
    <section id="services" className="relative">
      <div className="mx-auto max-w-[1180px] px-8 py-40">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-24">
          <div>
            <h2 className="max-w-[20ch] text-balance text-[3.75rem] font-light leading-[1.04] tracking-[-0.035em] text-white lg:text-[5rem]">
              {t("headline")}
            </h2>
          </div>
          <p className="text-[23px] font-light leading-[1.5] text-white lg:pt-[1.25rem]">
            {t("headline_description")}
          </p>
        </div>

        <div className="mt-24 grid border-t border-white/[0.07] md:grid-cols-2">
          {SERVICES.map(({ titleKey, Icon }) => (
            <a
              key={titleKey}
              href="#contact"
              className="group relative flex items-center gap-5 border-b border-white/[0.07] px-8 py-7 transition-all duration-300 hover:bg-emerald-500/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-500/60 md:odd:border-r"
            >
              <Icon className="h-7 w-7 shrink-0 text-gray-400 transition-all duration-300 group-hover:scale-110 group-hover:text-emerald-400" />
              <span className="text-[20px] text-white transition-all duration-300 group-hover:translate-x-1">
                {t(titleKey)}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
