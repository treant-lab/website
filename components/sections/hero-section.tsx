"use client"

import type { CSSProperties } from "react"
import { useTranslations } from "next-intl"
import { ArrowRight } from "lucide-react"
import { LetterGlitch } from "@/components/ui/letter-glitch"
import { MobileMenu } from "@/components/ui/mobile-menu"

// Approved in design lab: LetterGlitch background, emerald low-key palette,
// opacity 0.75 / scrim 0.58 / speed 20ms. Nav is nested INSIDE the section so the
// canvas renders behind it (as a sibling it would start below the header).
const GLITCH_COLORS = ["#082f21", "#12503a", "#22b573"]
const GLITCH_OPACITY = 0.75
const GLITCH_SPEED = 20
/** Bottom 20% of the canvas fades to black so the section blends into the page. */
const GLITCH_BOTTOM_FADE = 0.2

export interface NavItem {
  id: string
  label: string
}

interface HeroSectionProps {
  navItems: NavItem[]
  onNavigate: (id: string) => void
  /** Called when the glitch canvas paints — drives the loader dismissal. */
  onGlitchReady?: () => void
  /** Set once the loader is gone; starts the staggered entrance. */
  revealed?: boolean
}

export function HeroSection({ navItems, onNavigate, onGlitchReady, revealed = false }: HeroSectionProps) {
  const t = useTranslations()

  return (
    <section
      id="home"
      className={`relative flex min-h-[100svh] flex-col ${revealed ? "is-revealed" : ""}`}
    >
      {/* Background layers */}
      <div className="reveal-fade absolute inset-0 overflow-hidden">
        <LetterGlitch
          glitchColors={GLITCH_COLORS}
          glitchSpeed={GLITCH_SPEED}
          opacity={GLITCH_OPACITY}
          outerVignette
          centerVignette={false}
          bottomFade={GLITCH_BOTTOM_FADE}
          onReady={onGlitchReady}
        />
      </div>
      {/* Scrim keeps the headline legible over the canvas noise (0.58 approved) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(6,8,7,.58), rgba(6,8,7,.46), rgba(6,8,7,1))",
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-emerald-600/[0.10] blur-[140px]" />

      {/* Transparent nav — inside the section, above the canvas */}
      <nav className="reveal sticky top-0 z-20 bg-transparent" style={{ "--reveal-delay": "150ms" } as CSSProperties}>
        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-8 py-6">
          <div className="nav-legible text-[20px] font-semibold tracking-tight">
            Treant<span className="text-emerald-400">Lab</span>
          </div>

          <div className="hidden items-center gap-9 md:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  onNavigate(item.id)
                }}
                className="nav-legible group relative text-[16px] text-white/90 transition-colors hover:text-white"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-emerald-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <MobileMenu
            items={navItems.map((n) => ({ label: n.label, href: `#${n.id}` }))}
            onNavigate={onNavigate}
          />
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1180px] flex-1 flex-col justify-center px-8 pb-32 pt-12 text-center lg:pt-20">
        <h1 className="reveal mx-auto max-w-4xl text-[3rem] font-semibold leading-[1.02] tracking-[-0.035em] lg:text-[5rem]" style={{ "--reveal-delay": "300ms" } as CSSProperties}>
          {t("Hero.title_part1")}{" "}
          <span className="text-emerald-400">{t("Hero.highlight")}</span>
        </h1>
        <p className="reveal mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-gray-400 lg:text-xl" style={{ "--reveal-delay": "450ms" } as CSSProperties}>
          {t("Hero.description")}
        </p>
        <div className="reveal mt-16 flex justify-center" style={{ "--reveal-delay": "600ms" } as CSSProperties}>
          <button
            onClick={() => onNavigate("contact")}
            className="group inline-flex items-center gap-2.5 rounded-lg border border-white/15 bg-black px-8 py-4 text-[15px] font-medium text-white transition-all duration-300 hover:border-emerald-400 hover:text-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060807]"
          >
            {t("Hero.schedule_consultation")}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </section>
  )
}
