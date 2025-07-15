"use client"

import { useState, useEffect, useRef, type FormEvent } from "react"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, Star, Globe, Lock, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import { GlitchText } from "@/components/glitch-text" // Import the new component
import { BackgroundOverlay } from "@/components/background-overlay" // Import the new overlay component

// Modificado o array de serviços para incluir os textos dinâmicos da Hero
const services = [
  {
    icon: "/static/pentest_icon.svg",
    title: "Pentest Avançado",
    description:
      "Testes de penetração completos com metodologias OWASP e NIST, incluindo análise de código e infraestrutura.",
    features: ["Black Box Testing", "White Box Testing", "Red Team Operations", "Relatórios Executivos"],
    heroCategory: "Líderes em Cibersegurança",
    heroTitlePart1: "Protegemos seu",
    heroHighlight: "Futuro Digital",
    heroDescription:
      "Especialistas em cibersegurança oferecendo soluções avançadas de pentest, threat intelligence e consultoria estratégica para empresas que levam segurança a sério.",
  },
  {
    icon: "/static/threat_icon.svg",
    title: "Threat Intelligence",
    description: "Inteligência de ameaças em tempo real com monitoramento 24/7 e análise preditiva de riscos.",
    features: ["Monitoramento Dark Web", "Análise de IOCs", "Threat Hunting", "Relatórios Customizados"],
    heroCategory: "Inteligência de Ponta",
    heroTitlePart1: "Visibilidade Total",
    heroHighlight: "Contra Ameaças",
    heroDescription:
      "Obtenha insights preditivos e monitore o cenário de ameaças em tempo real para proteger proativamente seus ativos digitais.",
  },
  {
    icon: "/static/development_icon.svg",
    title: "DevSecOps",
    description: "Integração de segurança no ciclo de desenvolvimento com automação e práticas de código seguro.",
    features: ["SAST/DAST", "Container Security", "CI/CD Security", "Code Review"],
    heroCategory: "Segurança no Código",
    heroTitlePart1: "Desenvolvimento",
    heroHighlight: "Seguro e Ágil",
    heroDescription:
      "Integre segurança em cada etapa do seu ciclo de desenvolvimento, garantindo aplicações robustas e livres de vulnerabilidades desde o início.",
  },
  {
    icon: "/static/training_icon.svg",
    title: "Treinamento Especializado",
    description: "Capacitação técnica avançada para equipes de TI e desenvolvimento com certificações reconhecidas.",
    features: ["Ethical Hacking", "Secure Coding", "Incident Response", "Compliance Training"],
    heroCategory: "Capacitação Profissional",
    heroTitlePart1: "Equipes",
    heroHighlight: "Ciber-Resilientes",
    heroDescription:
      "Invista no conhecimento da sua equipe com treinamentos práticos e avançados, preparando-os para os desafios mais complexos da cibersegurança.",
  },
]

const stats = [
  { number: "1500+", label: "Vulnerabilidades Encontradas" }, // Updated as per user's request
  { number: "99.9%", label: "SOC - Uptime Garantido" },
  { number: "24/7", label: "Monitoramento" },
  { number: "15min", label: "Tempo de Resposta" },
]

