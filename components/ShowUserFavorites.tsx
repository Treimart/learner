"use client"

import { Box, Button, Grid, Typography } from "@mui/material"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface Form {
  id: number
  title: string
}

export default function ShowUserFavorites() {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const [userID, setUserID] = useState("")
  const [userIDLoaded, setUserIDLoaded] = useState(false)

  useEffect(() => {
    const getUserID = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session != null) {
        const id = data.session.user.id
        setUserID(id)
      } else {
        setUserID("0")
      }
      setUserIDLoaded(true)
    }
    getUserID()
  }, [])

  const [forms, setForms] = useState<Form[]>([])

  const getForms = async () => {
    const { data } = await supabase
      .from("favorite")
      .select('*, form!inner(*)')
      .is('form.deleted', null)
      .eq('user_id', userID)
    if (data) {
      const mappedForm: Form[] = data.map((item: any) => ({
        id: item.form.id,
        title: item.form.title
      }))
      setForms(mappedForm)
    }
  }

  useEffect(() => {
    if (userIDLoaded) {
      getForms()
    }
  }, [userID])

  return (
    <Grid item xs={12}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: '100%'
      }}
    >
      <Typography variant="h2">Sinu lemmikud</Typography>
      <Grid
        container
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          gap: "16px",
          justifyContent: "space-between",
          alignItems: "baseline"
        }}
      >
        {forms.length > 0 ? (forms.map(form => (
          <Grid
            item
            key={form.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              border: 1,
              borderColor: "primary.main",
              boxShadow: 1,
              borderRadius: 2,
              p: 2,
              m: 1,
              width: 350,
              height: 70
            }}
          >
            <Button
              key={form.id}
              sx={{
                justifyContent: "flex-start",
                width: "fit-content"
              }}
              variant="text"
              color="primary"
              onClick={() => router.push("/form?form_id=" + form.id)}
            >
              {form.title}
            </Button>
          </Grid>
        ))) : (<Typography variant="subtitle1">Sa pole veel ühtegi küsimustikku lemmikuks märkinud</Typography>)}
      </Grid>
    </Grid>
  )
}
