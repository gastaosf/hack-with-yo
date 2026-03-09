import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow @yo-protocol packages (they ship ESM)
  transpilePackages: ["@yo-protocol/core", "@yo-protocol/react"],
};

export default nextConfig;
