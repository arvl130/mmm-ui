import { updateCurrentUserEmail } from "@/api/auth"
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
import type { User } from "@/types/user"
import { useMutation } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export function UpdateEmailForm({ user }: { user: User }) {
  const [email, setEmail] = useState(user.email)
  const { isPending, mutate } = useMutation({
    mutationFn: ({ newEmail }: { newEmail: string }) => {
      return updateCurrentUserEmail({
        newEmail,
      })
    },
    onSuccess: ({ message }) => {
      toast.success(message)
    },
    onError: (e) => {
      if (e instanceof HttpError && e.code === 409) {
        toast.error("Conflict", {
          description: "Please enter another email.",
        })
      } else {
        handleErrorWithToast(e)
      }
    },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Email</CardTitle>
        <CardDescription>Here you can update your email.</CardDescription>
      </CardHeader>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          const formData = new FormData(e.currentTarget)
          const newEmail = formData.get("email")

          if (null === newEmail || newEmail.toString() === "") {
            toast.error("Please enter an email.")
            return
          }

          mutate({
            newEmail: newEmail.toString(),
          })
        }}
      >
        <CardContent>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="text"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.currentTarget.value)
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
