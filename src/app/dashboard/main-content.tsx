"use client"

import { Button } from "@/components/ui/button"
import { useCurrentUser } from "@/hooks/current-user"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { UploadModal } from "./upload-modal"
import { RecentMemes } from "./recent-memes"
import Link from "next/link"
import { LogoutButton } from "./logout-button"
import { Upload } from "lucide-react"

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
    <>
      <header className="h-20 border-b border-background flex">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
          <Link href="/">
            <h1 className="font-semibold">Meme Manager MMM</h1>
          </Link>
          <div className="flex gap-2">
            <LogoutButton />

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
        </div>
      </header>
      <main className="max-w-6xl mx-auto">
        <RecentMemes
          onOpenUploadModal={() => {
            setUploadIsOpen(true)
          }}
        />
      </main>
    </>
  )
}
