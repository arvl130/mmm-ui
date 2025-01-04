import { z } from "zod"

export const UpdateMemeSchema = z.object({
  keywords: z.set(z.string().min(1)).nonempty(),
})

export const StoreMemeSchema = UpdateMemeSchema.extend({
  id: z.string().uuid(),
})

export const MemeSchema = z.object({
  id: z.string().uuid(),
  imgUrl: z.string().url(),
})

export type StoreMeme = z.infer<typeof StoreMemeSchema>
export type UpdateMeme = z.infer<typeof UpdateMemeSchema>
export type Meme = z.infer<typeof MemeSchema>
