import { destroyCurrentUserAvatar, storeCurrentUserAvatar } from "@/api/auth"
import { getUserAvatarUploadUrl, putObjectToUploadUrl } from "@/api/upload-url"
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
import { ACCEPTED_FILE_TYPES } from "@/lib/constants"
import { handleErrorWithToast } from "@/lib/error-handling"
import type { User } from "@/types/user"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"

export function UpdateAvatarForm({ user }: { user: User }) {
  const queryClient = useQueryClient()
  const getUrlMutation = useMutation({
    mutationFn: async ({ file }: { file: File }) => {
      const result = await getUserAvatarUploadUrl()

      return {
        ...result,
        file,
      }
    },
    onSuccess: async ({ file, result: { url } }) => {
      uploadMutation.mutate({
        file,
        url,
      })
    },
    onError: (e) => handleErrorWithToast(e),
  })

  const uploadMutation = useMutation({
    mutationFn: async ({ file, url }: { file: File; url: string }) => {
      await putObjectToUploadUrl({
        file,
        url,
      })
    },
    onSuccess: async () => {
      storeMutation.mutate()
    },
    onError: (e) => handleErrorWithToast(e),
  })

  const storeMutation = useMutation({
    mutationFn: () => {
      return storeCurrentUserAvatar()
    },
    onSuccess: ({ message }) => {
      toast.success(message)
      queryClient.invalidateQueries({ queryKey: ["current-user"] })
    },
    onError: (e) => handleErrorWithToast(e),
  })

  const destroyMutation = useMutation({
    mutationFn: () => {
      return destroyCurrentUserAvatar()
    },
    onSuccess: ({ message }) => {
      toast.success(message)
      queryClient.invalidateQueries({ queryKey: ["current-user"] })
    },
    onError: (e) => handleErrorWithToast(e),
  })

  const isPendingStore =
    getUrlMutation.isPending ||
    uploadMutation.isPending ||
    storeMutation.isPending
  const isPending = isPendingStore || destroyMutation.isPending

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Avatar</CardTitle>
        <CardDescription>Here you can update your avatar.</CardDescription>
      </CardHeader>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.currentTarget)
          const avatar = formData.get("avatar")

          if (null == avatar) {
            toast.error("No file selected")
            return
          }

          const file = avatar.valueOf() as File
          if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
            toast.error("Selected file should be in PNG or JPEG format.")
            return
          }

          getUrlMutation.mutate({
            file,
          })
        }}
      >
        <CardContent className="space-y-4">
          {user.avatarUrl === null ? (
            <p>No avatar set.</p>
          ) : (
            <Image
              src={user.avatarUrl}
              alt="Your user avatar."
              className="size-20 rounded-full"
              height={80}
              width={80}
            />
          )}
          <div className="space-y-2">
            <Label>Avatar</Label>
            <Input
              type="file"
              name="avatar"
              className={isPending ? "pointer-events-none opacity-50" : ""}
            />
          </div>
        </CardContent>
        <CardFooter
          className={`flex ${user.avatarUrl === null ? "justify-end" : "justify-between"}`}
        >
          {user.avatarUrl !== null && (
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                destroyMutation.mutate()
              }}
              disabled={isPending}
            >
              {destroyMutation.isPending && (
                <Loader2 className="animate-spin mr-1" />
              )}
              Delete
            </Button>
          )}
          <Button type="submit" disabled={isPending}>
            {isPendingStore && <Loader2 className="animate-spin mr-1" />}
            Save
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
