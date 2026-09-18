import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `standalone` is required by the Docker setup (node server.js). Enable it
  // only when building inside Docker so Vercel's native build stays unaffected.
  ...(process.env.NEXT_OUTPUT_MODE === "standalone" ? { output: "standalone" as const } : {}),
};

export default nextConfig;
