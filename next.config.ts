import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.gsmarena.com',
      },
      {
        protocol: 'https',
        hostname: '*.phonebunch.com',
      },
    ],
  },
}

export default nextConfig
