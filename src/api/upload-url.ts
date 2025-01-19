import { z } from "zod"
import {
  fetchResponseToEmptyOK,
  fetchResponseToValidSchema,
} from "@/mappers/fetch-response"

export async function getMemeUploadUrl() {
  const response = await fetch("/api/v1/upload-urls/memes")

  return await fetchResponseToValidSchema({
    response,
    expectedSchema: z.object({
      message: z.string().min(1),
      result: z.object({
        url: z.string().url(),
        expiresAt: z.string().min(1),
        id: z.string().uuid(),
      }),
    }),
  })
}

export async function getUserAvatarUploadUrl() {
  const response = await fetch("/api/v1/upload-urls/user/avatar")

  return await fetchResponseToValidSchema({
    response,
    expectedSchema: z.object({
      message: z.string().min(1),
      result: z.object({
        url: z.string().url(),
        expiresAt: z.string().min(1),
      }),
    }),
  })
}

export async function putObjectToUploadUrl({
  url,
  file,
}: {
  url: string
  file: File
}) {
  const response = await fetch(url, {
    method: "PUT",
    body: file,
  })

  await fetchResponseToEmptyOK({
    response,
  })
}
