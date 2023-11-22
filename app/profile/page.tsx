import AuthButton from '@/components/AuthButton';
import { Box, Container, Grid } from '@mui/material';
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Profile() {

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const renderUserInfoAndActions = (userInfoArray: any[]) => {
    const userInfoItems = userInfoArray.map((info, index) => (
      <Box key={index} sx={{ margin: '3vh 0 3vh 0' }}>{info}</Box>
    ));

    return (
      <div>
        {userInfoItems}
      </div>
    );
  };

  const renderUserHistoryAndFavorites = (userHistoryArray: any[]) => {
    const userHistoryItems = userHistoryArray.map((info, index) => (
      <Box key={index} sx={{ margin: '3vh 0 3vh 0' }}>{info}</Box>
    ));

    return (
      <div>
        {userHistoryItems}
      </div>
    )
  }

  let userInfoArray: string[] = [" "];
  if (user && user.email) {
    userInfoArray = [`Email: ${user.email}`];
  }
  const userHistoryArray = ["Ajalugu", "Lemmikud", "Minu küsimustikud"];

  return (
    <Container sx={{ width: '100%' }}>
      PROFIILI ANDMED
      <Grid container spacing={2}>
      <Grid item xs={6}>
        {renderUserInfoAndActions(userInfoArray)}
        <Box sx={{ margin: '3vh 0 3vh 0' }}>
          <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">Muuda parooli</button>
        </Box>
        <Box sx={{ margin: '3vh 0 3vh 0' }}>
          <AuthButton/>
        </Box>
      </Grid>
      <Grid item xs={6}>
        {renderUserHistoryAndFavorites(userHistoryArray)}
      </Grid>
    </Grid>
    </Container>
  );
}
