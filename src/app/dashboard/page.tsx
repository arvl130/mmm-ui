import type { Metadata } from "next"
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants"
import { MainContent } from "./main-content"

export const metadata: Metadata = {
  title: `Dashboard - ${APP_NAME}`,
  description: APP_DESCRIPTION,
}

export default function DashboardPage() {
  return (
    <div className="px-6 pb-12">
      <MainContent />
    </div>
  )
}
