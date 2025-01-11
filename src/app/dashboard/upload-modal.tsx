"use client"

import { Button } from "@/components/ui/button"
import { getMemeUploadUrl, putObjectToUploadUrl } from "@/api/upload-url"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { handleErrorWithToast } from "@/lib/error-handling"
import { storeMeme } from "@/api/meme"
import { useEffect, useRef, useState } from "react"
import { Loader2, Plus, Sparkles, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { getKeywordSuggestions } from "@/api/keyword"

export function UploadModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (newIsOpen: boolean) => void
}) {
  const [keywords, setKeywords] = useState<string[]>([])

  const queryClient = useQueryClient()
  const getUrlMutation = useMutation({
    mutationFn: async () => {
      return await getMemeUploadUrl()
    },
    onSuccess: async ({ result: { url, id } }) => {
      if (
        imageInputRef.current === null ||
        imageInputRef.current.files === null ||
        imageInputRef.current.files.length === 0
      ) {
        toast.error("No input files.")
        return
      }

      uploadMutation.mutate({
        file: imageInputRef.current.files[0],
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
        keywords,
      })
    },
    onError: (e) => handleErrorWithToast(e),
  })

  const storeMutation = useMutation({
    mutationFn: async ({ id }: { id: string; keywords: string[] }) => {
      return await storeMeme({
        meme: {
          id,
          keywords: new Set(keywords),
        },
      })
    },
    onSuccess: ({ message, result: { imgUrl } }) => {
      if (imageInputRef.current) {
        imageInputRef.current.value = ""
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

  const suggestionMutation = useMutation({
    mutationFn: async ({ file }: { file: File }) => {
      return await getKeywordSuggestions({
        file,
      })
    },
    onSuccess: ({ message, reply }) => {
      setKeywords((prevKeywords) =>
        Array.from(new Set([...prevKeywords, ...reply])),
      )
      toast(message, {
        description: reply.join(", "),
      })
    },
    onError: (e) => handleErrorWithToast(e),
  })

  useEffect(() => {
    if (open) {
      setKeywords([])
    }
  }, [open])

  function onEnterKeyword() {
    if (isPending) return
    if (
      keywordInputRef.current === null ||
      keywordInputRef.current.value === ""
    ) {
      toast.error("You have not entered a keyword.")
      return
    }

    setKeywords((prevKeywords) => {
      if (keywordInputRef.current && keywordInputRef.current.value !== "") {
        const newKeyword = keywordInputRef.current.value
        const updatedKeywords = Array.from(
          new Set([...prevKeywords, newKeyword]),
        )

        keywordInputRef.current.value = ""
        return updatedKeywords
      } else {
        return prevKeywords
      }
    })
  }

  const keywordInputRef = useRef<null | HTMLInputElement>(null)
  const imageInputRef = useRef<null | HTMLInputElement>(null)
  const isPending =
    suggestionMutation.isPending ||
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
          <div>
            <Label>Image</Label>
            <Input
              ref={imageInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              className="mt-2"
            />
          </div>
          <div className="mt-4 space-y-2">
            <Label>Tags</Label>
            {keywords.length === 0 ? (
              <p className="text-sm">No keywords.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword) => (
                  <Badge
                    key={keyword}
                    className="py-1"
                    onClick={() => {
                      setKeywords((prevKeywords) => {
                        return prevKeywords.filter((k) => k !== keyword)
                      })
                    }}
                  >
                    {keyword}
                    <X className="ml-1" size={16} />
                  </Badge>
                ))}
              </div>
            )}
            <div className="flex items-center gap-x-2">
              <Input
                ref={keywordInputRef}
                type="text"
                placeholder="Enter a keyword ..."
                disabled={isPending}
                onKeyUp={(e) => {
                  if (e.key === "Enter") onEnterKeyword()
                }}
              />
              <Button
                type="button"
                size="icon"
                variant="outline"
                className="w-12"
                disabled={isPending}
                onClick={() => {
                  if (
                    imageInputRef.current === null ||
                    imageInputRef.current.files === null ||
                    imageInputRef.current.files.length === 0
                  ) {
                    toast.error("No input files.")
                    return
                  }

                  suggestionMutation.mutate({
                    file: imageInputRef.current.files[0],
                  })
                }}
              >
                <Sparkles />
                <span className="sr-only">Save</span>
              </Button>
              <Button
                type="button"
                size="icon"
                variant="outline"
                className="w-12"
                disabled={isPending}
                onClick={onEnterKeyword}
              >
                <Plus />
                <span className="sr-only">Save</span>
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            disabled={isPending}
            onClick={() => {
              if (
                imageInputRef.current === null ||
                imageInputRef.current.files === null ||
                imageInputRef.current.files.length === 0
              ) {
                toast.error("No input files.")
                return
              }

              getUrlMutation.mutate()
            }}
          >
            {getUrlMutation.isPending && (
              <Loader2 className="animate-spin mr-1" />
            )}
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
