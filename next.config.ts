import type { NextConfig } from "next";
import path from "node:path";
import webpack from "webpack";

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
  webpack(config) {
    if (config.plugins != null) {
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
          resource.request = resource.request.replace(/^node:/, "");
        }),
      );
    }

    return config;
  }
};

export default nextConfig;
