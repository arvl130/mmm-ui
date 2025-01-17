import { getEditKeywordSuggestions } from "@/api/keyword"
import { updateMeme } from "@/api/meme"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { handleErrorWithToast } from "@/lib/error-handling"
import type { Keyword } from "@/types/keyword"
import type { Meme as BaseMeme } from "@/types/meme"
import { Label } from "@radix-ui/react-label"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Loader2, Plus, Sparkles, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"

type Meme = BaseMeme & { keywords: Keyword[] }

export function EditMemeModal({
  open,
  onOpenChange,
  onOpenDeleteModal,
  meme,
}: {
  open: boolean
  onOpenChange: (newIsOpen: boolean) => void
  onOpenDeleteModal: () => void
  meme: Meme
}) {
  const [keywords, setKeywords] = useState<string[]>(
    meme.keywords.map(({ name }) => name),
  )

  const queryClient = useQueryClient()
  const updateMutation = useMutation({
    mutationFn: async (input: { keywords: string[] }) => {
      return await updateMeme({
        id: meme.id,
        meme: {
          keywords: new Set(input.keywords),
        },
      })
    },
    onError: (e) => handleErrorWithToast(e),
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({
        queryKey: ["memes"],
      })
      onOpenChange(false)
      toast.success(message)
    },
  })

  const keywordInputRef = useRef<null | HTMLInputElement>(null)

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

  useEffect(() => {
    if (open) {
      setKeywords(meme.keywords.map(({ name }) => name))
    }
  }, [open, meme.keywords])

  const suggestionMutation = useMutation({
    mutationFn: async () => {
      return await getEditKeywordSuggestions({
        memeId: meme.id,
      })
    },
    onSuccess: ({ reply }) => {
      toast.success("AI replied with suggested tags", {
        description: `Suggestions: ${reply.join(", ")}`,
        action: {
          label: "Use",
          onClick: () => {
            setKeywords((prevKeywords) =>
              Array.from(new Set([...prevKeywords, ...reply])),
            )
          },
        },
      })
    },
    onError: (e) => handleErrorWithToast(e),
  })

  const isPending = updateMutation.isPending || suggestionMutation.isPending

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Meme</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
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
                toast.promise(suggestionMutation.mutateAsync(), {
                  loading: "AI is thinking ...",
                })
              }}
            >
              {suggestionMutation.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Sparkles />
              )}
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
        <DialogFooter className="gap-2 sm:justify-between">
          <Button
            type="button"
            variant="destructive"
            onClick={() => onOpenDeleteModal()}
            disabled={isPending}
          >
            Delete
          </Button>
          <Button
            type="button"
            disabled={isPending}
            onClick={() => {
              updateMutation.mutate({
                keywords,
              })
            }}
          >
            {updateMutation.isPending && (
              <Loader2 className="animate-spin mr-1" />
            )}
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
