import type { NextConfig } from 'next'

const apiUrl = new URL(process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001')

const nextConfig: NextConfig = {
  images: {
    // 90 is reserved for full-width hero banners, where compression artifacts are visible.
    qualities: [75, 90],
    // Product images are served by the API under /files.
    remotePatterns: [
      {
        protocol: apiUrl.protocol.replace(':', '') as 'http' | 'https',
        hostname: apiUrl.hostname,
        port: apiUrl.port,
        pathname: '/files/**',
      },
    ],
    // The image optimizer blocks local addresses by default. Allow them only when the API itself is local
    // (development or a local production build); a deployed API has a public hostname.
    dangerouslyAllowLocalIP: ['localhost', '127.0.0.1'].includes(apiUrl.hostname),
  },
}

export default nextConfig
