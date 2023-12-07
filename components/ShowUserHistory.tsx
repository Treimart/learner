"use client";

import { Box, Button, Typography } from "@mui/material";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Form {
  id: number;
  title: string;
  time: string;
}

export default function ShowUserHistory() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [userID, setUserID] = useState("");
  const [userIDLoaded, setUserIDLoaded] = useState(false);

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

  const [history, setHistory] = useState<Form[]>([]);

  const getHistroy = async () => {
    const { data } = await supabase
      .from("history")
      .select("id, user_id, form_id, lastcompletion, form(id, title)")
      .eq("user_id", userID)
      .order("lastcompletion", { ascending: false });
    if (data) {
      const mappedForm: Form[] = data.map((item: any) => ({
        id: item.form.id,
        title: item.form.title,
        time: item.lastcompletion,
      }));
      setHistory(mappedForm);
    }
  };

  useEffect(() => {
    if (userIDLoaded) {
      getHistroy();
    }
  }, [userID]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4">Sinu ajalugu</Typography>
      {history.map((form) => (
        <Button
          key={form.id}
          sx={{
            justifyContent: "flex-start",
            width: "fit-content",
          }}
          variant="text"
          color="primary"
          onClick={() => router.push("/form?form_id=" + form.id)}
        >
          {form.title}
        </Button>
      ))}
    </Box>
  );
}
