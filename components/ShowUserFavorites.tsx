"use client"

import { Box, Button, Grid } from "@mui/material"
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
      .select("id, user_id, form_id, form(id, title)")
      .eq("user_id", userID)
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
    <Grid
      container
      sx={{
        display: "flex",
        flexDirection: "column"
      }}
    >
      {forms.map(form => (
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
      ))}
    </Grid>
  )
}
