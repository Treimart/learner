import { GeistSans } from "geist/font"
import "./globals.css"
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import AppBar from "@mui/material/AppBar"
import { Toolbar, Button, Box, TextField } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import PersonIcon from "@mui/icons-material/Person"
import AddIcon from "@mui/icons-material/Add"
import HomeIcon from "@mui/icons-material/Home"

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000"

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase"
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentClient({ cookies })

  const {
  data: { user },
} = await supabase.auth.getUser();

  return (
    <html
      lang="en"
      className={GeistSans.className}
    >
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          <AppBar>
            <Toolbar>
              <Button
                color="inherit"
                href="/"
              >
                <HomeIcon />
                Home
              </Button>
              <Box sx={{ flexGrow: 1 }} />
              <Button
                color="inherit"
                href="/createForm"
              >
                <AddIcon />
                Create
              </Button>
              <Box sx={{ marginRight: 1 }} />
              <TextField
                variant="outlined"
                placeholder="Search"
                InputProps={{
                  startAdornment: <SearchIcon />,
                  style: { color: "white" }
                }}
              />
              <Box sx={{ marginRight: 1 }} />
              {user ? (
              <Button
                color="inherit"
                href="/profile"
              >
              <PersonIcon />
              </Button>
              ) : (
              <Button
                color="inherit"
                href="/login"
              >
              <PersonIcon />
                Login
              </Button>
              )}
            </Toolbar>
          </AppBar>
          {children}
        </main>
      </body>
    </html>
  )
}
