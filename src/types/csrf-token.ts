import { z } from "zod"

export const CsrfTokenSchema = z.object({
  token: z.string().min(1),
  parameterName: z.string().min(1),
  headerName: z.string().min(1),
})

export type CsrfToken = z.infer<typeof CsrfTokenSchema>
