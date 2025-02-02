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
import { HttpError } from "@/errors/http"

function Success(props: { user: User | null }) {
  const queryClient = useQueryClient()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const signInMutation = useMutation({
    mutationFn: async (input: { email: string; password: string }) => {
      return await signIn(input)
    },
    onSuccess: (data) => {
      setEmail("")
      setPassword("")

      queryClient.setQueryData(["current-user"], data.result)
      router.push("/dashboard")

      toast.success(data.message, {
        description: "Nice to see you. 😊",
      })
    },
    onError: (e) => {
      setPassword("")
      if (e instanceof HttpError && e.code === 403) {
        toast.error("Incorrect email or password.", {
          description: "Please enter the correct credentials.",
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
            const email = formData.get("email")
            const password = formData.get("password")

            if (email === null || password === null) {
              toast("Email or password is empty.")
              return
            }

            signInMutation.mutate({
              email: email.toString(),
              password: password.toString(),
            })
          }}
        >
          <CardContent className="space-y-4">
            <p className="text-sm">
              Don&apos;t have an account yet?{" "}
              <Link
                href="/signup"
                className="font-medium underline underline-offset-4"
              >
                Create an account
              </Link>{" "}
              instead.
            </p>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              <div className="text-sm flex justify-end">
                <Link
                  href="/forgot-password"
                  className="font-medium hover:underline underline-offset-4"
                >
                  Forgot password?
                </Link>
              </div>
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
