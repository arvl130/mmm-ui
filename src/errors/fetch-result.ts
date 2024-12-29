import type { FetchResult, FetchResultFormat } from "@/types/fetch-result"

export class UnexpectedFetchResultFormatError extends Error {
  expectedFormat: FetchResultFormat
  received: FetchResult

  constructor(input: {
    expectedFormat: FetchResultFormat
    received: FetchResult
  }) {
    super(
      `Unexpected fetch result format: Expected ${input.expectedFormat}, but got ${input.received.format}.`,
    )

    this.expectedFormat = input.expectedFormat
    this.received = input.received
  }
}
