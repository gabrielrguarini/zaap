import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "zaap-bucket.s3.sa-east-1.amazonaws.com" },
      { hostname: "scontent.cdninstagram.com" },
      { hostname: "**.cdninstagram.com" },
    ],
    qualities: [20, 30, 75, 100],
  },
  reactCompiler: true,
  cacheComponents: true,
};

export default nextConfig;
