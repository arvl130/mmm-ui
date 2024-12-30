import { z } from "zod"

export const StoreMemeSchema = z.object({
  imgUrl: z.string().url(),
})

export const UpdateMemeSchema = z.object({
  imgUrl: z.string().url(),
})

export const MemeSchema = StoreMemeSchema.extend({
  id: z.string().uuid(),
})

export type StoreMeme = z.infer<typeof StoreMemeSchema>
export type UpdateMeme = z.infer<typeof UpdateMemeSchema>
export type Meme = z.infer<typeof MemeSchema>
