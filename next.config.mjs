/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['fr', 'en', 'es', 'ru'],
    defaultLocale: 'fr',
    localeDetection: false
  },
  reactStrictMode: true,
};

export default nextConfig;