"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Box, Button, Card, FormControl, Grid, TextField, Tooltip, Typography } from "@mui/material"
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
    if (userID != "") {
      const getCategories = async () => {
        const { data } = await supabase
          .from('category')
          .select()
          .eq('user_id', userID)
        if (data) {
          setCategories(data)
        }
      }
      getCategories()
    }
  }, [userID, deleteCategory])

  const saveNewCategory = async () => {
    console.log(categories)
    const { data, error } = await supabase
      .from("category")
      .insert({name: newCategory, user_id: userID})
      .select()
    if (error) {
      console.error("Error saving the category:", error.message)
    } else {
      console.log("Category saved successfully:", data[0].name)
      setNewCategory("")
    }
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
        mt: 4
      }}
    >
      <Grid
        item
        sx={{
          minWidth: '45%',
          p: 2,
          mb: 2,
          border: 1,
          borderColor: "primary.main",
          borderRadius: 2
        }}
      >
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
      </Grid>
      <Grid
        item
        sx={{
          minWidth: '45%',
          p: 2,
          backgroundColor: "primary.main",
          color: "white",
          borderRadius: 2
        }}
      >
        <Typography variant='h3' sx={{mb: 2}}>Sinu lisatud kategooriad</Typography>
        {categories.length > 0 ? (
          categories.map(({id: catID, name}) => (
            <Box 
              key={catID}
              sx={{
                display: 'flex',
                alignItems: 'center',
                my: 2
              }}
            >
              <Tooltip
                title="Kustuta"
                placement="right"
              >
                <DeleteOutlineIcon 
                  fontSize="small"
                  onClick={() => deleteCategory(catID)}
                  sx={{
                    color: "red",
                    cursor: "pointer"
                  }}
                />
              </Tooltip>
              <Typography
                sx={{ml: 2}}
              >{name}</Typography>
            </Box>
          ))) : <Typography>Sa pole veel kategooriaid lisanud</Typography>
        }
      </Grid>
    </Grid>
  )
}