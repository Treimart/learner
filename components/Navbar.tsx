import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import AppBar from "@mui/material/AppBar"
import { Toolbar, Button, Box, TextField, Tooltip } from "@mui/material"
import PersonIcon from "@mui/icons-material/Person"
import AddIcon from "@mui/icons-material/Add"
import HomeIcon from "@mui/icons-material/Home"

export default async function Navbar() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <AppBar>
      <Toolbar>
        <Button
          color="inherit"
          href="/"
        >
          <HomeIcon />
        </Button>

        <Box sx={{ flexGrow: 1 }} />
        {user ? (
          <Tooltip
            title="Lisa uus küsimustik või kategooria"
            placement="bottom"
            arrow
          >
            <Button
              color="inherit"
              href="/createForm"
            >
              <AddIcon />
            </Button>
          </Tooltip>
        ) : (
          null
        )}

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
            <PersonIcon sx={{mr: 1}}/>
            Logi sisse
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}
