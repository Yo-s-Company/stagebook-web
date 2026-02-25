import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/stagebook-web', 
  trailingSlash: true,
  images: {
    unoptimized: true,
  }
};

export default nextConfig;