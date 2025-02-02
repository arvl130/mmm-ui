"use client"

import { sendPasswordResetLink } from "@/api/auth"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { HttpError } from "@/errors/http"
import { handleErrorWithToast } from "@/lib/error-handling"
import { Label } from "@radix-ui/react-label"
import { useMutation } from "@tanstack/react-query"
import { ChevronLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"

export function PasswordResetLinkForm() {
  const [email, setEmail] = useState("")

  const sendPasswordResetLinkMutation = useMutation({
    mutationFn: async (input: { email: string }) => {
      return await sendPasswordResetLink(input)
    },
    onSuccess: (data) => {
      setEmail("")

      toast.success(data.message, {
        description: "Your password reset link has been sent.",
      })
    },
    onError: (e) => {
      if (e instanceof HttpError && e.code === 412) {
        toast.error("No such email.", {
          description: "We could not find this email in our records.",
        })
      } else {
        handleErrorWithToast(e)
      }
    },
  })

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Request Password Reset</CardTitle>
        <CardDescription>
          Enter your email below and we will send you a password reset link.
        </CardDescription>
      </CardHeader>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          const formData = new FormData(e.currentTarget)
          const email = formData.get("email")

          if (email === null || email.toString() === "") {
            toast("Please enter your email.")
            return
          }

          sendPasswordResetLinkMutation.mutate({
            email: email.toString(),
          })
        }}
      >
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email ..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full transition-all"
            disabled={sendPasswordResetLinkMutation.isPending}
          >
            {sendPasswordResetLinkMutation.isPending && (
              <Loader2 className="animate-spin" />
            )}
            Send Password Reset Link
          </Button>
          <Link
            href="/signin"
            className={buttonVariants({
              variant: "ghost",
              className: "w-full",
            })}
          >
            <ChevronLeft /> Back to Login page
          </Link>
        </CardFooter>
      </form>
    </Card>
  )
}
