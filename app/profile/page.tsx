"use client";
import AuthButton from "@/components/AuthButton";
import { Box, Container, Grid, Button, Typography, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import ShowUserForms from "@/components/ShowUserForms";
import ShowUserFavorites from "@/components/ShowUserFavorites";
import ShowUserHistory from "@/components/ShowUserHistory";
import ChangePassword from "@/components/ChangePassword";

export default function Profile() {
  const supabase = createClientComponentClient();
  const [userDataLoaded, setUserDataLoaded] = useState(false);
  const [userData, setUserData] = useState<{
    id: string;
    email: string | undefined;
  }>({
    id: "",
    email: undefined,
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const getUserData = async () => {
      const { data } = await supabase.auth.getSession();
      //console.log(data.session)
      if (data.session != null) {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const newData = {
          id: user!.id,
          email: user!.email || undefined,
        };
        setUserData(newData);
      }
      setUserDataLoaded(true);
    };
    getUserData();
  }, []);


  if (userDataLoaded) {
    return userData.email != undefined ? (
      <Box sx={{ width: "100%" }}>
        <Box>
        <Typography variant="h1">Profiili andmed</Typography>
        {userData.email ? (<Typography variant="h3">Email: {userData.email}</Typography>) : null}</Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'space-evenly',
                height: '100%',
                minHeight: '100px'
              }}
            >
              <Button
                onClick={handleOpen}
                variant="contained"
                color="primary"
              >
                Muuda parooli
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx = {{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    minWidth: 300,
                    minHeight: 322,
                    bgcolor: 'background.paper',
                    border: 1,
                    borderColor: "primary.main",
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                  }}
                >
                  <ChangePassword />
                </Box>
              </Modal>
            </Box>
            <Box sx={{ margin: "3vh 0 3vh 0" }}>
              <AuthButton userData={userData} />
            </Box>
          </Grid>
          <ShowUserHistory />
          <ShowUserFavorites />
          <ShowUserForms limit={100}/>
        </Grid>
      </Box>
    ) : (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <AuthButton userData={userData} />
      </Container>
    );
  }
}