const testimonials = [
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
  console.log("TreantLabPage component rendered.") // Log para depuração
  const [isLoading, setIsLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0) // Controla o slide atual do carrossel e o texto da Hero
  const intervalRef = useRef<NodeJS.Timeout | null>(null) // Ref para o ID do intervalo do carrossel automático

  // Estados para o formulário de contato
  const [formName, setFormName] = useState("")
  const [formEmail, setFormEmail] = useState("")
  const [formCompany, setFormCompany] = useState("")
  const [formConsultationType, setFormConsultationType] = useState("")
  const [formMessage, setFormMessage] = useState("")

  // Estados para controlar o glitch nos botões
  const [isNavButtonHovered, setIsNavButtonHovered] = useState(false)
  const [isHeroButtonHovered, setIsHeroButtonHovered] = useState(false)
  const [isContactButtonHovered, setIsContactButtonHovered] = useState(false)
  const [glitchHeroHighlight, setGlitchHeroHighlight] = useState(false)

  const startAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % services.length)
    }, 5000)
  }

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  // Inicia o carrossel automático ao montar e limpa ao desmontar
  useEffect(() => {
    startAutoPlay()
    return () => stopAutoPlay()
  }, [])

  // Trigger glitch for hero highlight when slide changes
  useEffect(() => {
    setGlitchHeroHighlight(true)
    const timer = setTimeout(() => setGlitchHeroHighlight(false), 1000) // Glitch for 1 second
    return () => clearTimeout(timer)
  }, [currentSlide])

  const handleSlideInteraction = (index: number) => {
    stopAutoPlay() // Para o carrossel automático na interação do usuário
    setCurrentSlide(index)
  }

  const handleMouseLeaveCarouselArea = () => {
    // Reinicia o carrossel automático apenas se não estiver rodando
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

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault() // Previne o comportamento padrão de recarregar a página
    console.log("Dados do Formulário:", {
      name: formName,
      email: formEmail,
      company: formCompany,
      consultationType: formConsultationType,
      message: formMessage,
    })
    // Aqui você pode adicionar a lógica para enviar os dados para um backend
    alert("Formulário enviado! (Verifique o console para os dados)")
    // Opcional: Limpar o formulário após o envio
    setFormName("")
    setFormEmail("")
    setFormCompany("")
    setFormConsultationType("")
    setFormMessage("")
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
    // O container principal agora é relativo para que o BackgroundOverlay possa ser posicionado absolutamente dentro dele.
    // A imagem de fundo está no html/body via globals.css.
    <div className="min-h-screen text-white relative">
      {/* O componente de overlay de fundo que escurece a imagem global */}
      <BackgroundOverlay />

      {/* Navigation */}
      {/* `z-40`: Garante que a navegação esteja sempre acima do overlay e do conteúdo da página. */}
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
                Início
              </a>
              <a
                href="#services"
                onClick={() => scrollToSection("services")}
                className="hover:text-emerald-400 transition-colors"
              >
                Serviços
              </a>
              <a
                href="#about"
                onClick={() => scrollToSection("about")}
                className="hover:text-emerald-400 transition-colors"
              >
                Sobre
              </a>
              <a
                href="#contact"
                onClick={() => scrollToSection("contact")}
                className="hover:text-emerald-400 transition-colors"
              >
                Contato
              </a>
              <Button
                className="bg-emerald-600 hover:bg-emerald-700"
                onMouseEnter={() => setIsNavButtonHovered(true)}
                onMouseLeave={() => setIsNavButtonHovered(false)}
              >
                <GlitchText text="Solicitar Orçamento" shouldAnimate={isNavButtonHovered} />
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      {/* `relative z-10`: Garante que a seção esteja acima do overlay de fundo. */}
      <section id="home" className="relative min-h-screen flex items-center z-10">
        <div className="container mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="mb-4 bg-emerald-600/20 text-emerald-400 border-emerald-600">
                {services[currentSlide].heroCategory}
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                {services[currentSlide].heroTitlePart1}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
                  {" "}
                  <GlitchText text={services[currentSlide].heroHighlight} shouldAnimate={glitchHeroHighlight} />
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">{services[currentSlide].heroDescription}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700"
                  onMouseEnter={() => setIsHeroButtonHovered(true)}
                  onMouseLeave={() => setIsHeroButtonHovered(false)}
                >
                  <GlitchText text="Agendar Consultoria" shouldAnimate={isHeroButtonHovered} />
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-emerald-600 text-emerald-400 hover:bg-emerald-600/10 bg-transparent"
                >
                  Ver Portfólio
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
                    {services.map((service, index) => (
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
                            alt={service.title}
                            width={32}
                            height={32}
                            className="w-10 h-10"
                          />
                          <span className="font-semibold">{service.title}</span>
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
      {/* `relative z-10`: Garante que a seção esteja acima do overlay de fundo. */}
      <section className="py-20 bg-gray-900 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl lg:text-5xl font-bold text-emerald-400 mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      {/* `relative z-10`: Garante que a seção esteja acima do overlay de fundo. */}
      <section id="services" className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 bg-emerald-600/20 text-emerald-400 border-emerald-600">Nossos Serviços</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Soluções Completas em
              <span className="text-emerald-400"> Cibersegurança</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Oferecemos um portfólio abrangente de serviços especializados para proteger sua organização contra as
              ameaças mais sofisticadas.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* O fundo do Card aqui é `bg-gray-900/50`, o que é aceitável pois ele é um componente interno da seção,
                    e a intenção é que ele tenha uma leve transparência sobre o fundo escurecido. */}
                <Card className="bg-gray-900/50 border-gray-800 hover:border-emerald-600/50 transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <Image
                        src={service.icon || "/placeholder.svg"}
                        alt={service.title}
                        width={128}
                        height={128}
                        className="w-32 h-32"
                      />
                    </div>
                    <CardTitle className="text-2xl text-center">{service.title}</CardTitle>
                    <CardDescription className="text-gray-300 text-lg text-center">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-emerald-400" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* E muito mais section - Mantido como na v6 */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4 text-emerald-400">E muito mais</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg">
              Oferecemos serviços adicionais como estruturação de SOC e consultoria em conformidade. Entre em contato
              para soluções personalizadas.
            </p>
            <Button
              variant="outline"
              size="lg"
              className="border-emerald-600 text-emerald-400 hover:bg-emerald-600/10 bg-transparent mb-6"
              onClick={() => scrollToSection("contact")}
            >
              Quero conhecer os serviços
            </Button>
            <div className="flex justify-center mb-6">
              <Image src="/static/icon1.png" alt="Icon" width={64} height={64} className="h-16 w-16" />
            </div>
            <div className="bg-gradient-to-r from-emerald-600 to-transparent h-1 w-1/4 mx-auto rounded"></div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      {/* `relative z-10`: Garante que a seção esteja acima do overlay de fundo. */}
      <section id="about" className="py-20 bg-gray-900 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-emerald-600/20 text-emerald-400 border-emerald-600">Quem Somos</Badge>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Especialistas em
                <span className="text-emerald-400"> Segurança Digital</span>
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Somos uma equipe de especialistas certificados em cibersegurança, com mais de uma década de experiência
                protegendo organizações contra ameaças digitais avançadas.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Globe className="w-6 h-6 text-emerald-400" />
                  <span>Experiência internacional em mais de 20 países</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Lock className="w-6 h-6 text-emerald-400" />
                  <span>Certificações CISSP, CEH, OSCP e ISO 27001</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="w-6 h-6 text-emerald-400" />
                  <span>Resposta a incidentes em menos de 15 minutos</span>
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
              {/* O fundo do Card aqui é `bg-gradient-to-br from-emerald-600/20 to-transparent`, o que é aceitável pois ele é um componente interno da seção. */}
              <div className="bg-gradient-to-br from-emerald-600/20 to-transparent p-8 rounded-2xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                    <div className="text-3xl font-bold text-emerald-400 mb-2">10+</div>
                    <div className="text-sm text-gray-400">Anos de Experiência</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                    <div className="text-3xl font-bold text-emerald-400 mb-2">50+</div>
                    <div className="text-sm text-gray-400">Especialistas</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                    <div className="text-3xl font-bold text-emerald-400 mb-2">100%</div>
                    <div className="text-sm text-gray-400">Satisfação</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                    <div className="text-3xl font-bold text-emerald-400 mb-2">24/7</div>
                    <div className="text-sm text-gray-400">Suporte</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* `relative z-10`: Garante que a seção esteja acima do overlay de fundo. */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 bg-emerald-600/20 text-emerald-400 border-emerald-600">Depoimentos</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              O que nossos
              <span className="text-emerald-400"> clientes dizem</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* O fundo do Card aqui é `bg-gray-900/50`, o que é aceitável pois ele é um componente interno da seção. */}
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
      {/* `relative z-10`: Garante que a seção esteja acima do overlay de fundo. */}
      <section id="contact" className="py-20 bg-gray-900 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 bg-emerald-600/20 text-emerald-400 border-emerald-600">Entre em Contato</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Vamos proteger seu
              <span className="text-emerald-400"> negócio juntos</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Agende uma consultoria gratuita e descubra como podemos fortalecer a segurança da sua organização.
            </p>
          </motion.div>

          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* O fundo do Card aqui é `bg-gray-900/50`, o que é aceitável pois ele é um componente interno da seção. */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-8">
                <form className="space-y-6" onSubmit={handleFormSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="formName" className="block text-sm font-medium mb-2">
                        Nome
                      </label>
                      <Input
                        id="formName"
                        className="bg-gray-800 border-gray-700 focus:border-emerald-600"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="formEmail" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <Input
                        id="formEmail"
                        type="email"
                        className="bg-gray-800 border-gray-700 focus:border-emerald-600"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="formCompany" className="block text-sm font-medium mb-2">
                      Empresa
                    </label>
                    <Input
                      id="formCompany"
                      className="bg-gray-800 border-gray-700 focus:border-emerald-600"
                      value={formCompany}
                      onChange={(e) => setFormCompany(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="formConsultationType" className="block text-sm font-medium mb-2">
                      Tipo de Consulta
                    </label>
                    <Select value={formConsultationType} onValueChange={setFormConsultationType}>
                      <SelectTrigger
                        id="formConsultationType"
                        className="bg-gray-800 border-gray-700 focus:border-emerald-600"
                      >
                        <SelectValue placeholder="Selecione o tipo de consulta" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pentest">Pentest</SelectItem>
                        <SelectItem value="threat-intelligence">Threat Intelligence</SelectItem>
                        <SelectItem value="devsecops">DevSecOps</SelectItem>
                        <SelectItem value="training">Treinamento</SelectItem>
                        <SelectItem value="general">Consulta Geral</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label htmlFor="formMessage" className="block text-sm font-medium mb-2">
                      Mensagem
                    </label>
                    <Textarea
                      id="formMessage"
                      rows={6}
                      className="bg-gray-800 border-gray-700 focus:border-emerald-600"
                      placeholder="Descreva suas necessidades de segurança..."
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    size="lg"
                    onMouseEnter={() => setIsContactButtonHovered(true)}
                    onMouseLeave={() => setIsContactButtonHovered(false)}
                  >
                    <GlitchText text="Enviar Mensagem" shouldAnimate={isContactButtonHovered} />
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12 relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Image src="/static/logo_head.png" alt="TreantLab Logo" width={120} height={40} className="h-10 w-auto" />
              <span className="text-gray-400">TreantLab</span>
            </div>
            <div className="flex items-center space-x-6 text-gray-400">
              <a href="#" className="hover:text-emerald-400 transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="hover:text-emerald-400 transition-colors">
                Termos de Uso
              </a>
              <a
                href="#contact"
                onClick={() => scrollToSection("contact")}
                className="hover:text-emerald-400 transition-colors"
              >
                Contato
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© 2025 TreantLab. Todos os direitos reservados. Especialistas em Cibersegurança.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
