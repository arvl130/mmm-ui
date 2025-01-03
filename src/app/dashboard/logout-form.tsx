"use client"

import { Button } from "@/components/ui/button"
import { signOut } from "@/api/auth"
import { getMemes } from "@/api/meme"
import type { User } from "@/types/user"
import { useCurrentUser } from "@/hooks/current-user"
import { Loader2 } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { handleErrorWithToast } from "@/lib/error-handling"

function Success(props: { user: User | null }) {
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

  const getMemesMutation = useMutation({
    mutationFn: async () => {
      return await getMemes()
    },
    onSuccess: (data) => {
      toast(data.message)
    },
    onError: (e) => {
      handleErrorWithToast(e)
    },
  })

  useEffect(() => {
    if (props.user === null) router.push("/signin")
  }, [props.user])

  if (props.user) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
          <CardDescription>Try clicking the buttons below.</CardDescription>
        </CardHeader>
        <CardFooter className="space-x-2">
          <Button
            type="button"
            className="transition-all"
            disabled={signOutMutation.isPending}
            onClick={() => {
              signOutMutation.mutate()
            }}
          >
            Sign Out
          </Button>
          <Button
            type="button"
            className="transition-all"
            disabled={getMemesMutation.isPending}
            onClick={() => {
              getMemesMutation.mutate()
            }}
          >
            Get memes
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent className="flex">
        <Loader2 className="animate-spin mr-2" /> Loading ...
      </CardContent>
    </Card>
  )
}

export function LogoutForm() {
  const { status, data, error } = useCurrentUser()

  if (status === "pending")
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
        </CardHeader>
        <CardContent className="flex">
          <Loader2 className="animate-spin mr-2" /> Loading ...
        </CardContent>
      </Card>
    )

  if (status === "error")
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
        </CardHeader>
        <CardContent>Error occured: {error.message}</CardContent>
      </Card>
    )

  return <Success user={data} />
}
