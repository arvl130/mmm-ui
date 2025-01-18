import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants"
import { LoginForm } from "./login-form"
import type { Metadata } from "next"
import { Footer } from "../footer"

export const metadata: Metadata = {
  title: `Sign In - ${APP_NAME}`,
  description: APP_DESCRIPTION,
}

export default function SignInPage() {
  return (
    <div className="min-h-screen grid grid-rows-[1fr_auto]">
      <main className="pt-24">
        <LoginForm />
      </main>
      <Footer />
    </div>
  )
}
