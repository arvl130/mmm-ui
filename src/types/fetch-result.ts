import { z } from "zod"

const textResult = z.object({
  format: z.literal("text"),
  result: z.string(),
})

const jsonResult = z.object({
  format: z.literal("json"),
  result: z.record(z.string(), z.unknown()),
})

const emptyResult = z.object({
  format: z.literal("empty"),
})

export const FetchResultSchema = z.discriminatedUnion("format", [
  textResult,
  jsonResult,
  emptyResult,
])

export type FetchResult = z.infer<typeof FetchResultSchema>
export type FetchResultFormat = "text" | "json" | "empty"
