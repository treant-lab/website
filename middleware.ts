import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const locales = ["en", "pt"]
const defaultLocale = "pt"

export default function middleware(request: NextRequest) {
  const preferredLocale = request.cookies.get("NEXT_LOCALE")?.value
  if (!preferredLocale || !locales.includes(preferredLocale)) {
    const response = NextResponse.next()
    response.cookies.set("NEXT_LOCALE", defaultLocale)
    return response
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
}