import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Meme } from "@/types/meme"
import { Upload, Wind } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { EditMemeModal } from "./edit-meme-modal"
import { DeleteMemeModal } from "./delete-meme-modal"

function MemeCard({ meme }: { meme: Meme }) {
  const [editIsOpen, setEditIsOpen] = useState(false)
  const [deleteIsOpen, setDeleteIsOpen] = useState(false)

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle className="whitespace-nowrap overflow-x-hidden text-ellipsis">
          {meme.id}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Image
          src={meme.imgUrl}
          alt="This is a meme."
          width={320}
          height={320}
          className="size-80 object-cover border"
        />
      </CardContent>
      <CardFooter>
        <Button type="button" onClick={() => setEditIsOpen(true)}>
          Edit
        </Button>
        <EditMemeModal
          open={editIsOpen}
          onOpenChange={setEditIsOpen}
          onOpenDeleteModal={() => {
            setEditIsOpen(false)
            setDeleteIsOpen(true)
          }}
          memeId={meme.id}
        />
        <DeleteMemeModal
          open={deleteIsOpen}
          onOpenChange={setDeleteIsOpen}
          memeId={meme.id}
        />
      </CardFooter>
    </Card>
  )
}

export function MemeList({
  memes,
  onOpenUploadModal,
}: {
  memes: Meme[]
  onOpenUploadModal: () => void
}) {
  if (memes.length === 0)
    return (
      <>
        <div className="flex flex-col justify-center items-center pt-24">
          <Wind className="text-zinc-400" size={128} />
          <p className="text-muted-foreground mt-4 max-w-sm text-center">
            It looks like there are no memes at the moment. Try uploading your
            first meme.
          </p>
          <Button
            type="button"
            variant="outline"
            className="mt-4"
            onClick={() => {
              onOpenUploadModal()
            }}
          >
            <Upload /> Upload
          </Button>
        </div>
      </>
    )

  return (
    <div className="mt-4 flex flex-wrap gap-4">
      {memes.map((meme) => (
        <MemeCard key={meme.id} meme={meme} />
      ))}
    </div>
  )
}
