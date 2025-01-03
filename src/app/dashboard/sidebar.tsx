"use client"

import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { Loader2, LogOut } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { signOut } from "@/api/auth"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { handleErrorWithToast } from "@/lib/error-handling"
import { useCurrentUser } from "@/hooks/current-user"

function SidebarLink({ label, path }: { label: string; path: string }) {
  const pathname = usePathname()

  return (
    <Link
      href={path}
      className={cn(
        buttonVariants({
          variant: "ghost",
        }),
        `justify-normal w-full ${pathname === path ? "bg-accent text-accent-foreground" : ""}`,
      )}
    >
      {label}
    </Link>
  )
}

export function Sidebar() {
  const { status, data } = useCurrentUser()
  const router = useRouter()
  const queryClient = useQueryClient()
  const signOutMutation = useMutation({
    mutationFn: async () => {
      return await signOut()
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["current-user"], null)
      router.push("/signin")

      toast.info(data.message, {
        description: "See ya later! 🐊",
      })
    },
    onError: (e) => {
      handleErrorWithToast(e)
    },
  })

  if (status === "pending") return <nav />
  if (status === "error") return <nav />
  if (data === null) return <nav />

  return (
    <nav className="px-3 py-6 flex flex-col">
      <h1 className="text-lg px-4 mb-2 font-semibold">
        <Link href="/">MMM</Link>
      </h1>
      <div className="space-y-1">
        <SidebarLink label="Dashboard" path="/dashboard" />
        <SidebarLink label="Memes" path="/memes" />
        <SidebarLink label="Profile" path="/profile" />
      </div>
      <div className="mt-auto">
        <Button
          type="button"
          variant="ghost"
          className="w-full justify-normal"
          disabled={signOutMutation.isPending}
          onClick={() => signOutMutation.mutate()}
        >
          {signOutMutation.isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <LogOut />
          )}
          Logout
        </Button>
      </div>
    </nav>
  )
}
