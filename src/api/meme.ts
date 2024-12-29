import { z } from "zod"
import { fetchResponseToValidSchema } from "@/mappers/fetch-response"
import { MemeSchema } from "@/types/meme"

export async function getMemes() {
  const response = await fetch("/api/v1/memes")

  return await fetchResponseToValidSchema({
    response,
    expectedSchema: z.object({
      message: z.string().min(1),
      result: MemeSchema.array(),
    }),
  })
}
