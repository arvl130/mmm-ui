import { destroyMeme } from "@/api/meme"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { handleErrorWithToast } from "@/lib/error-handling"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

export function DeleteMemeModal({
  open,
  onOpenChange,
  memeId,
}: {
  open: boolean
  onOpenChange: (newIsOpen: boolean) => void
  memeId: string
}) {
  const queryClient = useQueryClient()
  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      return await destroyMeme({
        id: memeId,
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Meme</DialogTitle>
        </DialogHeader>
        <div>
          This action cannot be undone. Are you sure you want to continue?
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="destructive"
            disabled={isPending}
            onClick={() => {
              mutate()
            }}
          >
            {isPending && <Loader2 className="animate-spin mr-1" />} Yes, I want
            to delete this.
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
