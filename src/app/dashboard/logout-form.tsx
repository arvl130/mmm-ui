"use client"

import { Button } from "@/components/ui/button"
import { signOut } from "@/api/auth"
import { getMemes } from "@/api/meme"
import type { User } from "@/types/user"
import { useCurrentUser } from "@/hooks/current-user"
import { Loader2 } from "lucide-react"
import { useQueryClient } from "@tanstack/react-query"
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

function Success(props: { user: User | null }) {
  const router = useRouter()
  const queryClient = useQueryClient()

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
            onClick={async () => {
              const { message } = await signOut()

              queryClient.setQueryData(["current-user"], null)
              router.push("/signin")

              toast(message)
            }}
          >
            Sign Out
          </Button>
          <Button
            type="button"
            onClick={async () => {
              try {
                const { message } = await getMemes()

                toast(message)
              } catch (e) {
                if (e instanceof Error) {
                  toast("Error occured", {
                    description: e.message,
                  })
                } else {
                  toast("Unknown Error occured", {
                    description: "Check the logs for more information.",
                  })

                  console.log("Unknown Error occured", e)
                }
              }
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
        <CardTitle>Login</CardTitle>
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
