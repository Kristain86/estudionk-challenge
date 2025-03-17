import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['.'],
  },
  devIndicators: false,
};

export default nextConfig;
