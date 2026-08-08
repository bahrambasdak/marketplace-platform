import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
    images: {
    remotePatterns: [new URL('http://minio-classbon.darkube.app/**')],
  },
};

export default nextConfig;
