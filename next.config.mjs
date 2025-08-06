/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'fr', 'es', 'ru'],
    defaultLocale: 'en',
    localeDetection: true
  },
  reactStrictMode: true,
};

export default nextConfig;