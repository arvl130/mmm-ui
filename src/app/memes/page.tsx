import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: `View Memes - ${APP_NAME}`,
  description: APP_DESCRIPTION,
}

export default function ViewMemesPage() {
  return (
    <main>
      <h1>This is the View Memes page.</h1>
    </main>
  )
}
