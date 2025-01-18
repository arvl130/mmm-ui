"use client"

import { Button } from "@/components/ui/button"
import { Loader2, TriangleAlert } from "lucide-react"
import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { useMemes } from "@/hooks/memes"
import { MemeList } from "./meme-list"
import { SearchForm } from "./search-form"

type TSearchMode = "SIMPLE" | "FULL_TEXT" | "SEMANTIC"

export function RecentMemes({
  onOpenUploadModal,
}: {
  onOpenUploadModal: () => void
}) {
  const searchParams = useSearchParams()
  const searchTerm = searchParams.get("q")
  const searchMode = searchParams.get("mode")
  const memes = useMemes({
    q: searchTerm === null ? undefined : searchTerm,
    mode: searchMode === null ? undefined : (searchMode as TSearchMode),
  })

  return (
    <Suspense>
      <h2 className="text-2xl font-semibold">Recent memes</h2>
      <p className="mt-1 text-muted-foreground text-sm">
        Browse your recently uploaded memes.
      </p>
      <SearchForm />
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
