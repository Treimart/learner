'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Typography, Button, Grid } from '@mui/material'


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
      }
    }
    getCategories()
  }, [supabase, setCategories])

  const [userID, setUserID] = useState("")
  const [userIDLoaded, setUserIDLoaded] = useState(false)
  useEffect(() => {
    const getUserID = async () => {
      const { data } = await supabase.auth.getSession()
      //console.log(data.session)
      if (data.session != null) {
        const id = data.session.user.id
        setUserID(id)
      } else {
        console.log("123")
        setUserID(0)
      }
      setUserIDLoaded(true)
    }
    getUserID()
  }, [])

  const getForms = async () => {
    //console.log(userID)
    if (userID == 0) {
      const { data } = await supabase
        .from('form')
        .select()
        .eq('status', 3)
      if (data) {
        setForms(data)
        //console.log(data)
      }
    } else {
      const { data } = await supabase
        .from('form')
        .select()
        .or(`status.eq.3,status.eq.2,and(status.eq.1,user_id.eq.${userID})`)
      if (data) {
        setForms(data)
        //console.log(data)
      }
    }
  }

  useEffect(() => {
    if (userIDLoaded) {
      getForms()
      //console.log(userIDLoaded, userID)
    }
  }, [userID])

  //console.log(forms[0].category_id)
	return (
    <Grid 
      container spacing={2}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline'
      }}
    >
      {categories.map(({id: catID, name}) => (
        <Grid item
          key={catID}
          sx={{
            display: 'flex',
            flexDirection: 'column',
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
            <Button 
              style={{justifyContent: "flex-start"}}
              sx={{
                width: 'fit-content',
                my: 1
              }}
              color="primary" 
              variant="contained" 
              onClick={() => router.push('/form?form_id='+formID)} 
              key={formID}
            >
                {title}
            </Button>
          ))}

        </Grid>
      ))}
    </Grid>

    
  )
}