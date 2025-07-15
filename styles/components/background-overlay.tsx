// components/background-overlay.tsx
import type React from "react"

export const BackgroundOverlay: React.FC = () => {
  return (
    // Este overlay será posicionado absolutamente dentro do seu pai relativo
    // e terá um z-index baixo para ficar atrás do conteúdo principal.
    <div className="absolute inset-0 bg-black/80 pointer-events-none z-0" />
  )
}
