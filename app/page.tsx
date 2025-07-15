"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, Star, Globe, Lock, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import { GlitchText } from "@/components/glitch-text"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useTranslations } from "next-intl"

// Modificado o array de serviços para incluir os textos dinâmicos da Hero
const servicesData = [
  {
    icon: "/static/pentest_icon.svg",
    titleKey: "Services.advanced_pentest_title",
    descriptionKey: "Services.advanced_pentest_description",
    featuresKeys: [
      "Services.advanced_pentest_features.0",
      "Services.advanced_pentest_features.1",
      "Services.advanced_pentest_features.2",
      "Services.advanced_pentest_features.3",
    ],
    heroCategoryKey: "Hero.category_leader",
    heroTitlePart1Key: "Hero.title_part1",
    heroHighlightKey: "Hero.highlight",
    heroDescriptionKey: "Hero.description",
  },
  {
    icon: "/static/threat_icon.svg",
    titleKey: "Services.threat_intelligence_title",
    descriptionKey: "Services.threat_intelligence_description",
    featuresKeys: [
      "Services.threat_intelligence_features.0",
      "Services.threat_intelligence_features.1",
      "Services.threat_intelligence_features.2",
      "Services.threat_intelligence_features.3",
    ],
    heroCategoryKey: "Hero.category_leader",
    heroTitlePart1Key: "Hero.title_part1",
    heroHighlightKey: "Hero.highlight",
    heroDescriptionKey: "Hero.description",
  },
  {
    icon: "/static/development_icon.svg",
    titleKey: "Services.devsecops_title",
    descriptionKey: "Services.devsecops_description",
    featuresKeys: [
      "Services.devsecops_features.0",
      "Services.devsecops_features.1",
      "Services.devsecops_features.2",
      "Services.devsecops_features.3",
    ],
    heroCategoryKey: "Hero.category_leader",
    heroTitlePart1Key: "Hero.title_part1",
    heroHighlightKey: "Hero.highlight",
    heroDescriptionKey: "Hero.description",
  },
  {
    icon: "/static/training_icon.svg",
    titleKey: "Services.specialized_training_title",
    descriptionKey: "Services.specialized_training_description",
    featuresKeys: [
      "Services.specialized_training_features.0",
      "Services.specialized_training_features.1",
      "Services.specialized_training_features.2",
      "Services.specialized_training_features.3",
    ],
    heroCategoryKey: "Hero.category_leader",
    heroTitlePart1Key: "Hero.title_part1",
    heroHighlightKey: "Hero.highlight",
    heroDescriptionKey: "Hero.description",
  },
]

const statsData = [
  { number: "1500+", labelKey: "Stats.vulnerabilities_found" },
  { number: "99.9%", labelKey: "Stats.soc_uptime" },
  { number: "24/7", labelKey: "Stats.monitoring" },
  { number: "15min", labelKey: "Stats.response_time" },
]

const testimonialsData = [
  {
    name: "Carlos Silva",
    role: "CISO, TechCorp",
    content:
      "A TreantLab transformou nossa postura de segurança. Seus pentests identificaram vulnerabilidades críticas que passaram despercebidas por anos.",
    rating: 5,
  },
  {
    name: "Ana Santos",
    role: "CTO, FinanceSecure",
    content:
      "Profissionalismo excepcional. O time da TreantLab não apenas identifica problemas, mas oferece soluções práticas e implementáveis.",
    rating: 5,
  },
  {
    name: "Roberto Lima",
    role: "Diretor de TI, HealthTech",
    content: "Compliance LGPD e ISO 27001 alcançadas com o suporte especializado da TreantLab. Recomendo fortemente.",
    rating: 5,
  },
]

