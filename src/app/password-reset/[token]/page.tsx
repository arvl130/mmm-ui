import { Footer } from "@/app/footer"
import { PasswordResetForm } from "./password-reset-form"
import type { Metadata } from "next"
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants"

export const metadata: Metadata = {
  title: `Password Reset - ${APP_NAME}`,
  description: APP_DESCRIPTION,
}

export default async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params

  return (
    <div className="min-h-screen grid grid-rows-[1fr_auto]">
      <main className="pt-24">
        <PasswordResetForm token={token} />
      </main>
      <Footer />
    </div>
  )
}
