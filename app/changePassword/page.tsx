'use client'
import { Box, Button, TextField, Typography } from "@mui/material";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

export default function changePassword() {
  const supabase = createClientComponentClient()
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [color, setColor] = useState("")


  const handlePasswordChange = async () => {
    const { error } = await supabase.auth.updateUser({ password: password })
    if (!error) {
      setMessage('Parool uuendatud!')
      setColor('green')
      setPassword('')
    } else {
      //console.log("couldn't update:", error.message)
      setMessage(error.message)
      setColor('red')
      setPassword('')
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
        value={password}
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
      <Typography variant="subtitle1" color={color}>{message}</Typography>
    </Box>
  )
}
