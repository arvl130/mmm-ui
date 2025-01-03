import { Metadata } from "next"
import { LogoutForm } from "./logout-form"
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants"

export const metadata: Metadata = {
  title: `Dashboard - ${APP_NAME}`,
  description: APP_DESCRIPTION,
}

export default function DashboardPage() {
  return (
    <main className="pt-24">
      <LogoutForm />
    </main>
  )
}
