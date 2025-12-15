"use client"

import { useState, useEffect } from "react"
import { useLocale } from "next-intl"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLocaleChange = (newLocale: string) => {
    // Save preference
    localStorage.setItem("NEXT_LOCALE_PREFERENCE", newLocale)
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`

    // Navigate to the new locale URL
    // Replace current locale in path with new locale
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    window.location.href = newPath
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="w-[80px] h-10 bg-gray-800 border border-gray-700 rounded-md animate-pulse" />
    )
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
