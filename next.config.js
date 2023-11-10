/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['media.graphassets.com'],
  },
  i18n: {
    locales: ['vi', 'en'],
    defaultLocale: 'vi',
  },
};

module.exports = nextConfig;
