"use client"
import AuthButton from "@/components/AuthButton"
import { Box, Container, Grid, Button, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import ShowUserForms from "@/components/ShowUserForms"
import ShowUserFavorites from "@/components/ShowUserFavorites"
import ShowUserHistory from "@/components/ShowUserHistory"

export default function Profile() {
  const supabase = createClientComponentClient()
  const [userDataLoaded, setUserDataLoaded] = useState(false)
  const [userData, setUserData] = useState<{
    id: string
    email: string | undefined
  }>({
    id: "",
    email: undefined
  })

  useEffect(() => {
    const getUserData = async () => {
      const { data } = await supabase.auth.getSession()
      //console.log(data.session)
      if (data.session != null) {
        const {
          data: { user }
        } = await supabase.auth.getUser()
        const newData = {
          id: user!.id,
          email: user!.email || undefined
        }
        setUserData(newData)
      }
      setUserDataLoaded(true)
    }
    getUserData()
  }, [])

  const renderUserInfoAndActions = (userInfoArray: any[]) => {
    const userInfoItems = userInfoArray.map((info, index) => (
      <Box
        key={index}
        sx={{ margin: "3vh 0 3vh 0" }}
      >
        {info}
      </Box>
    ))

    return <div>{userInfoItems}</div>
  }

  const renderUserHistoryAndFavorites = (userHistoryArray: any[]) => {
    const userHistoryItems = userHistoryArray.map((info, index) => (
      <Box
        key={index}
        sx={{ margin: "3vh 0 3vh 0" }}
      >
        {info}
      </Box>
    ))

    return <div>{userHistoryItems}</div>
  }

  const resetPassword = async () => {
    window.location.href = "/changePassword"
  }

  let userInfoArray: string[] = [" "]
  if (userData && userData.email) {
    userInfoArray = [`Email: ${userData.email}`]
  }
  const userHistoryArray = [<ShowUserHistory />]

  if (userDataLoaded) {
    return userData.email != undefined ? (
      <Container sx={{ width: "100%" }}>
        PROFIILI ANDMED
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            xs={6}
          >
            {renderUserInfoAndActions(userInfoArray)}
            <Box sx={{ margin: "3vh 0 3vh 0" }}>
              <Button
                onClick={() => resetPassword()}
                variant="contained"
                color="primary"
              >
                Muuda parooli
              </Button>
            </Box>
            <Box sx={{ margin: "3vh 0 3vh 0" }}>
              <AuthButton userData={userData} />
            </Box>
          </Grid>
          <Grid
            item
            xs={6}
          >
            {renderUserHistoryAndFavorites(userHistoryArray)}
          </Grid>
          <Typography
            variant="h4"
            sx={{ margin: "25px 0" }}
          >
            Sinu lemmikud
          </Typography>
          <ShowUserFavorites />
          <Typography
            variant="h3"
            sx={{ margin: "25px 0" }}
          >
            Sinu küsimustikud
          </Typography>
          <ShowUserForms />
        </Grid>
      </Container>
    ) : (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%"
        }}
      >
        <AuthButton userData={userData} />
      </Container>
    )
  }
}
