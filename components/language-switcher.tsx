"use client"

import { useLocale } from "next-intl"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

function getCookieLocale() {
  const match = document.cookie.match(/(?:^|; )NEXT_LOCALE=([^;]*)/)
  return match ? decodeURIComponent(match[1]) : null
}

export function LanguageSwitcher() {
  const locale = useLocale()
  const cookieLocale = typeof window !== "undefined" ? getCookieLocale() : null
  const currentLocale = cookieLocale || locale

  const handleLocaleChange = (newLocale: string) => {
    localStorage.setItem("NEXT_LOCALE_PREFERENCE", newLocale)
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`
    window.location.reload()
  }

  return (
    <Select value={currentLocale} onValueChange={handleLocaleChange}>
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
