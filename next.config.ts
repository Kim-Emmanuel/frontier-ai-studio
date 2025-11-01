import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Set turbopack.root to the project directory to avoid Next.js inferring
  // a workspace root from nearby lockfiles (silences the multiple-lockfile warning).
  // Use a relative path from this config file — "./" points to the project root.
  turbopack: {
    // Use an absolute path as requested to explicitly define the Turbopack root.
    root: "/home/codiana/frontier-ai-studio",
  },
};

export default nextConfig;
