"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button, FormControl, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export default function CreateForm() {
  const supabase = createClientComponentClient();

  //const [user, setUser] = useState(null);
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      const { data } = await supabase.from("category").select();
      if (data) {
        setCategories(data);
      }
    };
    getCategories();
  }, [supabase, setCategories]);

  /*useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (user) {
        setUser(data);
      }
    };
    getUser();
  }, [supabase, setUser]);*/

  const saveNewForm = async () => {
    try {
      /*if (!user) {
        console.error("User is not authenticated");
        return;
      }*/

      if (!formTitle.trim() || !formDescription.trim()) {
        setError("Name and description are required");
        return;
      }

      const currentTimestamp = new Date();

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
            user_id: null,
          },
        ])
        .select();

      if (error) {
        console.error("Error saving the form:", error.message);
      } else {
        console.log("Form saved successfully:", newForm);
        // Optionally, you can redirect the user or perform other actions after saving the form
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <FormControl>
        <TextField
          type="text"
          size="small"
          variant="outlined"
          label="Nimi"
          id="formName"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
        />
        <br />
        <TextField
          type="text"
          size="small"
          variant="outlined"
          label="Kirjeldus"
          id="formDescription"
          value={formDescription}
          onChange={(e) => setFormDescription(e.target.value)}
        />
        <br />
        <select
          placeholder="Vali kategooria"
          size="lg"
          variant="plain"
          color="neutral"
          id="categorySelect"
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value || "")}
        >
          {categories.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
        <br />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button onClick={saveNewForm}>Loo küsimustik</Button>
      </FormControl>
    </div>
  );
}
