import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants"
import type { Metadata } from "next"
import { SignUpForm } from "./signup-form"
import { Footer } from "../footer"

export const metadata: Metadata = {
  title: `Sign Up - ${APP_NAME}`,
  description: APP_DESCRIPTION,
}

export default function SignUpPage() {
  return (
    <div className="min-h-screen grid grid-rows-[1fr_auto]">
      <main className="pt-24">
        <SignUpForm />
      </main>
      <Footer />
    </div>
  )
}
