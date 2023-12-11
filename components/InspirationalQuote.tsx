import { Box, Typography } from "@mui/material"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export default async function Index() {
  const res = await fetch("https://official-joke-api.appspot.com/random_joke")
  const data = await res.json()
  const setup = data.setup
  const punchline = data.punchline

  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user }
  } = await supabase.auth.getUser()

  return (
    <>
      {user ? null : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 3
          }}
        >
          <Typography variant="h4">{setup}</Typography>
          <Typography variant="h4">{punchline}</Typography>
        </Box>
      )}
    </>
  )
}
