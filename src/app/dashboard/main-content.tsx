"use client"

import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { Upload, Wind } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCurrentUser } from "@/hooks/current-user"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function MainContent() {
  const router = useRouter()
  const { status, data } = useCurrentUser()

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
          <Link href="/memes/create" className={buttonVariants()}>
            <Upload /> Upload
          </Link>
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
        <div className="flex flex-col justify-center items-center pt-24">
          <Wind className="text-zinc-400" size={128} />
          <p className="text-muted-foreground mt-4 max-w-sm text-center">
            It looks like there are no memes at the moment. Try uploading your
            first meme.
          </p>
          <Link
            href="/memes/create"
            className={cn(
              buttonVariants({
                variant: "outline",
              }),
              "mt-4",
            )}
          >
            <Upload /> Upload
          </Link>
        </div>
      </main>
    </div>
  )
}
