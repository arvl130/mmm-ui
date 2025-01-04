import { z } from "zod"

export const KeywordSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
})

export type Keyword = z.infer<typeof KeywordSchema>
