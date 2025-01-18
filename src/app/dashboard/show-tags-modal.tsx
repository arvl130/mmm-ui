import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Keyword } from "@/types/keyword"

export function ShowTagsModal({
  open,
  onOpenChange,
  onOpenEditModal,
  keywords,
}: {
  open: boolean
  onOpenChange: (newIsOpen: boolean) => void
  onOpenEditModal: () => void
  keywords: Keyword[]
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tags</DialogTitle>
        </DialogHeader>
        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword) => (
            <Badge key={keyword.id}>{keyword.name}</Badge>
          ))}
        </div>
        <DialogFooter className="gap-y-2 sm:justify-between">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              onOpenChange(false)
            }}
          >
            Close
          </Button>

          <Button
            type="button"
            onClick={() => {
              onOpenEditModal()
            }}
          >
            Edit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
