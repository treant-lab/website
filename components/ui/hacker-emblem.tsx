"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Hacker Emblem — the Conway's Game of Life glider, rendered in CSS 3D.
 *
 * A dependency-free take on the three.js reference: the emblem is only a 4x4 bar
 * grid plus 5 flattened discs, so CSS transforms carry it without pulling in a
 * WebGL runtime (three.js is ~600KB and was CDN-loaded in the original).
 *
 * - pointer moves tilt the emblem (damped, follows the cursor)
 * - cycles the glider's 4 phases on an interval
 * - honours prefers-reduced-motion: static phase 0, no tilt
 *
 * Debug: set NEXT_PUBLIC_EMBLEM_DEBUG=1 to log phase changes and tilt.
 */

// col 0..2 (left→right), row 0..2 (top→bottom). Phase 0 is the emblem proper.
const PHASES: ReadonlyArray<ReadonlyArray<readonly [number, number]>> = [
  [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]], // .O. / ..O / OOO
  [[0, 0], [2, 0], [1, 1], [2, 1], [1, 2]], // O.O / .OO / .O.
  [[2, 0], [0, 1], [2, 1], [1, 2], [2, 2]], // ..O / O.O / .OO
  [[0, 0], [1, 1], [2, 1], [0, 2], [1, 2]], // O.. / .OO / OO.
]

interface HackerEmblemProps {
  /** Rendered size in px. */
  size?: number
  /** ms between glider phases; 0 disables cycling. */
  interval?: number
  className?: string
}

export function HackerEmblem({ size = 300, interval = 2600, className = "" }: HackerEmblemProps) {
  const [phase, setPhase] = useState(0)
  const [tilt, setTilt] = useState({ x: -14, y: 22 })
  const hostRef = useRef<HTMLDivElement>(null)
  const reduced = useRef(false)

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced.current || interval <= 0) return
    const id = setInterval(() => {
      setPhase((p) => {
        const next = (p + 1) % PHASES.length
        if (process.env.NEXT_PUBLIC_EMBLEM_DEBUG === "1") console.log("[emblem] phase", next)
        return next
      })
    }, interval)
    return () => clearInterval(id)
  }, [interval])

  // Cursor-follow tilt, damped toward the pointer's offset from the element centre.
  useEffect(() => {
    if (reduced.current) return
    const onMove = (e: PointerEvent) => {
      const el = hostRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height
      setTilt({ x: -14 - dy * 16, y: 22 + dx * 22 })
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [])

  const alive = new Set(PHASES[phase].map(([c, r]) => `${c},${r}`))
  const cell = size / 3.6          // one grid cell
  const bar = Math.max(1, size * 0.005)
  const span = cell * 3 + bar      // full grid extent
  const dot = cell * 0.68
  const ring = Math.max(1, size * 0.005)   // hollow circle stroke, matches grid weight

  return (
    <div
      ref={hostRef}
      className={`select-none ${className}`}
      style={{ width: size, height: size, perspective: size * 3.2 }}
      aria-label="Hacker emblem — the glider from Conway's Game of Life"
      role="img"
    >
      <div
        className="relative h-full w-full transition-transform duration-500 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        {/* Grid — one SVG path set: overlapping divs doubled their alpha at
            every crossing, which read as bright intersection dots. */}
        <svg
          className="absolute left-1/2 top-1/2"
          width={span}
          height={span}
          style={{ transform: "translate(-50%,-50%)", overflow: "visible" }}
          aria-hidden="true"
        >
          {[0, 1, 2, 3].map((i) => {
            const off = (i - 1.5) * cell + span / 2
            return (
              <g key={i} stroke="rgba(255,255,255,.16)" strokeWidth={bar} strokeLinecap="square">
                <line x1={off} y1={0} x2={off} y2={span} />
                <line x1={0} y1={off} x2={span} y2={off} />
              </g>
            )
          })}
        </svg>

        {/* Cells */}
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => {
            const on = alive.has(`${col},${row}`)
            return (
              <span
                key={`${col}-${row}`}
                className="absolute rounded-full transition-all duration-700 ease-out"
                style={{
                  left: "50%",
                  top: "50%",
                  width: dot,
                  height: dot,
                  marginLeft: -dot / 2,
                  marginTop: -dot / 2,
                  transform: `translate3d(${(col - 1) * cell}px, ${(row - 1) * cell}px, 0px) scale(${on ? 1 : 0.001})`,
                  opacity: on ? 0.45 : 0,
                  background: "transparent",
                  border: `${ring}px solid rgba(255,255,255,.85)`,
                }}
              />
            )
          })
        )}
      </div>
    </div>
  )
}

export default HackerEmblem
