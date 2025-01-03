import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants"
import { LoginForm } from "./login-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: `Sign In - ${APP_NAME}`,
  description: APP_DESCRIPTION,
}

export default function SignInPage() {
  return (
    <main className="pt-24">
      <LoginForm />
    </main>
  )
}
