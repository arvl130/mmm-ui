"use client"

import { Button } from "@/components/ui/button"
import { getMemeUploadUrl, putObjectToUploadUrl } from "@/api/upload-url"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { handleErrorWithToast } from "@/lib/error-handling"
import { storeMeme } from "@/api/meme"
import { useRef } from "react"
import { Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function UploadModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (newIsOpen: boolean) => void
}) {
  const queryClient = useQueryClient()

  const getUrlMutation = useMutation({
    mutationFn: async () => {
      return await getMemeUploadUrl()
    },
    onSuccess: async ({ result: { url, id } }) => {
      if (inputRef.current === null) {
        toast.error("No input element.")
        return
      }

      if (
        inputRef.current.files === null ||
        inputRef.current.files.length === 0
      ) {
        toast.error("No input files.")
        return
      }

      uploadMutation.mutate({
        file: inputRef.current.files[0],
        url,
        id,
      })
    },
    onError: (e) => handleErrorWithToast(e),
  })

  const uploadMutation = useMutation({
    mutationFn: async ({
      file,
      url,
      id,
    }: {
      file: File
      url: string
      id: string
    }) => {
      await putObjectToUploadUrl({
        file,
        url,
      })

      return { id }
    },
    onSuccess: async ({ id }) => {
      storeMutation.mutate({
        id,
      })
    },
    onError: (e) => handleErrorWithToast(e),
  })

  const storeMutation = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      return await storeMeme({
        meme: {
          id,
        },
      })
    },
    onSuccess: ({ message, result: { imgUrl } }) => {
      if (inputRef.current) {
        inputRef.current.value = ""
        queryClient.invalidateQueries({
          queryKey: ["memes"],
        })
        onOpenChange(false)
      }

      toast(message, {
        description: `URL: ${imgUrl}`,
        action: {
          label: "Open",
          onClick: () => {
            window.open(imgUrl, "_blank")?.focus()
          },
        },
      })
    },
    onError: (e) => handleErrorWithToast(e),
  })

  const inputRef = useRef<null | HTMLInputElement>(null)
  const isPending =
    getUrlMutation.isPending ||
    uploadMutation.isPending ||
    storeMutation.isPending

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Meme</DialogTitle>
          <DialogDescription>Select a meme to upload.</DialogDescription>
        </DialogHeader>
        <div>
          <Input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png"
          />
        </div>
        <DialogFooter>
          <Button
            type="button"
            disabled={isPending}
            onClick={() => getUrlMutation.mutate()}
          >
            {isPending && <Loader2 className="animate-spin mr-1" />} Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
