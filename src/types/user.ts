import { z } from "zod"

export const UserSchema = z.object({
  id: z.string().min(1),
  email: z.string().email(),
  avatarUrl: z.string().url().nullable(),
})

export type User = z.infer<typeof UserSchema>
