import createNextIntlPlugin from 'next-intl/plugin';

// Aponta para o seu arquivo i18n.ts na raiz do projeto
const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/website' : '',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagsapi.com',
      },
    ],
  },
  trailingSlash: true,
};

// É CRÍTICO que a sua configuração seja exportada através de withNextIntl
export default withNextIntl(nextConfig);
