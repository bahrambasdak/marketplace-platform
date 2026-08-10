import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: { authInterrupts: true },

  images: {
    remotePatterns: [new URL("http://minio-classbon.darkube.app/**")],
  },
};

export default nextConfig;
