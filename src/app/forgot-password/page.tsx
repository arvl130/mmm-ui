import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: `Forgot Password - ${APP_NAME}`,
  description: APP_DESCRIPTION,
}

export default function ForgotPasswordPage() {
  return (
    <main>
      <h1>This is the Forgot Password page.</h1>
    </main>
  )
}
