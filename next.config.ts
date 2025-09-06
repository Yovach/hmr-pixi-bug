import type { NextConfig } from "next";
import path from "node:path";

const __dirname = new URL(".", import.meta.url).pathname;

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  poweredByHeader: false,
  outputFileTracingRoot: path.join(__dirname),
  output: "standalone",
};

export default nextConfig;
