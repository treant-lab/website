// components/background-overlay.tsx
import type React from "react"

export const BackgroundOverlay: React.FC = () => {
  return (
    // Este overlay será posicionado fixamente para cobrir toda a viewport.
    // O linear-gradient combina o escurecimento com a imagem de fundo.
    // Z-index 0 garante que ele fique atrás do conteúdo principal.
    <div
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('/static/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  )
}
