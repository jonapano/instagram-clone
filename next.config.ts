import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  turbopack: {
    // You can leave this empty or add future options here
  },
};

export default nextConfig;
