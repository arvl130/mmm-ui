import { z } from "zod"

export const StoreMemeSchema = z.object({
  id: z.string().uuid(),
  keywords: z.set(z.string().min(1)).nonempty(),
})

export const UpdateMemeSchema = z.object({})

export const MemeSchema = z.object({
  id: z.string().uuid(),
  imgUrl: z.string().url(),
})

export type StoreMeme = z.infer<typeof StoreMemeSchema>
export type UpdateMeme = z.infer<typeof UpdateMemeSchema>
export type Meme = z.infer<typeof MemeSchema>
