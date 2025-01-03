import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: `Edit Meme - ${APP_NAME}`,
  description: APP_DESCRIPTION,
}

export default function EditMemePage() {
  return (
    <main>
      <h1>This is the Edit Meme page.</h1>
    </main>
  )
}
