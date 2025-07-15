"use client"

import { useLocale } from "next-intl"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter, usePathname } from "next/navigation" // Import useRouter e usePathname

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleLocaleChange = (newLocale: string) => {
    // Constrói o novo caminho com o locale selecionado
    // Exemplo: se o caminho atual é /en/about, e o newLocale é 'pt', o newPath será /pt/about
    // O substring(3) remove o '/xx/' inicial do pathname atual
    const newPath = `/${newLocale}${pathname.substring(3)}`
    router.push(newPath)
  }

  return (
    <Select value={locale} onValueChange={handleLocaleChange}>
      <SelectTrigger className="w-[80px] bg-gray-800 border-gray-700 text-white focus:ring-emerald-600">
        <SelectValue placeholder="Lang" />
      </SelectTrigger>
      <SelectContent className="bg-gray-800 border-gray-700 text-white min-w-[48px]">
        <SelectItem value="en">
          <div className="flex items-center">
            <Image src="https://flagsapi.com/US/flat/64.png" alt="English Flag" width={24} height={16} />
          </div>
        </SelectItem>
        <SelectItem value="pt">
          <div className="flex items-center">
            <Image src="https://flagsapi.com/BR/flat/64.png" alt="Portuguese Flag" width={24} height={16} />
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
