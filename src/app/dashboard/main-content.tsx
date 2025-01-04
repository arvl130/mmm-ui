"use client"

import { Button } from "@/components/ui/button"
import { Loader2, TriangleAlert } from "lucide-react"
import { useCurrentUser } from "@/hooks/current-user"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useMemes } from "@/hooks/memes"
import { MemeList } from "./meme-list"
import { UploadButton } from "./upload-button"

export function MainContent() {
  const router = useRouter()
  const { status, data } = useCurrentUser()
  const memes = useMemes()

  useEffect(() => {
    if (data === null) router.push("/signin")
  }, [data, router])

  if (status === "pending") return <div className="border-l" />
  if (status === "error") return <div className="border-l" />
  if (data === null) return <div className="border-l" />

  return (
    <div className="border-l px-8 py-6">
      <header>
        <div className="flex justify-between items-end">
          <h2 className="text-2xl font-semibold">Welcome</h2>
          <UploadButton />
        </div>
        <p className="mt-1 text-muted-foreground text-sm">
          Hello, there. We&apos;ve been waiting for you.
        </p>
      </header>
      <main className="mt-6">
        <h2 className="text-2xl font-semibold">Recent memes</h2>
        <p className="mt-1 text-muted-foreground text-sm">
          Browse your recently uploaded memes.
        </p>
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
        {memes.status === "success" && <MemeList memes={memes.data} />}
      </main>
    </div>
  )
}
