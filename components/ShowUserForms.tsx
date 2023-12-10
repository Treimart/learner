"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  Box,
  Grid,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tooltip,
  Typography,
} from "@mui/material";
import { format } from "date-fns";

interface Form {
  id: number;
  title: string;
  description: string;
  status: number;
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

  const handleStatusChange = async (
    id: number,
    event: SelectChangeEvent<number>
  ) => {
    const newStatus = event.target.value;
    const currentTimestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    console.log("Changing status for form id", id, "to", newStatus);
    const { data, error } = await supabase
      .from("form")
      .update({ status: newStatus, updated: currentTimestamp })
      .match({ id: id })
      .select();
    if (error) {
      console.error("Error updating status:", error);
    } else {
      console.log("Updated form:", data);
    }
    getForms();
  };

  const deleteForm = async (id: number) => {
    const currentTimestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    const { data, error } = await supabase
      .from("form")
      .update({ deleted: currentTimestamp })
      .match({ id: id })
      .select();
    if (error) {
      console.error("Error updating delete:", error);
    } else {
      console.log("Deleted form:", data);
      getForms();
    }
  };

  return (
    <>
    <Typography variant="h4" sx={{ margin: "25px 0" }}>
      Sinu küsimustikud
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
            height: 200,
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
            <Tooltip title="Kustuta" placement="right" arrow>
              <DeleteOutlineIcon
                onClick={() => deleteForm(form.id)}
                sx={{
                  color: "red",
                  cursor: "pointer",
                  height: "1.25em",
                }}
              />
            </Tooltip>
          </Box>
          <Typography sx={{ minHeight: "60px", margin: "0.65em 0" }}>
            {form.description}
          </Typography>
          <FormControl
            sx={{
              mt: 1,
              mb: 2,
              minWidth: 200,
              justifyContent: "flex-start",
              width: "fit-content",
            }}
            size="small"
          >
            <InputLabel id="formStatus">Olek</InputLabel>
            <Select
              labelId="formStatusLabel"
              id="formStatus"
              value={form.status}
              label="Olek"
              onChange={(event) => handleStatusChange(form.id, event)}
            >
              <MenuItem value={1}>Privaatne</MenuItem>
              <MenuItem value={2}>Kontodega kasutajad</MenuItem>
              <MenuItem value={3}>Avalik</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      ))}
    </Grid>
    </>
  );
}
