"use client"

import { resetPassword } from "@/api/auth"
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
import { Label } from "@/components/ui/label"
import { HttpError } from "@/errors/http"
import { handleErrorWithToast } from "@/lib/error-handling"
import { useMutation } from "@tanstack/react-query"
import { ChevronLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export function PasswordResetForm({ token }: { token: string }) {
  const router = useRouter()
  const [newPassword, setNewPassword] = useState("")

  const resetPasswordMutation = useMutation({
    mutationFn: async (input: { newPassword: string }) => {
      return await resetPassword({ token, newPassword: input.newPassword })
    },
    onSuccess: (data) => {
      setNewPassword("")

      router.replace("/signin")
      toast.success(data.message, {
        description: "Your password has been reset.",
      })
    },
    onError: (e) => {
      if (e instanceof HttpError && e.code === 400) {
        toast.error("Invalid token", {
          description: "Your reset link has expired. Please request a new one.",
          action: {
            label: "New Request",
            onClick: () => {
              router.replace("/forgot-password")
            },
          },
        })
      } else {
        handleErrorWithToast(e)
      }
    },
  })

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>
          Enter your new password below to update your credentials.
        </CardDescription>
      </CardHeader>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          const formData = new FormData(e.currentTarget)
          const newPassword = formData.get("new-password")

          if (newPassword === null || newPassword.toString() === "") {
            toast("Please enter your new password.")
            return
          }

          resetPasswordMutation.mutate({
            newPassword: newPassword.toString(),
          })
        }}
      >
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              name="new-password"
              type="password"
              placeholder="Enter your new password ..."
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full transition-all"
            disabled={resetPasswordMutation.isPending}
          >
            {resetPasswordMutation.isPending && (
              <Loader2 className="animate-spin" />
            )}
            Reset Password
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
