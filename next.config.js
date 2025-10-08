/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['image.tmdb.org', 'example.com'],
  },
  experimental: {
    optimizePackageImports: ['@tanstack/react-query'],
  },
}

module.exports = nextConfig
