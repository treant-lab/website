"use client"

// Source: https://reactbits.dev/backgrounds/letter-glitch (LetterGlitch-JS-CSS)
// Ported to TSX. Canvas-based, no dependencies.
// Debug: set NEXT_PUBLIC_GLITCH_DEBUG=1 to log grid size and frame cadence.

import { useRef, useEffect } from "react"

type Letter = { char: string; color: string; targetColor: string; colorProgress: number }

interface LetterGlitchProps {
  glitchColors?: string[]
  className?: string
  glitchSpeed?: number
  centerVignette?: boolean
  outerVignette?: boolean
  smooth?: boolean
  characters?: string
  /** Opacity applied to the canvas so foreground copy stays readable. */
  opacity?: number
  /** Fired once the canvas has painted its first frame. Used to dismiss the loader. */
  onReady?: () => void
  /** Height of the bottom fade-to-black gradient, as a fraction of the component height. */
  bottomFade?: number
}

export function LetterGlitch({
  glitchColors = ["#0d3b2a", "#22b573", "#34d399"],
  className = "",
  glitchSpeed = 50,
  centerVignette = false,
  outerVignette = true,
  smooth = true,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789",
  opacity = 1,
  onReady,
  bottomFade = 0,
}: LetterGlitchProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const letters = useRef<Letter[]>([])
  const grid = useRef({ columns: 0, rows: 0 })
  const context = useRef<CanvasRenderingContext2D | null>(null)
  const lastGlitchTime = useRef(Date.now())
  const onReadyRef = useRef(onReady)
  onReadyRef.current = onReady
  const readyFired = useRef(false)

  const fontSize = 16
  const charWidth = 10
  const charHeight = 20

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const debug = process.env.NEXT_PUBLIC_GLITCH_DEBUG === "1"
    const lettersAndSymbols = Array.from(characters)
    const randChar = () => lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)]
    const randColor = () => glitchColors[Math.floor(Math.random() * glitchColors.length)]

    const hexToRgb = (hex: string) => {
      hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => r + r + g + g + b + b)
      const res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return res ? { r: parseInt(res[1], 16), g: parseInt(res[2], 16), b: parseInt(res[3], 16) } : null
    }

    const interpolate = (s: any, e: any, f: number) =>
      `rgb(${Math.round(s.r + (e.r - s.r) * f)}, ${Math.round(s.g + (e.g - s.g) * f)}, ${Math.round(s.b + (e.b - s.b) * f)})`

    const initLetters = (columns: number, rows: number) => {
      grid.current = { columns, rows }
      letters.current = Array.from({ length: columns * rows }, () => ({
        char: randChar(), color: randColor(), targetColor: randColor(), colorProgress: 1,
      }))
    }

    const draw = () => {
      if (!context.current || !canvasRef.current || letters.current.length === 0) return
      const ctx = context.current
      const { width, height } = canvasRef.current.getBoundingClientRect()
      ctx.clearRect(0, 0, width, height)
      ctx.font = `${fontSize}px monospace`
      ctx.textBaseline = "top"
      letters.current.forEach((l, i) => {
        ctx.fillStyle = l.color
        ctx.fillText(l.char, (i % grid.current.columns) * charWidth, Math.floor(i / grid.current.columns) * charHeight)
      })
    }

    const resize = () => {
      const c = canvasRef.current
      const parent = c?.parentElement
      if (!c || !parent) return
      const dpr = window.devicePixelRatio || 1
      const rect = parent.getBoundingClientRect()
      c.width = rect.width * dpr
      c.height = rect.height * dpr
      c.style.width = `${rect.width}px`
      c.style.height = `${rect.height}px`
      context.current?.setTransform(dpr, 0, 0, dpr, 0, 0)
      const columns = Math.ceil(rect.width / charWidth)
      const rows = Math.ceil(rect.height / charHeight)
      initLetters(columns, rows)
      if (debug) console.log("[LetterGlitch] grid", { columns, rows, cells: columns * rows, dpr })
      draw()
    }

    const update = () => {
      if (!letters.current.length) return
      const count = Math.max(1, Math.floor(letters.current.length * 0.05))
      for (let i = 0; i < count; i++) {
        const idx = Math.floor(Math.random() * letters.current.length)
        const l = letters.current[idx]
        if (!l) continue
        l.char = randChar()
        l.targetColor = randColor()
        if (!smooth) { l.color = l.targetColor; l.colorProgress = 1 } else { l.colorProgress = 0 }
      }
    }

    const smoothStep = () => {
      let redraw = false
      letters.current.forEach((l) => {
        if (l.colorProgress < 1) {
          l.colorProgress = Math.min(1, l.colorProgress + 0.05)
          const a = hexToRgb(l.color), b = hexToRgb(l.targetColor)
          if (a && b) { l.color = interpolate(a, b, l.colorProgress); redraw = true }
        }
      })
      if (redraw) draw()
    }

    // Respect reduced motion: render one static frame, no animation loop.
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    const animate = () => {
      const now = Date.now()
      if (now - lastGlitchTime.current >= glitchSpeed) {
        update(); draw(); lastGlitchTime.current = now
      }
      if (smooth) smoothStep()
      animationRef.current = requestAnimationFrame(animate)
    }

    context.current = canvas.getContext("2d")
    resize()
    // First frame is on screen — let the loader dismiss and the fade-in start.
    if (!readyFired.current) {
      readyFired.current = true
      if (debug) console.log("[LetterGlitch] first paint")
      onReadyRef.current?.()
    }
    if (reduced) {
      if (debug) console.log("[LetterGlitch] reduced motion — static frame")
    } else {
      animate()
    }

    let t: ReturnType<typeof setTimeout>
    const onResize = () => {
      clearTimeout(t)
      t = setTimeout(() => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current)
        resize()
        if (!reduced) animate()
      }, 100)
    }
    window.addEventListener("resize", onResize)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      clearTimeout(t)
      window.removeEventListener("resize", onResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [glitchSpeed, smooth, characters, glitchColors.join(",")])

  return (
    <div className={`relative h-full w-full overflow-hidden bg-black ${className}`}>
      <canvas ref={canvasRef} className="block h-full w-full" style={{ opacity }} />
      {outerVignette && (
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 100%)" }} />
      )}
      {bottomFade > 0 && (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0"
          style={{
            height: `${bottomFade * 100}%`,
            background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
          }}
        />
      )}
      {centerVignette && (
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)" }} />
      )}
    </div>
  )
}
export default LetterGlitch
