"use client"

import { Button } from "@/components/ui/button"
import { getMemeUploadUrl, putObjectToUploadUrl } from "@/api/upload-url"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"
import { handleErrorWithToast } from "@/lib/error-handling"
import { storeMeme } from "@/api/meme"
import { useRef } from "react"
import { Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"

export function UploadButton() {
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
      toast(message, {
        description: `URL: ${imgUrl}`,
        action: {
          label: "Open",
          onClick: () => {
            const window = open(imgUrl, "_blank")

            if (window) window.focus()
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
    <>
      <Input ref={inputRef} type="file" />
      <Button
        type="button"
        disabled={isPending}
        onClick={() => getUrlMutation.mutate()}
      >
        {isPending && <Loader2 className="animate-spin mr-1" />} Upload
      </Button>
    </>
  )
}
