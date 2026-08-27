"use client"

import { useCallback } from "react"
import { useTranslations } from "next-intl"
import { HeroSection, type NavItem } from "@/components/sections/hero-section"
import { ServicesSection } from "@/components/sections/services-section"
import { CaseStudiesSection } from "@/components/sections/case-studies-section"
import { ContactSection } from "@/components/sections/contact-section"
import { FooterSection } from "@/components/sections/footer-section"
import { ScrollProgress } from "@/components/ui/scroll-progress"

export default function Home() {
  const t = useTranslations()

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
      <ScrollProgress />
      <HeroSection navItems={navItems} onNavigate={scrollToSection} />
      <ServicesSection />
      <CaseStudiesSection />
      <ContactSection />
      <FooterSection />
    </main>
  )
}
