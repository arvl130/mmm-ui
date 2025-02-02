"use client"

import { Button } from "@/components/ui/button"
import { useCurrentUser } from "@/hooks/current-user"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { BrowseMemes } from "./browse-memes"
import Link from "next/link"
import { LogoutButton } from "./logout-button"
import { CircleUserRound } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { usernameToInitials } from "@/mappers/username"

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
    <>
      <header className="h-20 py-4 sm:py-0 border-b border-background flex">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
          <Link href="/">
            <h1 className="font-semibold">Meme Manager MMM</h1>
          </Link>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {data.avatarUrl === null ? (
                  <div className="bg-muted size-9 border flex items-center justify-center rounded-full">
                    {usernameToInitials(data.name)}
                  </div>
                ) : (
                  <Avatar className="size-9">
                    <AvatarImage src={data.avatarUrl} />
                    <AvatarFallback>
                      {usernameToInitials(data.name)}
                    </AvatarFallback>
                  </Avatar>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-normal px-2"
                    asChild
                  >
                    <Link href="/profile">
                      <CircleUserRound />
                      Profile
                    </Link>
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <LogoutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto">
        <BrowseMemes />
      </main>
    </>
  )
}
