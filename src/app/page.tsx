import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "Meme Manager MMM",
  description: "The majestic meme manager with magical powers!",
}

export default function Home() {
  return (
    <div>
      <h1 className="font-semibold text-center text-2xl mt-12">
        Meme Manager MMM
      </h1>
    </div>
  )
}
