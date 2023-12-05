"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import SaveNewCategory from "@/components/SaveNewCategory"

export default function CreateForm() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  //const [user, setUser] = useState(null);
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [userID, setUserID] = useState("");

  useEffect(() => {
    const getUserID = async () => {
      const { data } = await supabase.auth.getUser();
      if (data) {
        const id = data.user.id;
        setUserID(id);
        //setUserIDLoaded(true)
      }
    };
    getUserID();
  }, [supabase, setUserID]);

  useEffect(() => {
    const getCategories = async () => {
      const { data } = await supabase.from("category").select();
      if (data) {
        setCategories(data);
      }
    };
    getCategories();
  }, [supabase, setCategories]);

  const saveNewForm = async () => {
    try {
      if (!userID) {
        console.error("Kasutaja ei ole autenditud");
        return;
      }

      if (!formTitle.trim() || !formDescription.trim()) {
        setError("Nimi ja kirjeldus on kohustuslikud");
        return;
      }

      const currentTimestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss");

      const { data: newForm, error } = await supabase
        .from("form")
        .insert([
          {
            category_id: selectedCategoryId,
            title: formTitle,
            description: formDescription,
            status: 1,
            created: currentTimestamp,
            updated: null,
            deleted: null,
            user_id: userID,
          },
        ])
        .select();

      if (error) {
        console.error("Error saving the form:", error.message);
      } else {
        console.log("Form saved successfully:", newForm);
        const formId = newForm[0].id;
        localStorage.setItem("formId", formId);
        router.push("/questions/");
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  return (
    <Box
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
      }}
    >
      <Typography variant="h1">Loo uus küsimustik</Typography>
      <FormControl>
        <TextField
          required
          type="text"
          size="small"
          variant="outlined"
          label="Nimi"
          id="formName"
          value={formTitle}
          inputProps={{
            maxLength: 30,
          }}
          onChange={(e) => setFormTitle(e.target.value)}
          sx={{
            mb: 2,
            width: '30rem'
          }}
        />
        <TextField
          required
          type="text"
          size="small"
          variant="outlined"
          label="Kirjeldus"
          id="formDescription"
          value={formDescription}
          inputProps={{
            maxLength: 75,
          }}
          onChange={(e) => setFormDescription(e.target.value)}
          sx={{
            mb: 2
          }}
        />
        <TextField
          select
          id="categorySelect"
          value={categories.length ? selectedCategoryId : ""}
          label="Kategooria"
          onChange={(e) => setSelectedCategoryId(e.target.value)}
          sx={{
            mb: 2
          }}
        >
          {categories.map(({ id, name }) => (
            <MenuItem key={id} value={JSON.stringify(id)}>
              {name}
            </MenuItem>
          ))}
        </TextField>
        {error && <Typography style={{ color: "red" }}>{error}</Typography>}
        <Button 
          variant="contained"
          color="primary"
          onClick={saveNewForm}
          sx={{
            mt: 2
          }}
        >
          Loo küsimustik
        </Button>
      </FormControl>
      <SaveNewCategory />
    </Box>
  );
}
