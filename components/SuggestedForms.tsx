"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, Grid, Button, Typography } from "@mui/material";
import { format } from "date-fns";

interface Form {
  id: number;
  title: string;
  description: string;
}

export default function ShowUserForms() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const [userID, setUserID] = useState("");
  const [userIDLoaded, setUserIDLoaded] = useState(false);

  useEffect(() => {
    const getUserID = async () => {
      const { data } = await supabase.auth.getSession();
      //console.log(data.session)
      if (data.session != null) {
        const id = data.session.user.id;
        setUserID(id);
      } else {
        console.log("123");
        setUserID("0");
      }
      setUserIDLoaded(true);
    };
    getUserID();
  }, []);

  const [forms, setForms] = useState<Form[]>([]);

  const getForms = async () => {
    const currentTimestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    let data;
    if (userID === "0") {
      ({ data } = await supabase
        .from("form")
        .select()
        .or(`deleted.is.null,deleted.gt.${currentTimestamp}`)
        .order("created", { ascending: false }));
    } else {
      ({ data } = await supabase
        .from("form")
        .select()
        .or(`user_id.neq.${userID},user_id.is.null`)
        .or(`deleted.is.null,deleted.gt.${currentTimestamp}`)
        .order("created", { ascending: false })
        .limit(3));
    }
    if (data) {
      setForms(data);
    }
  };

  //console.log(userID)

  useEffect(() => {
    if (userIDLoaded) {
      getForms();
      //console.log(userIDLoaded, userID)
    }
  }, [userID]);

  const handleClick = (id: number) => {
    router.push(`../form?form_id=${id}`);
  };

  return (
    <>
      <Typography variant="h4" sx={{ margin: "25px 0" }}>
        Sinule soovitatud
      </Typography>
      <Grid
        container
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          gap: "16px",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        {forms.map((form) => (
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
              height: 125,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Button
                key={form.id}
                sx={{
                  justifyContent: "flex-start",
                  width: "fit-content",
                  mr: 2,
                }}
                variant="outlined"
                color="primary"
                onClick={() => handleClick(form.id)}
              >
                {form.title}
              </Button>
            </Box>
            <Typography sx={{ minHeight: "60px", margin: "0.65em 0" }}>
              {form.description}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
