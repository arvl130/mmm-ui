"use client"

import { Button } from "@/components/ui/button"
import { Loader2, TriangleAlert } from "lucide-react"
import { Suspense, useCallback } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useMemes } from "@/hooks/memes"
import { MemeList } from "./meme-list"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type TSearchMode = "SIMPLE" | "FULL_TEXT" | "SEMANTIC"

export function RecentMemes({
  onOpenUploadModal,
}: {
  onOpenUploadModal: () => void
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const searchTerm = searchParams.get("q")
  const searchMode = searchParams.get("mode")
  const memes = useMemes({
    q: searchTerm === null ? undefined : searchTerm,
    mode: searchMode === null ? undefined : (searchMode as TSearchMode),
  })

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  return (
    <Suspense>
      <h2 className="text-2xl font-semibold">Recent memes</h2>
      <p className="mt-1 text-muted-foreground text-sm">
        Browse your recently uploaded memes.
      </p>
      <div className="grid grid-cols-[auto_1fr] gap-2 mt-2">
        <Tabs
          defaultValue={
            searchMode === null ? "SIMPLE" : (searchMode as TSearchMode)
          }
          onValueChange={(value) => {
            router.push(pathname + "?" + createQueryString("mode", value))
          }}
        >
          <TabsList>
            <TabsTrigger value="SEMANTIC">AI</TabsTrigger>
            <TabsTrigger value="FULL_TEXT">Full Text</TabsTrigger>
            <TabsTrigger value="SIMPLE">Simple</TabsTrigger>
          </TabsList>
        </Tabs>

        <Input
          type="search"
          placeholder="Enter a tag ..."
          onChange={(e) => {
            router.push(
              pathname + "?" + createQueryString("q", e.currentTarget.value),
            )
          }}
        />
      </div>
      {memes.status === "pending" && (
        <div className="mt-4 flex">
          <Loader2 className="animate-spin mr-2" /> Loading ...
        </div>
      )}
      {memes.status === "error" && (
        <div className="mt-4 space-y-2 flex flex-col items-center">
          <TriangleAlert size={36} />
          <p>Error occured: {memes.error.message}</p>
          <Button
            type="button"
            disabled={memes.isPending}
            onClick={() => {
              memes.refetch()
            }}
          >
            Retry
          </Button>
        </div>
      )}
      {memes.status === "success" && (
        <MemeList memes={memes.data} onOpenUploadModal={onOpenUploadModal} />
      )}
    </Suspense>
  )
}
