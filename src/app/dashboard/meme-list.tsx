import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Meme as BaseMeme } from "@/types/meme"
import {
  Download,
  Maximize,
  MoreVertical,
  Pencil,
  Share,
  Tag,
  Trash,
  Upload,
  Wind,
} from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { EditMemeModal } from "./edit-meme-modal"
import { DeleteMemeModal } from "./delete-meme-modal"
import type { Keyword } from "@/types/keyword"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { ShowTagsModal } from "./show-tags-modal"
import { toast } from "sonner"
import { ViewImageModal } from "./view-image-modal"

type Meme = BaseMeme & { keywords: Keyword[] }

function MemeCard({ meme }: { meme: Meme }) {
  const [editIsOpen, setEditIsOpen] = useState(false)
  const [deleteIsOpen, setDeleteIsOpen] = useState(false)
  const [showTagsIsOpen, setShowTagsIsOpen] = useState(false)
  const [viewImageIsOpen, setViewImageIsOpen] = useState(false)

  return (
    <Card className="overflow-hidden relative group">
      <CardContent className="p-0 h-full">
        <Image
          src={meme.imgUrl}
          alt="This is a meme."
          width={320}
          height={320}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-wrap gap-2 p-2">
          {meme.keywords.slice(0, 10).map((keyword) => (
            <Badge key={keyword.id} variant="secondary">
              {keyword.name}
            </Badge>
          ))}
        </div>
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-white/90 p-1 rounded-full">
              <MoreVertical className="h-5 w-5 text-gray-700" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => setViewImageIsOpen(true)}>
                <Maximize className="mr-2 h-4 w-4" />
                <span>Open</span>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={meme.imgUrl} download>
                  <Download className="mr-2 h-4 w-4" />
                  <span>Download</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={async () => {
                  await navigator.clipboard.writeText(meme.imgUrl)
                  toast.success("Copied to Clipboard", {
                    description:
                      "The image URL has been copied to the clipboard.",
                  })
                }}
              >
                <Share className="mr-2 h-4 w-4" />
                <span>Share</span>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setShowTagsIsOpen(true)}>
                <Tag className="mr-2 h-4 w-4" />
                <span>Tags</span>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setEditIsOpen(true)}>
                <Pencil className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setDeleteIsOpen(true)}>
                <Trash className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>

      <ViewImageModal
        isOpen={viewImageIsOpen}
        onClose={() => {
          setViewImageIsOpen(false)
        }}
        imageUrl={meme.imgUrl}
      />
      <ShowTagsModal
        open={showTagsIsOpen}
        onOpenChange={setShowTagsIsOpen}
        onOpenEditModal={() => {
          setShowTagsIsOpen(false)
          setEditIsOpen(true)
        }}
        keywords={meme.keywords}
      />

      <EditMemeModal
        open={editIsOpen}
        onOpenChange={setEditIsOpen}
        onOpenDeleteModal={() => {
          setEditIsOpen(false)
          setDeleteIsOpen(true)
        }}
        meme={meme}
      />
      <DeleteMemeModal
        open={deleteIsOpen}
        onOpenChange={setDeleteIsOpen}
        memeId={meme.id}
      />
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
            It looks like there are no memes at the moment. Try uploading a
            meme.
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
    <>
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {memes.map((meme) => (
          <MemeCard key={meme.id} meme={meme} />
        ))}
      </div>
    </>
  )
}
