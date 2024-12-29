import { z } from "zod"

export const MemeSchema = z.object({
  id: z.string().min(1),
})

export type Meme = z.infer<typeof MemeSchema>
