import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: `Sign Up - ${APP_NAME}`,
  description: APP_DESCRIPTION,
}

export default function SignUpPage() {
  return (
    <main>
      <h1>This is the Sign Up page.</h1>
    </main>
  )
}
