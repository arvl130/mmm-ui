import type { FetchResult } from "@/types/fetch-result"

export class HttpError extends Error {
  body: FetchResult
  code: number = 500

  constructor(input: {
    message: string
    body: FetchResult
    code?: number | undefined
  }) {
    super(input.message)

    this.body = input.body
    if (input.code) this.code = input.code
  }
}
