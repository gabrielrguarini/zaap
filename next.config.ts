import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { hostname: "zaap-bucket.s3.sa-east-1.amazonaws.com" },
      { hostname: "scontent.cdninstagram.com" },
      { hostname: "**.cdninstagram.com" },
    ],
  },
};

export default nextConfig;
