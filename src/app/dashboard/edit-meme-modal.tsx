import { updateMeme } from "@/api/meme"
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

export function EditMemeModal({
  open,
  onOpenChange,
  onOpenDeleteModal,
  memeId,
}: {
  open: boolean
  onOpenChange: (newIsOpen: boolean) => void
  onOpenDeleteModal: () => void
  memeId: string
}) {
  const queryClient = useQueryClient()
  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      return await updateMeme({
        id: memeId,
        meme: {},
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
          <DialogTitle>Edit Meme</DialogTitle>
        </DialogHeader>
        <div>No attributes can be edited at the moment.</div>
        <DialogFooter className="sm:justify-between">
          <Button
            type="button"
            variant="destructive"
            onClick={() => onOpenDeleteModal()}
          >
            Delete
          </Button>
          <Button
            type="button"
            disabled={isPending}
            onClick={() => {
              mutate()
            }}
          >
            {isPending && <Loader2 className="animate-spin mr-1" />}
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
