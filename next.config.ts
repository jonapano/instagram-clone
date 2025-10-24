import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  experimental: {
    turbo: {
      rules: {}, // empty instead of false
    },
  },
  webpack: (config) => {
    return config; // ensures Webpack is used
  },
};

export default nextConfig;
