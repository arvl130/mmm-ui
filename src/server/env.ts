import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const serverEnv = createEnv({
  server: {
    BACKEND_URL: z.string().url(),
    ASSET_HOST: z.string().min(1),
  },
  runtimeEnv: {
    BACKEND_URL: process.env.BACKEND_URL,
    ASSET_HOST: process.env.ASSET_HOST,
  },
})
