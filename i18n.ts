import { getRequestConfig } from "next-intl/server"

export default getRequestConfig(async ({ locale }) => {
  // Use o locale fornecido ou 'pt' como fallback.
  // O ideal é que 'locale' nunca seja undefined se o middleware estiver funcionando.
  const resolvedLocale = locale ?? "pt"

  return {
    messages: (await import(`./messages/${resolvedLocale}.json`)).default,
    locale: resolvedLocale, // Adiciona a propriedade 'locale' exigida pelo tipo RequestConfig
  }
})
