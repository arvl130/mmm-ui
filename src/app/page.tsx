import type { Metadata } from "next"
import { SignInOrDashboardButton } from "./signin-or-dashboard-button"
import { CallToActionButtons } from "./call-to-action-buttons"
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants"
import { Footer } from "./footer"
import Link from "next/link"

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
}

export default function Home() {
  return (
    <div className="min-h-svh grid grid-rows-[auto_1fr_auto]">
      <header className="h-20 border-b px-6">
        <div className="max-w-6xl mx-auto w-full h-full flex justify-between items-center">
          <Link href="/">
            <h1 className="font-semibold">Meme Manager MMM</h1>
          </Link>
          <SignInOrDashboardButton />
        </div>
      </header>
      <main className="flex flex-col gap-y-6 justify-center items-center">
        <p className="px-3 text-lg text-center sm:text-6xl font-semibold">
          MMM Manages Memes
        </p>
        <p className="px-3 sm:text-2xl max-w-3xl text-center leading-normal">
          I&apos;m tired of saving random memes and not being able to find them
          later, so I built this app to help me with that.
        </p>
        <CallToActionButtons />
      </main>
      <Footer />
    </div>
  )
}
