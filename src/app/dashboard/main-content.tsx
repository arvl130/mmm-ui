"use client"

import { Button } from "@/components/ui/button"
import { useCurrentUser } from "@/hooks/current-user"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { UploadModal } from "./upload-modal"
import { RecentMemes } from "./recent-memes"

export function MainContent() {
  const router = useRouter()
  const { status, data } = useCurrentUser()
  const [uploadIsOpen, setUploadIsOpen] = useState(false)

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
          <Button
            type="button"
            onClick={() => {
              setUploadIsOpen(true)
            }}
          >
            Upload
          </Button>
          <UploadModal open={uploadIsOpen} onOpenChange={setUploadIsOpen} />
        </div>
        <p className="mt-1 text-muted-foreground text-sm">
          Hello, there. We&apos;ve been waiting for you.
        </p>
      </header>
      <main className="mt-6">
        <RecentMemes
          onOpenUploadModal={() => {
            setUploadIsOpen(true)
          }}
        />
      </main>
    </div>
  )
}
