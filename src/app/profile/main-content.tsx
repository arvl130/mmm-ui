"use client"

import { Button } from "@/components/ui/button"
import { useCurrentUser } from "@/hooks/current-user"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { LogoutButton } from "../dashboard/logout-button"
import { LayoutDashboard } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UpdateEmailForm } from "./update-email-form"
import { UpdateAvatarForm } from "./update-avatar-form"
import { UpdatePasswordForm } from "./update-password-form"
import { usernameToInitials } from "@/mappers/username"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
                    {usernameToInitials(data.email)}
                  </div>
                ) : (
                  <Avatar className="size-9">
                    <AvatarImage src={data.avatarUrl} />
                    <AvatarFallback>
                      {usernameToInitials(data.email)}
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
                    <Link href="/dashboard">
                      <LayoutDashboard />
                      Dashboard
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
      <main className="max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-semibold">Edit Profile</h2>
        <UpdateAvatarForm user={data} />
        <UpdateEmailForm user={data} />
        <UpdatePasswordForm />
      </main>
    </>
  )
}
