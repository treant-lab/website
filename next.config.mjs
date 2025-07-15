import createNextIntlPlugin from 'next-intl/plugin';

// Aponta para o seu arquivo i18n.ts na raiz do projeto
const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // O basePath deve ser o nome do seu repositório no GitHub Pages
  // Se o seu repositório é 'treant-lab/website', o basePath é '/website'
  basePath: '/website/docs',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Define o diretório de saída para a exportação estática
  distDir: 'docs',
  // Suas configurações existentes do Next.js (se houver)
  // ...
};

// É CRÍTICO que a sua configuração seja exportada através de withNextIntl
export default withNextIntl(nextConfig);
