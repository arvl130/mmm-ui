import { updateCurrentUserPassword } from "@/api/auth"
import { Button } from "@/components/ui/button"
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
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export function UpdatePasswordForm() {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")

  const { isPending, mutate } = useMutation({
    mutationFn: ({
      oldPassword,
      newPassword,
    }: {
      oldPassword: string
      newPassword: string
    }) => {
      return updateCurrentUserPassword({
        oldPassword,
        newPassword,
      })
    },
    onSuccess: ({ message }) => {
      toast.success(message)
      setOldPassword("")
      setNewPassword("")
    },
    onError: (e) => {
      if (e instanceof HttpError && e.code === 400) {
        toast.error("Incorrect password", {
          description: "Please enter the correct password.",
        })
      } else {
        handleErrorWithToast(e)
      }
    },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Password</CardTitle>
        <CardDescription>Here you can update your password.</CardDescription>
      </CardHeader>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          const formData = new FormData(e.currentTarget)
          const oldPassword = formData.get("old-password")
          const newPassword = formData.get("new-password")

          if (
            null === oldPassword ||
            oldPassword.toString() === "" ||
            null === newPassword ||
            newPassword.toString() === ""
          ) {
            toast.error("Please enter an email.")
            return
          }

          mutate({
            oldPassword: oldPassword.toString(),
            newPassword: newPassword.toString(),
          })
        }}
      >
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Old Password</Label>
            <Input
              type="password"
              name="old-password"
              value={oldPassword}
              onChange={(e) => {
                setOldPassword(e.currentTarget.value)
              }}
            />
          </div>
          <div className="space-y-2">
            <Label>New Password</Label>
            <Input
              type="password"
              name="new-password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.currentTarget.value)
              }}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="animate-spin mr-1" />}
            Save
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
