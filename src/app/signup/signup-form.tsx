"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { signUp } from "@/api/auth"
import type { User } from "@/types/user"
import { useCurrentUser } from "@/hooks/current-user"
import { ChevronLeft, Loader2 } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
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
import { HttpError } from "@/errors/http"

function Success(props: { user: User | null }) {
  const router = useRouter()
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const signUpMutation = useMutation({
    mutationFn: async (input: {
      name: string
      username: string
      password: string
    }) => {
      return await signUp(input)
    },
    onSuccess: (data) => {
      setUsername("")
      setPassword("")

      router.push("/signin")

      toast.success(data.message, {
        description: "You may now login to your account.",
      })
    },
    onError: (e) => {
      setPassword("")
      if (e instanceof HttpError && e.code === 412) {
        toast.error("Precondition failed", {
          description: "This email is already taken. Please use another email.",
        })
      } else {
        handleErrorWithToast(e)
      }
    },
  })

  useEffect(() => {
    if (props.user) router.push("/dashboard")
  }, [props.user, router])

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        {props.user === null && (
          <CardDescription>
            Enter the following details to create an account.
          </CardDescription>
        )}
      </CardHeader>
      {props.user === null ? (
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            const name = formData.get("name")
            const username = formData.get("username")
            const password = formData.get("password")

            if (name === null || username === null || password === null) {
              toast("Username or password is empty.")
              return
            }

            signUpMutation.mutate({
              name: name.toString(),
              username: username.toString(),
              password: password.toString(),
            })
          }}
        >
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
              disabled={signUpMutation.isPending}
            >
              {signUpMutation.isPending && <Loader2 className="animate-spin" />}
              Sign Up
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

export function SignUpForm() {
  const { status, data, error } = useCurrentUser()

  if (status === "pending")
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
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
          <CardTitle>Sign up</CardTitle>
        </CardHeader>
        <CardContent>Error occured: {error.message}</CardContent>
      </Card>
    )

  return <Success user={data} />
}
