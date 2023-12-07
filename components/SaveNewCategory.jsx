"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Box, Button, FormControl, TextField, Tooltip, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

export default function SaveNewCategory({userID}) {
  const supabase = createClientComponentClient()

  const [categories, setCategories] = useState([])
  const [newCategory, setNewCategory] = useState("")

  const deleteCategory = async (id) => {
    const { data, error } = await supabase
      .from("category")
      .delete()
      .match({ id: id })
      .select()
    if (error) {
      console.error("Error deleting:", error.message)
    } else {
      console.log("Deleted category:", data[0].name)
    }
  }

	useEffect(() => {
    if (userID.userID != "") {
      const getCategories = async () => {
        const { data } = await supabase
          .from('category')
          .select()
          .eq('user_id', userID.userID)
        if (data) {
          setCategories(data)
        }
      }
      getCategories()
    }
  }, [userID, deleteCategory])

  const saveNewCategory = async () => {
    const { data, error } = await supabase
      .from("category")
      .insert({name: newCategory, user_id: userID.userID})
      .select()
    if (error) {
      console.error("Error saving the category:", error.message)
    } else {
      console.log("Category saved successfully:", data[0].name)
      setNewCategory("")
      //window.location.reload()
    }
  }

  return (
    <Box>
      <Typography variant='h3'>Sinu lisatud kategooriad</Typography>
      {categories.map(({id: catID, name}) => (
        <Box key={catID}>
          <Typography>{name}</Typography>
          <Tooltip
            title="Kustuta"
            placement="right"
            arrow
          >
            <DeleteOutlineIcon 
              onClick={() => deleteCategory(catID)}
              sx={{
                color: "red",
                cursor: "pointer"
              }}
            />
          </Tooltip>
        </Box>
      ))}
      <Typography variant='h3'>Lisa uus kategooria</Typography>
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