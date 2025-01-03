import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: `Profile - ${APP_NAME}`,
  description: APP_DESCRIPTION,
}

export default function ProfilePage() {
  return (
    <main>
      <h1>This is the Profile page.</h1>
    </main>
  )
}
