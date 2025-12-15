"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ShieldCheck,
  Shield,
  Bitcoin,
  CreditCard,
  Receipt,
  Gamepad2,
  TrendingUp,
  Server,
} from "lucide-react"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "shield-check": ShieldCheck,
  shield: Shield,
  bitcoin: Bitcoin,
  "credit-card": CreditCard,
  receipt: Receipt,
  "gamepad-2": Gamepad2,
  "trending-up": TrendingUp,
  server: Server,
}

const categoryColors: Record<string, string> = {
  security: "from-red-500/20 to-red-600/5 border-red-500/30 hover:border-red-500/60",
  fintech: "from-blue-500/20 to-blue-600/5 border-blue-500/30 hover:border-blue-500/60",
  gaming: "from-purple-500/20 to-purple-600/5 border-purple-500/30 hover:border-purple-500/60",
  platform: "from-emerald-500/20 to-emerald-600/5 border-emerald-500/30 hover:border-emerald-500/60",
}

const categoryIconColors: Record<string, string> = {
  security: "text-red-400",
  fintech: "text-blue-400",
  gaming: "text-purple-400",
  platform: "text-emerald-400",
}

interface ProductCardProps {
  id: string
  name: string
  tagline: string
  description: string
  features: string[]
  status: "production" | "beta"
  icon: string
  category: "security" | "fintech" | "gaming" | "platform"
  statusLabels: {
    production: string
    beta: string
  }
  index: number
}

export function ProductCard({
  name,
  tagline,
  description,
  features,
  status,
  icon,
  category,
  statusLabels,
  index,
}: ProductCardProps) {
  const IconComponent = iconMap[icon] || ShieldCheck
  const colorClass = categoryColors[category] || categoryColors.security
  const iconColorClass = categoryIconColors[category] || categoryIconColors.security

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card
        className={`
          relative overflow-hidden h-full
          bg-gradient-to-br ${colorClass}
          backdrop-blur-xl bg-gray-900/40
          border transition-all duration-300
          hover:shadow-lg hover:shadow-emerald-500/10
        `}
      >
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

        {/* Glow effect */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <CardHeader className="relative z-10 pb-2">
          <div className="flex items-start justify-between mb-3">
            <div className={`p-3 rounded-xl bg-gray-800/50 ${iconColorClass}`}>
              <IconComponent className="w-8 h-8" />
            </div>
            <Badge
              variant={status === "production" ? "default" : "secondary"}
              className={`
                ${status === "production"
                  ? "bg-emerald-600/20 text-emerald-400 border-emerald-600/50"
                  : "bg-yellow-600/20 text-yellow-400 border-yellow-600/50"
                }
              `}
            >
              {status === "production" ? statusLabels.production : statusLabels.beta}
            </Badge>
          </div>

          <CardTitle className="text-xl font-bold text-white">{name}</CardTitle>
          <CardDescription className="text-emerald-400 font-medium">
            {tagline}
          </CardDescription>
        </CardHeader>

        <CardContent className="relative z-10 pt-0">
          <p className="text-gray-300 text-sm mb-4 line-clamp-2">
            {description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {features.slice(0, 4).map((feature, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 rounded-full bg-gray-800/60 text-gray-300 border border-gray-700/50"
              >
                {feature}
              </span>
            ))}
            {features.length > 4 && (
              <span className="text-xs px-2 py-1 rounded-full bg-gray-800/60 text-gray-400">
                +{features.length - 4}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
