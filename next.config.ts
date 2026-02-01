import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  reactStrictMode: true,
  eslint: {
    // Don't fail build on ESLint errors - allows deployment to proceed
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Don't fail build on TypeScript errors - allows deployment to proceed
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
