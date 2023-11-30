"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button, FormControl, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CheckBox } from "@mui/icons-material";

export default function CreateQuestion() {
  const supabase = createClientComponentClient();
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [isEvaluable, setIsEvaluable] = useState(true);
  const [photo, setPhoto] = useState(null);
  const [userID, setUserID] = useState("");
  const [formData, setFormData] = useState("");
  const storedFormId = localStorage.getItem("formId");
  const formTitle = formData.title;

  useEffect(() => {
    const getFormData = async () => {
      const { data } = await supabase
        .from("form")
        .select(`title`)
        .eq("id", storedFormId);
      if (data.length > 0) {
        setFormData(data[0]);
      }
    };
    getFormData();
  }, [supabase, storedFormId]);

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

  const saveNewQuestion = async () => {
    try {
      /*           if (!formTitle.trim() || !formDescription.trim()) {
            setError("Name and description are required");
            return;
          } */

      const { data: newQuestion, error } = await supabase
        .from("question")
        .insert([
          {
            form_id: storedFormId,
            title: question,
            answer: answer,
            photo_url: photo,
            is_evaluable: isEvaluable,
          },
        ])
        .select();

      if (error) {
        console.error("Error saving the question:", error.message);
      } else {
        console.log("Question saved successfully:", newQuestion);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Typography variant="h1">{formTitle}</Typography>
      <FormControl>
        <TextField
          type="text"
          size="small"
          variant="outlined"
          label="Küsimus"
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <br />
        <TextField
          type="text"
          size="small"
          variant="outlined"
          label="Vastus"
          id="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <br />
        <Button onClick={saveNewQuestion}>Salvesta</Button>
      </FormControl>
    </div>
  );
}
