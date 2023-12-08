"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Typography, Button, Grid } from "@mui/material";

export default function MainPageCategories() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [userID, setUserID] = useState("");
  const [userIDLoaded, setUserIDLoaded] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activeCategories, setActiveCategories] = useState([]);

  useEffect(() => {
    const getUserID = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session != null) {
        const id = data.session.user.id;
        setUserID(id);
      } else {
        setUserID("0");
      }
      setUserIDLoaded(true);
    };
    getUserID();
  }, []);

  const [forms, setForms] = useState([]);

  const getForms = async () => {
    const currentTimestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    const { data } = await supabase
      .from("form")
      .select()
      .eq("user_id", userID)
      .or(`deleted.is.null,deleted.gt.${currentTimestamp}`)
      .order("id", { ascending: true });
    if (data) {
      setForms(data);
    }
  };

  useEffect(() => {
    if (userIDLoaded) {
      getForms();
    }
  }, [userID]);

  useEffect(() => {
    const getCategories = async () => {
      const { data } = await supabase.from("category").select();
      if (data) {
        setCategories(data);
      }
    };
    getCategories();
  }, [supabase, setCategories]);

  useEffect(() => {
    const filteredCategories = categories.filter((category) =>
      forms.some((form) => form.category_id === category.id)
    );
    setActiveCategories(filteredCategories);
  }, [categories, forms]);

  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
      }}
    >
      {activeCategories.map(({ id: catID, name }) => (
        <Grid
          item
          key={catID}
          sx={{
            display: "flex",
            flexDirection: "column",
            border: 1,
            borderColor: "primary.main",
            boxShadow: 1,
            borderRadius: 2,
            p: 2,
            m: 2,
            minWidth: 300,
            minHeight: 100,
          }}
        >
          <Typography key={catID} variant="h5">
            {name}
          </Typography>

          {forms
            .filter((form) => form.category_id == catID)
            .map(({ id: formID, title }) => (
              <Button
                style={{ justifyContent: "flex-start" }}
                sx={{
                  width: "fit-content",
                  my: 1,
                }}
                color="primary"
                variant="contained"
                onClick={() => router.push("/form?form_id=" + formID)}
                key={formID}
              >
                {title}
              </Button>
            ))}
        </Grid>
      ))}
    </Grid>
  );
}
