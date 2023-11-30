"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Box, Button } from '@mui/material';

export default function AuthButton({userData}: { userData: { id: string; email: string | undefined } | null }) {
  const supabase = createClientComponentClient()

  const signOut = async () => {
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  return userData?.email != undefined ? (
    <Box>
      <form action={signOut}>
        <Button 
          className="py-2 px-4 rounded-md no-underline"
          variant="contained"
          color="primary"
          type="submit"
        >
          Logi välja
        </Button>
      </form>
    </Box>
  ) : (
    <Button
      href="/login"
      className="py-2 px-4 rounded-md no-underline"
      variant="contained"
      color="primary"
    >
      Logi sisse või loo kasutaja
    </Button>
  )
}
