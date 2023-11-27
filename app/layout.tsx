import { GeistSans } from "geist/font"
import "./globals.css"

import Navbar from '../components/Navbar'
import { Container } from "@mui/material"
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry"


const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000"

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Learner",
  description: "Learn fast and efficently"
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html
      lang="en"
      className={GeistSans.className}
    >
      <body className="bg-background text-foreground">
        <ThemeRegistry>
          <main className="min-h-screen flex flex-col items-center">
            <Navbar />
            <Container style={{ marginTop: '10rem' }}>
                {children}
            </Container>
          </main>
        </ThemeRegistry>
      </body>
    </html>
  )
}
