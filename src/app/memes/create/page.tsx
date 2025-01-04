import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: `Upload Meme - ${APP_NAME}`,
  description: APP_DESCRIPTION,
}

export default function UploadMemePage() {
  return (
    <main>
      <h1>This is the Upload Meme page.</h1>
    </main>
  )
}
