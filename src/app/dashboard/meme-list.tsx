import { Button } from "@/components/ui/button"
import type { Meme } from "@/types/meme"
import { Upload, Wind } from "lucide-react"
import Image from "next/image"

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
        <div key={meme.id}>
          <Image
            src={meme.imgUrl}
            alt={"This is a meme."}
            width={320}
            height={320}
            className="size-80 object-contain border"
          />
        </div>
      ))}
    </div>
  )
}
