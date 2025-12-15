"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"

type Category = "all" | "security" | "fintech" | "gaming" | "platform"

interface ProductData {
  id: string
  icon: string
  category: "security" | "fintech" | "gaming" | "platform"
  status: "production" | "beta"
}

const productsData: ProductData[] = [
  { id: "tevi", icon: "shield-check", category: "security", status: "production" },
  { id: "tamandua", icon: "shield", category: "security", status: "production" },
  { id: "fortress", icon: "bitcoin", category: "fintech", status: "production" },
  { id: "guarapay", icon: "credit-card", category: "fintech", status: "production" },
  { id: "restitue", icon: "receipt", category: "fintech", status: "production" },
  { id: "pokerzone", icon: "gamepad-2", category: "gaming", status: "production" },
  { id: "kairos", icon: "trending-up", category: "fintech", status: "production" },
  { id: "fruit", icon: "server", category: "platform", status: "production" },
]

interface ProductsSectionProps {
  activeSection: string | null
}

export function ProductsSection({ activeSection }: ProductsSectionProps) {
  const t = useTranslations("Products")
  const [filter, setFilter] = useState<Category>("all")

  const filteredProducts = productsData.filter(
    (product) => filter === "all" || product.category === filter
  )

  const filters: { key: Category; label: string }[] = [
    { key: "all", label: t("filter_all") },
    { key: "security", label: t("filter_security") },
    { key: "fintech", label: t("filter_fintech") },
    { key: "gaming", label: t("filter_gaming") },
    { key: "platform", label: t("filter_platform") },
  ]

  return (
    <section id="products" className="relative py-20">
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/80 transition-opacity duration-700 ${
          activeSection === "products" ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Badge className="mb-4 bg-emerald-600/20 text-emerald-400 border-emerald-600">
            {t("section_title")}
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            {t("section_title").split(" ")[0]}{" "}
            <span className="text-emerald-400">
              {t("section_title").split(" ").slice(1).join(" ")}
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t("section_subtitle")}
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {filters.map((f) => (
            <Button
              key={f.key}
              variant={filter === f.key ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f.key)}
              className={`
                transition-all duration-300
                ${filter === f.key
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "border-gray-700 text-gray-300 hover:border-emerald-600 hover:text-emerald-400 bg-transparent"
                }
              `}
            >
              {f.label}
            </Button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          layout
        >
          {filteredProducts.map((product, index) => {
            const itemData = t.raw(`items.${product.id}`) as {
              name: string
              tagline: string
              description: string
              features: string[]
            }

            return (
              <ProductCard
                key={product.id}
                id={product.id}
                name={itemData.name}
                tagline={itemData.tagline}
                description={itemData.description}
                features={itemData.features}
                status={product.status}
                icon={product.icon}
                category={product.category}
                statusLabels={{
                  production: t("status_production"),
                  beta: t("status_beta"),
                }}
                index={index}
              />
            )
          })}
        </motion.div>

        {/* Bottom decoration */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-transparent via-emerald-600 to-transparent h-px w-1/2" />
        </motion.div>
      </div>
    </section>
  )
}
