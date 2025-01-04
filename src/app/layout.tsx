import { Inter, Fira_Mono } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: "variable",
})

const firaMono = Fira_Mono({
  variable: "--font-fira-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${firaMono.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
        <Toaster
          className="pointer-events-auto"
          closeButton
          position="top-right"
        />
      </body>
    </html>
  )
}
