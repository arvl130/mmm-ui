"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { useCurrentUser } from "@/hooks/current-user"
import { ChevronRight, Loader2, TriangleAlert } from "lucide-react"
import Link from "next/link"

export function SignInOrDashboardButton() {
  const { status, data, refetch } = useCurrentUser()

  if (status === "pending")
    return (
      <span
        className={buttonVariants({
          variant: "outline",
          className: "opacity-50",
        })}
      >
        <Loader2 className="mr-1 animate-spin" /> Loading
      </span>
    )

  if (status === "error")
    return (
      <Button
        type="button"
        variant="outline"
        className="opacity-50"
        onClick={() => {
          refetch()
        }}
      >
        <TriangleAlert className="mr-1" /> Error
      </Button>
    )

  if (data === null)
    return (
      <Link href="/signin" className={buttonVariants()}>
        Sign In <ChevronRight />
      </Link>
    )

  return (
    <Link href="/dashboard" className={buttonVariants()}>
      Dashboard <ChevronRight />
    </Link>
  )
}
