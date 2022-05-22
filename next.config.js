/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
    experimental: {
      outputStandalone: true,
    },
  swcMinify: false
}

module.exports = nextConfig
