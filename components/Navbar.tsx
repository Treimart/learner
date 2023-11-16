import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import AppBar from "@mui/material/AppBar"
import { Toolbar, Button, Box, TextField } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
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
          Home
        </Button>

        <Box sx={{ flexGrow: 1 }} />
        {user ? (
          <Button
            color="inherit"
            href="/createForm"
          >
            <AddIcon />
          </Button>
        ) : (
          null
        )}

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
  )
}
