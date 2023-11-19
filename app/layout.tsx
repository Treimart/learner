import { GeistSans } from "geist/font"
import "./globals.css"

import Navbar from '../components/Navbar'
import { Container } from "@mui/material"


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
        <main className="min-h-screen flex flex-col items-center">
          <Navbar />
          <Container maxWidth="sm" style={{ marginTop: '10rem' }}>
              {children}
          </Container>
        </main>
      </body>
    </html>
  )
}
