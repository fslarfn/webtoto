/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/company-profile', destination: '/company-profile/index.html' },
      { source: '/profile-produk', destination: '/profile-produk/index.html' },
    ]
  },
  images: {
    domains: [],
    formats: ['image/webp', 'image/avif'],
  },
}

module.exports = nextConfig
