import "./globals.css"
import { Inter } from "next/font/google"
import { Providers } from "./providers"
import { CollapsibleSidebar } from "@/components/CollapsibleSidebar"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Premium User Management Dashboard",
  description: "A high-quality, detailed user management system",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${inter.className} dark-gradient min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
          <Providers>
            <div className="flex h-screen overflow-hidden">
              <CollapsibleSidebar />
              <div className="flex-1 overflow-auto bg-background/95 backdrop-blur-sm">{children}</div>
            </div>
            <Toaster />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}