export default function TreantLabPage() {
  const t = useTranslations()
  const [isLoading, setIsLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const [isNavButtonHovered, setIsNavButtonHovered] = useState(false)
  const [isHeroButtonHovered, setIsHeroButtonHovered] = useState(false)
  const [glitchHeroHighlight, setGlitchHeroHighlight] = useState(false)

  const [activeSection, setActiveSection] = useState<string | null>(null)

  const heroRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLElement>(null)
  const servicesRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const testimonialsRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    const sections = [
      heroRef.current,
      statsRef.current,
      servicesRef.current,
      aboutRef.current,
      testimonialsRef.current,
      contactRef.current,
      footerRef.current,
    ]

    sections.forEach((section) => {
      if (section) {
        observer.observe(section)
      }
    })

    return () => {
      sections.forEach((section) => {
        if (section) {
          observer.unobserve(section)
        }
      })
    }
  }, [])

  const startAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % servicesData.length)
    }, 5000)
  }

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), Math.random() * 1000 + 1000) // 
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    startAutoPlay()
    return () => stopAutoPlay()
  }, [])

  useEffect(() => {
    setGlitchHeroHighlight(true)
    const timer = setTimeout(() => setGlitchHeroHighlight(false), 1000)
    return () => clearTimeout(timer)
  }, [currentSlide])

  const handleSlideInteraction = (index: number) => {
    stopAutoPlay()
    setCurrentSlide(index)
  }

  const handleMouseLeaveCarouselArea = () => {
    if (!intervalRef.current) {
      startAutoPlay()
    }
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="relative overflow-hidden">
          <motion.div
            className="relative"
            animate={{
              rotate: [-1.5, 1.5, -1.5],
            }}
            transition={{
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/static/logo_head.png"
              alt="TreantLab Loader"
              width={200}
              height={200}
              className="relative z-10 block"
              style={{
                filter: "hue-rotate(0deg)",
                animation: "colorShift 5s infinite linear",
              }}
            />

            {/* Glitch Layers - Exatamente como na v6 */}
            <div className="absolute left-0 right-0 top-0 bottom-0 z-20">
              <motion.div
                className="absolute left-0 right-0 top-0 bottom-0 bg-no-repeat bg-center"
                style={{
                  backgroundImage: "url('/static/logo_head.png')",
                  backgroundSize: "200px",
                  transform: "translateX(-4%)",
                }}
                animate={{
                  clipPath: [
                    "polygon(0 0%, 100% 0%, 100% 4%, 0 4%)",
                    "polygon(0 12%, 100% 12%, 100% 12%, 0 12%)",
                    "polygon(0 8%, 100% 8%, 100% 16%, 0 16%)",
                    "polygon(0 2%, 100% 2%, 100% 3%, 0 3%)",
                    "polygon(0 30%, 100% 30%, 100% 30%, 0 30%)",
                    "polygon(0 40%, 100% 40%, 100% 41%, 0 41%)",
                    "polygon(0 45%, 100% 45%, 100% 65%, 0 65%)",
                    "polygon(0 65%, 100% 65%, 100% 65%, 0 65%)",
                    "polygon(0 75%, 100% 75%, 100% 75%, 0 75%)",
                    "polygon(0 45%, 100% 45%, 100% 50%, 0 50%)",
                    "polygon(0 55%, 100% 55%, 100% 65%, 0 65%)",
                  ],
                  filter: [
                    "hue-rotate(0deg)",
                    "hue-rotate(15deg)",
                    "hue-rotate(30deg)",
                    "hue-rotate(45deg)",
                    "hue-rotate(60deg)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
              <motion.div
                className="absolute left-0 right-0 top-0 bottom-0 bg-no-repeat bg-center"
                style={{
                  backgroundImage: "url('/static/logo_head.png')",
                  backgroundSize: "200px",
                  transform: "translateX(2%) translateY(2%)",
                }}
                animate={{
                  clipPath: [
                    "polygon(0 12%, 100% 12%, 100% 25%, 0 25%)",
                    "polygon(0 5%, 100% 5%, 100% 5%, 0 5%)",
                    "polygon(0 6%, 100% 6%, 100% 15%, 0 15%)",
                    "polygon(0 18%, 100% 18%, 100% 18%, 0 18%)",
                    "polygon(0 40%, 100% 40%, 100% 40%, 0 40%)",
                    "polygon(0 45%, 100% 45%, 100% 52%, 0 52%)",
                    "polygon(0 55%, 100% 55%, 100% 55%, 0 55%)",
                    "polygon(0 75%, 100% 75%, 100% 75%, 0 75%)",
                    "polygon(0 35%, 100% 35%, 100% 55%, 0 55%)",
                    "polygon(0 40%, 100% 40%, 100% 55%, 0 55%)",
                    "polygon(0 10%, 100% 10%, 100% 13%, 0 13%)",
                  ],
                  filter: [
                    "hue-rotate(0deg)",
                    "hue-rotate(25deg)",
                    "hue-rotate(50deg)",
                    "hue-rotate(75deg)",
                    "hue-rotate(100deg)",
                  ],
                }}
                transition={{
                  duration: 2.3,
                  delay: -0.6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
              <motion.div
                className="absolute left-0 right-0 top-0 bottom-0 bg-no-repeat bg-center"
                style={{
                  backgroundImage: "url('/static/logo_head.png')",
                  backgroundSize: "200px",
                  transform: "translateX(4%)",
                }}
                animate={{
                  opacity: [0.15, 0, 0.15, 0],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen text-white">
      {/* Navigation */}
      <motion.nav
        className="fixed top-0 w-full z-40 bg-black/80 backdrop-blur-md border-b border-gray-800"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Image src="/static/logo.svg" alt="TreantLab Logo" width={180} height={60} className="h-12 w-auto" />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#home"
                onClick={() => scrollToSection("home")}
                className="hover:text-emerald-400 transition-colors"
              >
                {t("Navigation.home")}
              </a>
              <a
                href="#services"
                onClick={() => scrollToSection("services")}
                className="hover:text-emerald-400 transition-colors"
              >
                {t("Navigation.services")}
              </a>
              <a
                href="#about"
                onClick={() => scrollToSection("about")}
                className="hover:text-emerald-400 transition-colors"
              >
                {t("Navigation.about")}
              </a>
              <a
                href="#contact"
                onClick={() => scrollToSection("contact")}
                className="hover:text-emerald-400 transition-colors"
              >
                {t("Navigation.contact")}
              </a>
              <Button
                className="bg-emerald-600 hover:bg-emerald-700"
                onMouseEnter={() => setIsNavButtonHovered(true)}
                onMouseLeave={() => setIsNavButtonHovered(false)}
                onClick={() => scrollToSection("contact")} // Add this line
              >
                <GlitchText text={t("Navigation.request_quote")} shouldAnimate={isNavButtonHovered} />
              </Button>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" ref={heroRef} className="relative min-h-screen flex items-center">
        {/* Overlay da seção Hero */}
        <div
          className={`absolute inset-0 bg-black/80 transition-opacity duration-700 ${activeSection === "home" ? "opacity-0" : "opacity-100"}`}
        />
        {/* Conteúdo da seção Hero */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="mb-4 bg-emerald-600/20 text-emerald-400 border-emerald-600">
                {t(servicesData[currentSlide].heroCategoryKey)}
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                {t(servicesData[currentSlide].heroTitlePart1Key)}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
                  {" "}
                  <GlitchText
                    text={t(servicesData[currentSlide].heroHighlightKey)}
                    shouldAnimate={glitchHeroHighlight}
                  />
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {t(servicesData[currentSlide].heroDescriptionKey)}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700"
                  onMouseEnter={() => setIsHeroButtonHovered(true)}
                  onMouseLeave={() => setIsHeroButtonHovered(false)}
                  onClick={() => scrollToSection("contact")} // Add this line
                >
                  <GlitchText text={t("Hero.schedule_consultation")} shouldAnimate={isHeroButtonHovered} />
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-emerald-600 text-emerald-400 hover:bg-emerald-600/10 bg-transparent"
                >
                  {t("Hero.view_portfolio")}
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative w-full h-96 bg-gradient-to-br from-emerald-600/20 to-transparent rounded-2xl p-8">
                <div className="absolute inset-0 bg-grid-pattern opacity-10" />

                {/* Seleção de serviço lateral - Agora interativa, mantendo ícones e layout da v6 */}
                <div
                  className="relative z-10 h-full flex flex-col justify-center"
                  onMouseLeave={handleMouseLeaveCarouselArea} // Reinicia o auto-play ao sair do mouse
                >
                  <div className="space-y-4">
                    {servicesData.map((service, index) => (
                      <motion.div
                        key={index}
                        className={`p-4 rounded-lg transition-all duration-500 cursor-pointer ${
                          index === currentSlide ? "bg-emerald-600/20 border border-emerald-600/50" : "bg-gray-800/50"
                        }`}
                        animate={{
                          scale: index === currentSlide ? 1.05 : 1,
                          opacity: index === currentSlide ? 1 : 0.7,
                        }}
                        onClick={() => handleSlideInteraction(index)} // Interação de clique
                        onMouseEnter={() => handleSlideInteraction(index)} // Interação de hover
                      >
                        <div className="flex items-center space-x-3">
                          <Image
                            src={service.icon || "/placeholder.svg"}
                            alt={t(service.titleKey)}
                            width={32}
                            height={32}
                            className="w-10 h-10"
                          />
                          <span className="font-semibold">{t(service.titleKey)}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" ref={statsRef} className="relative py-20">
        {/* Overlay da seção Stats */}
        <div
          className={`absolute inset-0 bg-black/80 transition-opacity duration-700 ${activeSection === "stats" ? "opacity-0" : "opacity-100"}`}
        />
        {/* Conteúdo da seção Stats */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl lg:text-5xl font-bold text-emerald-400 mb-2">{stat.number}</div>
                <div className="text-gray-400">{t(stat.labelKey)}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" ref={servicesRef} className="relative py-20">
        {/* Overlay da seção Services */}
        <div
          className={`absolute inset-0 bg-black/80 transition-opacity duration-700 ${activeSection === "services" ? "opacity-0" : "opacity-100"}`}
        />
        {/* Conteúdo da seção Services */}
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 bg-emerald-600/20 text-emerald-400 border-emerald-600">
              {t("Services.our_services")}
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              {t("Services.complete_solutions").split("Cibersegurança")[0]}
              <span className="text-emerald-400"> {t("Services.complete_solutions").split("Cibersegurança")[1]}</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t("Services.description")}</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {servicesData.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gray-900/50 border-gray-800 hover:border-emerald-600/50 transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <Image
                        src={service.icon || "/placeholder.svg"}
                        alt={t(service.titleKey)}
                        width={128}
                        height={128}
                        className="w-32 h-32"
                      />
                    </div>
                    <CardTitle className="text-2xl text-center">{t(service.titleKey)}</CardTitle>
                    <CardDescription className="text-gray-300 text-lg text-center">
                      {t(service.descriptionKey)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.featuresKeys.map((featureKey, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-emerald-400" />
                          <span className="text-gray-300">{t(featureKey)}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* E muito mais section */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4 text-emerald-400">{t("Services.and_much_more_title")}</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg">{t("Services.and_much_more_description")}</p>
            <Button
              variant="outline"
              size="lg"
              className="border-emerald-600 text-emerald-400 hover:bg-emerald-600/10 bg-transparent mb-6"
              onClick={() => scrollToSection("contact")}
            >
              {t("Services.know_services")}
            </Button>
            <div className="flex justify-center mb-6">
              <Image src="/static/icon1.png" alt="Icon" width={64} height={64} className="h-16 w-16" />
            </div>
            <div className="bg-gradient-to-r from-emerald-600 to-transparent h-1 w-1/4 mx-auto rounded"></div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="relative py-20">
        {/* Overlay da seção About */}
        <div
          className={`absolute inset-0 bg-black/80 transition-opacity duration-700 ${activeSection === "about" ? "opacity-0" : "opacity-100"}`}
        />
        {/* Conteúdo da seção About */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-emerald-600/20 text-emerald-400 border-emerald-600">
                {t("About.who_we_are")}
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                {t("About.specialists_title").split("Segurança Digital")[0]}
                <span className="text-emerald-400"> {t("About.specialists_title").split("Segurança Digital")[1]}</span>
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">{t("About.description")}</p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Globe className="w-6 h-6 text-emerald-400" />
                  <span>{t("About.international_experience")}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Lock className="w-6 h-6 text-emerald-400" />
                  <span>{t("About.certifications")}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="w-6 h-6 text-emerald-400" />
                  <span>{t("About.incident_response")}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-emerald-600/20 to-transparent p-8 rounded-2xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                    <div className="text-3xl font-bold text-emerald-400 mb-2">10+</div>
                    <div className="text-sm text-gray-400">{t("About.years_experience")}</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                    <div className="text-3xl font-bold text-emerald-400 mb-2">50+</div>
                    <div className="text-sm text-gray-400">{t("About.specialists")}</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                    <div className="text-3xl font-bold text-emerald-400 mb-2">100%</div>
                    <div className="text-sm text-gray-400">{t("About.satisfaction")}</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                    <div className="text-3xl font-bold text-emerald-400 mb-2">24/7</div>
                    <div className="text-sm text-gray-400">{t("About.support")}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" ref={testimonialsRef} className="relative py-20">
        {/* Overlay da seção Testimonials */}
        <div
          className={`absolute inset-0 bg-black/80 transition-opacity duration-700 ${activeSection === "testimonials" ? "opacity-0" : "opacity-100"}`}
        />
        {/* Conteúdo da seção Testimonials */}
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 bg-emerald-600/20 text-emerald-400 border-emerald-600">
              {t("Testimonials.testimonials")}
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">{t("Testimonials.what_clients_say")}</h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonialsData.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gray-900/50 border-gray-800 h-full">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.role}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="relative py-20">
        {/* Overlay da seção Contact */}
        <div
          className={`absolute inset-0 bg-black/80 transition-opacity duration-700 ${activeSection === "contact" ? "opacity-0" : "opacity-100"}`}
        />
        {/* Conteúdo da seção Contact */}
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 bg-emerald-600/20 text-emerald-400 border-emerald-600">
              {t("Contact.contact_us")}
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">{t("Contact.protect_business_together")}</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">{t("Contact.description")}</p>
          </motion.div>

          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-8">
                <form action="mailto:contato@treantlab.org" method="post" encType="text/plain" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="formName" className="block text-sm font-medium mb-2">
                        {t("Contact.name")}
                      </label>
                      <Input
                        id="formName"
                        name="name"
                        className="bg-gray-800 border-gray-700 focus:border-emerald-600"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="formEmail" className="block text-sm font-medium mb-2">
                        {t("Contact.email")}
                      </label>
                      <Input
                        id="formEmail"
                        name="email"
                        type="email"
                        className="bg-gray-800 border-gray-700 focus:border-emerald-600"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="formCompany" className="block text-sm font-medium mb-2">
                      {t("Contact.company")}
                    </label>
                    <Input
                      id="formCompany"
                      name="company"
                      className="bg-gray-800 border-gray-700 focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label htmlFor="formConsultationType" className="block text-sm font-medium mb-2">
                      {t("Contact.consultation_type")}
                    </label>
                    <Select name="consultationType">
                      <SelectTrigger
                        id="formConsultationType"
                        className="bg-gray-800 border-gray-700 focus:border-emerald-600"
                      >
                        <SelectValue placeholder={t("Contact.select_consultation_type")} />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="pentest">{t("Contact.consultation_types.pentest")}</SelectItem>
                        <SelectItem value="threat-intelligence">
                          {t("Contact.consultation_types.threat_intelligence")}
                        </SelectItem>
                        <SelectItem value="devsecops">{t("Contact.consultation_types.devsecops")}</SelectItem>
                        <SelectItem value="training">{t("Contact.consultation_types.training")}</SelectItem>
                        <SelectItem value="general">{t("Contact.consultation_types.general")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label htmlFor="formMessage" className="block text-sm font-medium mb-2">
                      {t("Contact.message")}
                    </label>
                    <Textarea
                      id="formMessage"
                      name="message"
                      rows={6}
                      className="bg-gray-800 border-gray-700 focus:border-emerald-600"
                      placeholder={t("Contact.message_placeholder")}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" size="lg">
                    {t("Contact.send_message")}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" ref={footerRef} className="relative py-12">
        {/* Overlay do Footer */}
        <div
          className={`absolute inset-0 bg-black/80 transition-opacity duration-700 ${activeSection === "footer" ? "opacity-0" : "opacity-100"}`}
        />
        {/* Conteúdo do Footer */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Image src="/static/logo_head.png" alt="TreantLab Logo" width={120} height={40} className="h-10 w-auto" />
              <span className="text-gray-400">TreantLab</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-6 text-gray-400">
              <div className="flex space-x-6 mb-4 md:mb-0">
                {" "}
                {/* Agrupando links de política */}
                <a href="#" className="hover:text-emerald-400 transition-colors">
                  {t("Footer.privacy_policy")}
                </a>
                <a href="#" className="hover:text-emerald-400 transition-colors">
                  {t("Footer.terms_of_use")}
                </a>
                <a href="#" className="hover:text-emerald-400 transition-colors">
                  {t("Footer.cookie_policy")}
                </a>
              </div>
              <a
                href="#contact"
                onClick={() => scrollToSection("contact")}
                className="hover:text-emerald-400 transition-colors"
              >
                {t("Footer.contact")}
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <div className="mb-4 space-y-1">
              {" "}
              {/* Novas informações de contato */}
              <p>{t("Footer.phone")}</p>
              <p>{t("Footer.email")}</p>
              <p>{t("Footer.cnpj")}</p>
            </div>
            <p>{t("Footer.copyright", { year: new Date().getFullYear() })}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
