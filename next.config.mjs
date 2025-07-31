/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr'
    // ❌ localeDetection: true => à retirer ou mettre false
  },
  reactStrictMode: true,
};

export default nextConfig;
