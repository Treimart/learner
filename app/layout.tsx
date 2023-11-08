import { GeistSans } from 'geist/font'
import './globals.css'
import Link from 'next/link'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          <nav>
          <Link href="/">Home </Link>
          <Link href="/profile">Profile </Link>
          <Link href="/form">Form </Link>
          <Link href="/createForm">Create form </Link>
          <Link href="/login">Login</Link>
          </nav>
          {children}
        </main>
      </body>
    </html>
  )
}
