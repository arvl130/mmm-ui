"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { signIn } from "@/api/auth"
import type { User } from "@/types/user"
import { useCurrentUser } from "@/hooks/current-user"
import { ChevronLeft, Loader2 } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { handleErrorWithToast } from "@/lib/error-handling"
import Link from "next/link"

function Success(props: { user: User | null }) {
  const queryClient = useQueryClient()
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const signInMutation = useMutation({
    mutationFn: async (input: { username: string; password: string }) => {
      return await signIn({
        username: input.username,
        password: input.password,
      })
    },
    onSuccess: (data) => {
      setUsername("")
      setPassword("")

      queryClient.setQueryData(["current-user"], data.result)
      router.push("/dashboard")

      toast.success(data.message, {
        description: "Nice to see you. 😊",
      })
    },
    onError: (e) => {
      setPassword("")
      handleErrorWithToast(e)
    },
  })

  useEffect(() => {
    if (props.user) router.push("/dashboard")
  }, [props.user, router])

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        {props.user === null && (
          <CardDescription>
            Enter your credentials to access your account.
          </CardDescription>
        )}
      </CardHeader>
      {props.user === null ? (
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            const username = formData.get("username")
            const password = formData.get("password")

            if (username === null || password === null) {
              toast("Username or password is empty.")
              return
            }

            signInMutation.mutate({
              username: username.toString(),
              password: password.toString(),
            })
          }}
        >
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              type="submit"
              className="w-full transition-all"
              disabled={signInMutation.isPending}
            >
              {signInMutation.isPending && <Loader2 className="animate-spin" />}
              Sign In
            </Button>
            <Link
              href="/"
              className={buttonVariants({
                variant: "ghost",
                className: "w-full",
              })}
            >
              <ChevronLeft /> Back to home page
            </Link>
          </CardFooter>
        </form>
      ) : (
        <CardContent className="flex">
          <Loader2 className="animate-spin mr-2" /> Loading ...
        </CardContent>
      )}
    </Card>
  )
}

export function LoginForm() {
  const { status, data, error } = useCurrentUser()

  if (status === "pending")
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

  if (status === "error")
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>Error occured: {error.message}</CardContent>
      </Card>
    )

  return <Success user={data} />
}
