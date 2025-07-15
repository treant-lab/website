"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"

interface GlitchTextProps {
  text: string
  shouldAnimate: boolean // Controls if the animation should run
  duration?: number // Total duration of the glitch effect in ms
  glitchIterations?: number // How many times to glitch before resolving
  glitchSpeed?: number // Delay between glitch frames in ms
}

const getRandomChar = () => {
  const chars = "!@#$%^&*()_+{}[]|:;\"'<>,.?/~`" + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  return chars[Math.floor(Math.random() * chars.length)]
}

export const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  shouldAnimate,
  duration = 800,
  glitchIterations = 10,
  glitchSpeed = 50,
}) => {
  const [displayText, setDisplayText] = useState(text)
  const animationIntervalRef = useRef<number | null>(null)
  const animationTimeoutRef = useRef<number | null>(null)
  const iterationCount = useRef(0)

  useEffect(() => {
    // Cleanup function for previous animations
    const cleanup = () => {
      if (animationIntervalRef.current) clearInterval(animationIntervalRef.current)
      if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current)
      animationIntervalRef.current = null
      animationTimeoutRef.current = null
    }

    cleanup() // Clear any existing animations before starting new ones

    if (shouldAnimate) {
      iterationCount.current = 0
      setDisplayText(text) // Start with original text before glitching

      const animateGlitch = () => {
        if (iterationCount.current >= glitchIterations) {
          setDisplayText(text) // Ensure it resolves to original text
          cleanup() // Stop animation
          return
        }

        let glitched = ""
        const startIndex = Math.floor(text.length / 2) // Start glitch from middle

        for (let i = 0; i < text.length; i++) {
          // Gradually reduce glitch probability as iterations increase
          const glitchProbability = (glitchIterations - iterationCount.current) / glitchIterations
          if (i >= startIndex && Math.random() < glitchProbability) {
            glitched += getRandomChar()
          } else {
            glitched += text[i]
          }
        }
        setDisplayText(glitched)
        iterationCount.current++
      }

      animationIntervalRef.current = window.setInterval(animateGlitch, glitchSpeed)

      animationTimeoutRef.current = window.setTimeout(() => {
        setDisplayText(text) // Force resolve to original text after duration
        cleanup() // Stop animation
      }, duration)
    } else {
      // If shouldAnimate is false, ensure text is original and no animation is running
      setDisplayText(text)
    }

    return cleanup // Return cleanup function for unmount or dependency change
  }, [text, shouldAnimate, duration, glitchIterations, glitchSpeed])

  return <>{displayText}</>
}
