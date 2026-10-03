import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // 90 is reserved for full-width hero banners, where compression artifacts are visible.
    qualities: [75, 90],
  },
}

export default nextConfig
