'use client'
import { Box, Button, TextField, Typography } from "@mui/material";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

export default function changePassword() {
  const supabase = createClientComponentClient()
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const handlePasswordChange = async () => {
    try{
      await supabase.auth.updateUser({ password: password })
      setMessage('Parool uuendatud!')
    } catch (error) {
      console.log("couldn't update:", error)
    }

  }
  return (
    <Box
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
      }}
    >
      <Typography variant="h1">Muuda oma parooli</Typography>
      <TextField
        type="password"
        label="Uus parool"
        variant="outlined"
        placeholder="Sisesta parool"
        sx={{
          mt: 2
        }}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        onClick={() => handlePasswordChange()}
        variant="contained"
        color="primary"
        sx={{
          my: 2
        }}
      >
        Salvesta
      </Button>
      <Typography variant="subtitle1" color="green">{message}</Typography>
    </Box>
  )
}
