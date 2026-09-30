import type { NextConfig } from "next";

const backend = Boolean(process.env.DATABASE_URL && process.env.AUTH_SECRET && process.env.AUTH_SECRET.length >= 32);

const nextConfig: NextConfig = {
  devIndicators: false,
  env: { NEXT_PUBLIC_BACKEND: backend ? "1" : "" },
};

export default nextConfig;
