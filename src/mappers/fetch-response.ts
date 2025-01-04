import { UnexpectedFetchResultFormatError } from "@/errors/fetch-result"
import { HttpError } from "@/errors/http"
import type { FetchResult } from "@/types/fetch-result"
import type { AnyZodObject, z } from "zod"

async function fetchResponseToFetchResult(
  response: Response,
): Promise<FetchResult> {
  try {
    const responseText = await response.text()
    try {
      const responseJson = JSON.parse(responseText)
      return {
        format: "json",
        result: responseJson,
      }
    } catch {
      if (responseText === "") {
        return {
          format: "empty",
        }
      } else {
        return {
          format: "text",
          result: responseText,
        }
      }
    }
  } catch {
    return {
      format: "empty",
    }
  }
}

export async function fetchResponseToValidSchema<
  TExpectedSchema extends AnyZodObject,
>(input: { response: Response; expectedSchema: TExpectedSchema }) {
  if (!input.response.ok) {
    const fetchResult = await fetchResponseToFetchResult(input.response)

    throw new HttpError({
      message: `HTTP Error occured: ${input.response.statusText === "" ? "empty status text" : input.response.statusText} (code: ${input.response.status}).`,
      body: fetchResult,
      code: input.response.status,
    })
  }

  const fetchResult = await fetchResponseToFetchResult(input.response)
  if (fetchResult.format !== "json") {
    throw new UnexpectedFetchResultFormatError({
      expectedFormat: "json",
      received: fetchResult,
    })
  }

  return input.expectedSchema.parse(fetchResult.result) as z.infer<
    typeof input.expectedSchema
  >
}
