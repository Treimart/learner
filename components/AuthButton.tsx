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
    <form action={signOut}>
      <Button 
        variant="contained"
        color="primary"
        type="submit"
      >
        Logi välja
      </Button>
    </form>
  ) : (
    <Button
      href="/login"
      variant="contained"
      color="primary"
    >
      Logi sisse või loo kasutaja
    </Button>
  )
}
