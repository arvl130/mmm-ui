"use client"

import { Button } from "@/components/ui/button"
import { Loader2, TriangleAlert, Upload } from "lucide-react"
import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useMemes } from "@/hooks/memes"
import { MemeList } from "./meme-list"
import { SearchForm } from "./search-form"
import { UploadModal } from "./upload-modal"

type TSearchMode = "SIMPLE" | "FULL_TEXT" | "SEMANTIC"

export function BrowseMemes() {
  const [uploadIsOpen, setUploadIsOpen] = useState(false)
  const searchParams = useSearchParams()
  const searchTerm = searchParams.get("q")
  const searchMode = searchParams.get("mode")
  const memes = useMemes({
    q: searchTerm === null ? undefined : searchTerm,
    mode: searchMode === null ? undefined : (searchMode as TSearchMode),
  })

  return (
    <Suspense>
      <div className="sm:flex justify-between space-y-2 sm:space-y-0">
        <h2 className="text-2xl font-semibold">Browse memes</h2>
        <Button
          type="button"
          onClick={() => {
            setUploadIsOpen(true)
          }}
        >
          <Upload />
          Upload
        </Button>
        <UploadModal open={uploadIsOpen} onOpenChange={setUploadIsOpen} />
      </div>
      <p className="mt-2 text-muted-foreground text-sm">
        Here you can view the memes you have uploaded.
      </p>
      <SearchForm />
      {memes.status === "pending" && (
        <div className="mt-24 space-y-2 flex justify-center items-center">
          <Loader2 className="animate-spin mr-2" /> Loading ...
        </div>
      )}
      {memes.status === "error" && (
        <div className="mt-24 space-y-2 flex flex-col items-center">
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
        <MemeList
          memes={memes.data}
          onOpenUploadModal={() => {
            setUploadIsOpen(true)
          }}
        />
      )}
    </Suspense>
  )
}
