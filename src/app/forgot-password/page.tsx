import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants"
import type { Metadata } from "next"
import { PasswordResetLinkForm } from "./password-reset-link-form"
import { Footer } from "../footer"

export const metadata: Metadata = {
  title: `Forgot Password - ${APP_NAME}`,
  description: APP_DESCRIPTION,
}

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen grid grid-rows-[1fr_auto]">
      <main className="pt-24">
        <PasswordResetLinkForm />
      </main>
      <Footer />
    </div>
  )
}
