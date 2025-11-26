import type { NextConfig } from "next";
import { env } from "@/env";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: `${env.AWS_BUCKET_NAME}.s3.${env.AWS_REGION}.amazonaws.com` },
      { hostname: `zaap-bucket.s3.${env.AWS_REGION}.amazonaws.com` },
      { hostname: "scontent.cdninstagram.com" },
      { hostname: "**.cdninstagram.com" },
    ],
    qualities: [20, 30, 75, 100],
  },
  reactCompiler: true,
};

export default nextConfig;
