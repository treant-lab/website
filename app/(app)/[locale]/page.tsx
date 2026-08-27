"use client"

import { useCallback, useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { HeroSection, type NavItem } from "@/components/sections/hero-section"
import { ServicesSection } from "@/components/sections/services-section"
import { CaseStudiesSection } from "@/components/sections/case-studies-section"
import { ContactSection } from "@/components/sections/contact-section"
import { FooterSection } from "@/components/sections/footer-section"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import { PageLoader } from "@/components/ui/page-loader"

/** Mirrors FADE_MS in components/ui/page-loader.tsx. */
const LOADER_FADE_MS = 500

export default function Home() {
  const t = useTranslations()
  // The hero canvas reports its first paint; that dismisses the loader, and the
  // dismissal is what starts the hero's staggered entrance.
  const [glitchReady, setGlitchReady] = useState(false)
  const [revealed, setRevealed] = useState(false)

  const handleGlitchReady = useCallback(() => setGlitchReady(true), [])

  useEffect(() => {
    // Hold the entrance until the loader has actually faded out, otherwise the
    // stagger plays behind the overlay and the hero is already settled on reveal.
    // LOADER_FADE_MS mirrors FADE_MS in page-loader.tsx.
    if (!glitchReady) return
    const t = setTimeout(() => setRevealed(true), LOADER_FADE_MS)
    return () => clearTimeout(t)
  }, [glitchReady])

  useEffect(() => {
    // Safety net: reveal even if the canvas never reports in.
    const t = setTimeout(() => setRevealed(true), 4000)
    return () => clearTimeout(t)
  }, [])

  const navItems: NavItem[] = [
    { id: "home", label: t("Navigation.home") },
    { id: "services", label: t("Navigation.services") },
    { id: "cases", label: t("CaseStudies.section_title") },
    { id: "about", label: t("Navigation.about") },
    { id: "contact", label: t("Navigation.contact") },
  ]

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  return (
    // Opaque surface: globals.css paints a fixed background image on <body>,
    // which would otherwise show through the LetterGlitch canvas.
    <main className="relative min-h-screen bg-[#060807] text-white">
      <PageLoader ready={glitchReady} />
      <ScrollProgress />
      <HeroSection
        navItems={navItems}
        onNavigate={scrollToSection}
        onGlitchReady={handleGlitchReady}
        revealed={revealed}
      />
      <ServicesSection />
      <CaseStudiesSection />
      <ContactSection />
      <FooterSection />
    </main>
  )
}
