import { serverEnv } from "./src/server/env"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${serverEnv.BACKEND_URL}/:path*`, // Proxy all requests to /api/* to backend.
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        hostname: serverEnv.ASSET_HOST,
      },
    ],
  },
}

export default nextConfig
