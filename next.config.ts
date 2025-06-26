import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',   // allow any path on that host
      },
    ],
    // If you’re still on Next ≤12 you’d use:
    // domains: ['images.pexels.com'],
  },
};

export default nextConfig;
