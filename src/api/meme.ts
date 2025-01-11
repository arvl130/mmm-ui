import { z } from "zod"
import { fetchResponseToValidSchema } from "@/mappers/fetch-response"
import type { StoreMeme, UpdateMeme } from "@/types/meme"
import { MemeSchema } from "@/types/meme"
import { getCsrfToken } from "./auth"
import { KeywordSchema } from "@/types/keyword"

export async function getMemes({ q }: { q?: string | undefined }) {
  const response = await fetch(`/api/v1/memes?q=${q === undefined ? "" : q}`)

  return await fetchResponseToValidSchema({
    response,
    expectedSchema: z.object({
      message: z.string().min(1),
      result: MemeSchema.extend({
        keywords: KeywordSchema.array(),
      }).array(),
    }),
  })
}

export async function storeMeme(input: { meme: StoreMeme }) {
  const { result } = await getCsrfToken()
  const response = await fetch("/api/v1/memes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      [result.headerName]: result.token,
    },
    body: JSON.stringify({
      id: input.meme.id,
      keywords: Array.from(input.meme.keywords),
    }),
  })

  return await fetchResponseToValidSchema({
    response,
    expectedSchema: z.object({
      message: z.string().min(1),
      result: MemeSchema,
    }),
  })
}

export async function getMeme(input: { id: string }) {
  const response = await fetch(`/api/v1/memes/${input.id}`)

  return await fetchResponseToValidSchema({
    response,
    expectedSchema: z.object({
      message: z.string().min(1),
      result: MemeSchema,
    }),
  })
}

export async function updateMeme(input: { id: string; meme: UpdateMeme }) {
  const { result } = await getCsrfToken()
  const response = await fetch(`/api/v1/memes/${input.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      [result.headerName]: result.token,
    },
    body: JSON.stringify({
      keywords: Array.from(input.meme.keywords),
    }),
  })

  return await fetchResponseToValidSchema({
    response,
    expectedSchema: z.object({
      message: z.string().min(1),
      result: MemeSchema,
    }),
  })
}

export async function destroyMeme(input: { id: string }) {
  const { result } = await getCsrfToken()
  const response = await fetch(`/api/v1/memes/${input.id}`, {
    method: "DELETE",
    headers: {
      [result.headerName]: result.token,
    },
  })

  return await fetchResponseToValidSchema({
    response,
    expectedSchema: z.object({
      message: z.string().min(1),
    }),
  })
}
