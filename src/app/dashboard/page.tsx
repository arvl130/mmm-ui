import { Metadata } from "next"
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants"
import { Sidebar } from "./sidebar"
import { MainContent } from "./main-content"

export const metadata: Metadata = {
  title: `Dashboard - ${APP_NAME}`,
  description: APP_DESCRIPTION,
}

export default function DashboardPage() {
  return (
    <div className="min-h-svh grid grid-cols-[20rem_1fr]">
      <Sidebar />
      <MainContent />
    </div>
  )
}
