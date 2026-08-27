"use client"

// Black overlay shown until the hero canvas paints its first frame.
// Kept mounted through the fade so the hero's own fade-in starts behind it,
// then unmounted so it never blocks pointer events.
// Debug: set NEXT_PUBLIC_LOADER_DEBUG=1 to log show/hide/unmount timings.

import { useEffect, useState } from "react"

const FADE_MS = 500
/** Safety net: never trap the user behind the overlay if onReady never fires. */
const MAX_WAIT_MS = 4000

interface PageLoaderProps {
  /** Flip to true when the content behind is ready to be revealed. */
  ready: boolean
}

export function PageLoader({ ready }: PageLoaderProps) {
  const [hidden, setHidden] = useState(false)
  const [unmounted, setUnmounted] = useState(false)
  const debug = process.env.NEXT_PUBLIC_LOADER_DEBUG === "1"

  // Bail out if the ready signal never arrives (canvas error, blocked raf, etc).
  useEffect(() => {
    const t = setTimeout(() => {
      setHidden((h) => {
        if (!h && debug) console.log("[PageLoader] timeout fallback at", MAX_WAIT_MS, "ms")
        return true
      })
    }, MAX_WAIT_MS)
    return () => clearTimeout(t)
  }, [debug])

  useEffect(() => {
    if (!ready) return
    if (debug) console.log("[PageLoader] ready — fading out")
    setHidden(true)
  }, [ready, debug])

  useEffect(() => {
    if (!hidden) return
    const t = setTimeout(() => {
      if (debug) console.log("[PageLoader] unmounted")
      setUnmounted(true)
    }, FADE_MS)
    return () => clearTimeout(t)
  }, [hidden, debug])

  if (unmounted) return null

  return (
    <div
      aria-hidden={hidden}
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#060807] transition-opacity ease-out"
      style={{
        opacity: hidden ? 0 : 1,
        transitionDuration: `${FADE_MS}ms`,
        pointerEvents: hidden ? "none" : "auto",
      }}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="text-[20px] font-semibold tracking-tight text-white">
          Treant<span className="text-emerald-400">Lab</span>
        </div>
        {/* Indeterminate sweep — no progress to report, so don't fake one. */}
        <div className="h-px w-28 overflow-hidden bg-white/10">
          <div className="loader-sweep h-full w-1/3 bg-emerald-400" />
        </div>
      </div>
    </div>
  )
}
export default PageLoader
