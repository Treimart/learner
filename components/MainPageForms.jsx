'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Box, Typography, Button } from '@mui/material'


export default function MainPageCategories() {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const [categories, setCategories] = useState([])
  const [forms, setForms] = useState([])
  

	useEffect(() => {
    const getCategories = async () => {
      const { data } = await supabase.from('category').select()
      if (data) {
        setCategories(data)
				//console.log(data)
      }
    }
    getCategories()
  }, [supabase, setCategories])

  useEffect(() => {
    const getForms = async () => {
      const { data } = await supabase.from('form').select()
      if (data) {
        setForms(data)
				//console.log(data)
      }
    }
    getForms()
  }, [supabase, setForms])

  function filterForms(catID){
    //console.log(catID)
    //console.log(forms.filter(form => form.category_id == catID))
    return forms.filter(form => form.category_id == catID)
  }

  //console.log(forms[0].category_id)
	return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      {categories.map(({id: catID, name}) => (
        <Box 
          key={catID}
          sx={{
            border: 1,
            borderColor: 'primary.main',
            boxShadow: 1,
            borderRadius: 2,
            p: 2,
            m: 2,
            minWidth: 300,
            minHeight: 100,
          }}>
          <Typography key={catID} variant='h5'>{name}</Typography>

          {forms.filter(form => form.category_id == catID).map(({id: formID, title}) => (
            <Button color="primary" variant="contained" onClick={() => router.push('/form/'+formID)} key={formID}>{title}</Button>
          ))}

        </Box>
      ))}
      
    </Box>
    
  )
}