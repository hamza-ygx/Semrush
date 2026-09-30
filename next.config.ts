import type { NextConfig } from "next";

const backend = Boolean(process.env.DATABASE_URL && process.env.AZURE_AD_TENANT_ID && process.env.AZURE_AD_CLIENT_ID && process.env.AZURE_AD_CLIENT_SECRET && process.env.AUTH_SECRET);

const nextConfig: NextConfig = {
  devIndicators: false,
  env: { NEXT_PUBLIC_BACKEND: backend ? "1" : "" },
};

export default nextConfig;
