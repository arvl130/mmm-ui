"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { useCurrentUser } from "@/hooks/current-user"
import { cn } from "@/lib/utils"
import {
  ChevronRight,
  CircleUserRound,
  LayoutDashboard,
  Loader2,
  TriangleAlert,
} from "lucide-react"
import Link from "next/link"

export function SignInOrDashboardButton() {
  const { status, data, refetch } = useCurrentUser()

  if (status === "pending")
    return (
      <span
        className={buttonVariants({
          className: "opacity-50 h-9 w-9 sm:w-auto",
        })}
      >
        <Loader2 className="sm:mr-1 animate-spin" />
        <span className="hidden sm:inline">Loading</span>
      </span>
    )

  if (status === "error")
    return (
      <Button
        type="button"
        variant="outline"
        className="opacity-50 h-9 w-9 sm:w-auto"
        onClick={() => {
          refetch()
        }}
      >
        <TriangleAlert className="sm:mr-1" />
        <span className="hidden sm:inline">Error</span>
      </Button>
    )

  if (data === null)
    return (
      <Link
        href="/signin"
        className={cn(buttonVariants(), "h-9 w-9 sm:w-auto")}
      >
        <span className="hidden sm:inline-flex items-center gap-x-1">
          Sign In <ChevronRight />
        </span>
        <CircleUserRound className="sm:hidden" />
      </Link>
    )

  return (
    <Link
      href="/dashboard"
      className={cn(buttonVariants(), "h-9 w-9 sm:w-auto")}
    >
      <span className="hidden sm:inline-flex items-center gap-x-1">
        Dashboard <ChevronRight />
      </span>
      <LayoutDashboard className="sm:hidden" />
    </Link>
  )
}
