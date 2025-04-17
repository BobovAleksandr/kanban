import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.imageban.ru',
      },
    ],
  },
};

export default nextConfig;
