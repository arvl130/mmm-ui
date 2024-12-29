"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { ReactNode } from "react"
import { useState } from "react"

export function Providers(props: { children: ReactNode }) {
  const [client] = useState(new QueryClient())

  return (
    <QueryClientProvider client={client}>{props.children}</QueryClientProvider>
  )
}
