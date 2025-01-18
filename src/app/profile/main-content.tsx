"use client"

import { Button } from "@/components/ui/button"
import { useCurrentUser } from "@/hooks/current-user"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { LogoutButton } from "../dashboard/logout-button"
import { EllipsisVertical, LayoutDashboard } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UpdateEmailForm } from "./update-email-form"
import { UpdateAvatarForm } from "./update-avatar-form"
import { UpdatePasswordForm } from "./update-password-form"

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
      <header className="sm:h-20 py-4 sm:py-0 border-b border-background flex">
        <div className="max-w-6xl mx-auto w-full flex flex-col gap-y-4 sm:gap-y-0 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/">
            <h1 className="font-semibold">Meme Manager MMM</h1>
          </Link>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button type="button" variant="outline" size="icon">
                  <EllipsisVertical />
                  <span className="sr-only">Options</span>
                </Button>
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
        <UpdateAvatarForm />
        <UpdateEmailForm user={data} />
        <UpdatePasswordForm />
      </main>
    </>
  )
}
