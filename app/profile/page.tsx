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

  const renderUserInfoAndActions = (userInfoArray: any[]) => {
    const userInfoItems = userInfoArray.map((info, index) => (
      <Box key={index} sx={{ margin: "3vh 0 3vh 0" }}>
        {info}
      </Box>
    ));

    return <div>{userInfoItems}</div>;
  };

  const renderUserHistoryAndFavorites = (userHistoryArray: any[]) => {
    const userHistoryItems = userHistoryArray.map((info, index) => (
      <Box key={index} sx={{ margin: "3vh 0 3vh 0" }}>
        {info}
      </Box>
    ));

    return <div>{userHistoryItems}</div>;
  };

  let userInfoArray: string[] = [" "];
  if (userData && userData.email) {
    userInfoArray = [`Email: ${userData.email}`];
  }
  const userHistoryArray = [<ShowUserHistory />];

  if (userDataLoaded) {
    return userData.email != undefined ? (
      <Container sx={{ width: "100%" }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h4">PROFIILI ANDMED</Typography>
            {renderUserInfoAndActions(userInfoArray)}
            <Box sx={{ margin: "3vh 0 3vh 0" }}>
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
          <Grid item xs={6}>
            {renderUserHistoryAndFavorites(userHistoryArray)}
          </Grid>
          <Typography variant="h4" sx={{ margin: "25px 0" }}>
            Sinu lemmikud
          </Typography>
          <ShowUserFavorites />
          <ShowUserForms limit={100}/>
        </Grid>
      </Container>
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
