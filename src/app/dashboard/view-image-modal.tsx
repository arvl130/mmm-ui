import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog"
import Image from "next/image"

export function ViewImageModal({
  isOpen,
  onClose,
  imageUrl,
}: {
  isOpen: boolean
  onClose: () => void
  imageUrl: string
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogHeader>
        <DialogTitle>Hello</DialogTitle>
      </DialogHeader>
      <DialogContent className="max-w-[90vw] h-[90vh] p-0">
        <Image
          src={imageUrl}
          alt="This is a meme."
          width={1200}
          height={800}
          className="w-full h-full object-contain sm:rounded-lg"
        />
      </DialogContent>
    </Dialog>
  )
}
