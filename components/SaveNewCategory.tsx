"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Box, Button, FormControl, TextField, Typography } from "@mui/material"
import { useState } from "react"

export default function SaveNewCategory() {
  const supabase = createClientComponentClient()

  const [newCategory, setNewCategory] = useState("")

  const saveNewCategory = async () => {
    const { data, error } = await supabase
    .from("category")
    .insert({"name": newCategory})
    .select()

    if (error) {
      console.error("Error saving the category:", error.message)
    } else {
      console.log("Category saved successfully:", data)
      window.location.reload()
    }
  }


  return (
    <Box
    sx={{
      mt: 5
    }}>
      <Typography variant='h4'>Lisa uus kategooria</Typography>
      <FormControl>
        <TextField 
          type="text"
          size="small"
          variant="outlined"
          label="Kategooria"
          id="categoryName"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          sx={{
            my: 2
          }}
        />
        <Button 
          variant="contained"
          onClick={saveNewCategory}
          style={{justifyContent: "flex-start"}}
          sx={{
            width: 'fit-content'
          }}
        >
          Salvesta
        </Button>
      </FormControl>
    </Box>
  )
}