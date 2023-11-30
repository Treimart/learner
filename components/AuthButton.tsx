"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useEffect, useState } from "react"
import { Box, Button } from '@mui/material';

export default function AuthButton() {
  const supabase = createClientComponentClient()
  const [userData, setUserData] = useState("")
  const [userDataLoaded, setUserDataLoaded] = useState(false)

  useEffect(() => {
    const getUserData = async () => {
      const { data } = await supabase.auth.getSession()
      //console.log(data.session)
      if (data.session != null) {
        const { data: {user} } = await supabase.auth.getUser()
        setUserData(user!.id)
      }
      setUserDataLoaded(true)
    }
    getUserData()
  }, [])


  if (userDataLoaded) {
    return userData ? (
      <Box>
        <form 
          action={async () => {
            await supabase.auth.signOut() 
            window.location.href = "/"
          }}
        >
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
        Logi sisse
      </Button>
    )
  }

}
