import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const serverEnv = createEnv({
  server: {
    BACKEND_URL: z.string().url(),
  },
  runtimeEnv: {
    BACKEND_URL: process.env.BACKEND_URL,
  },
})
