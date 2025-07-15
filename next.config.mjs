import createNextIntlPlugin from 'next-intl/plugin';

// Aponta para o seu arquivo i18n.ts na raiz do projeto
const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Adicione o basePath com o nome do seu repositório
  // Exemplo: se seu repositório é 'treantlab-modern', use '/treantlab-modern'
  basePath: '/website', // <--- ATUALIZE ESTA LINHA COM O NOME DO SEU REPOSITÓRIO
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Suas configurações existentes do Next.js (se houver)
  // ...
};

// É CRÍTICO que a sua configuração seja exportada através de withNextIntl
export default withNextIntl(nextConfig);
