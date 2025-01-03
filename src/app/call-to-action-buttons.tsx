"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { useCurrentUser } from "@/hooks/current-user"
import { Loader2, TriangleAlert } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export function CallToActionButtons() {
  const { status, data } = useCurrentUser()

  return (
    <div className="flex gap-3">
      <Button
        type="button"
        variant="outline"
        onClick={() => {
          toast("Boo!", {
            description: "That's no fun. 😩👎",
          })
        }}
      >
        No thanks
      </Button>
      {status === "pending" && (
        <span
          className={buttonVariants({
            className: "opacity-50",
          })}
        >
          <Loader2 className="mr-1 animate-spin" /> Try it out
        </span>
      )}
      {status === "error" && (
        <span
          className={buttonVariants({
            className: "opacity-50",
          })}
        >
          <TriangleAlert className="mr-1" /> Try it out
        </span>
      )}
      {status === "success" && (
        <Link
          href={data ? "/dashboard" : "/signin"}
          className={buttonVariants()}
        >
          Try it out
        </Link>
      )}
    </div>
  )
}
