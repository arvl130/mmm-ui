import { z } from "zod"
import { fetchResponseToValidSchema } from "@/mappers/fetch-response"
import { getCsrfToken } from "./auth"

export async function getKeywordSuggestions({ file }: { file: File }) {
  const { result } = await getCsrfToken()
  const body = new FormData()
  body.append("file", file)

  const response = await fetch("/api/v1/keywords/suggestions", {
    method: "POST",
    headers: {
      [result.headerName]: result.token,
    },
    body,
  })

  return await fetchResponseToValidSchema({
    response,
    expectedSchema: z.object({
      message: z.string().min(1),
      reply: z.string().array(),
    }),
  })
}

export async function getEditKeywordSuggestions({
  memeId,
}: {
  memeId: string
}) {
  const response = await fetch(`/api/v1/memes/${memeId}/keyword-suggestions`)

  return await fetchResponseToValidSchema({
    response,
    expectedSchema: z.object({
      message: z.string().min(1),
      reply: z.string().array(),
    }),
  })
}
