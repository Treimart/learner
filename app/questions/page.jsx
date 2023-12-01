"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

export default function CreateQuestion() {
  const supabase = createClientComponentClient();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isEvaluable, setIsEvaluable] = useState(true);
  const [photo, setPhoto] = useState("");
  const [formData, setFormData] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const storedFormId =
    typeof window !== "undefined" ? localStorage.getItem("formId") : null;
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

  const handleCheckboxChange = (event) => {
    setIsEvaluable(event.target.checked);
    console.log(isEvaluable);
  };

  const saveNewQuestion = async () => {
    try {
      if (!question.trim() && !answer.trim()) {
        setError("Küsimus ja/või vastus on lisamata!");
        return;
      }

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
        setMessage("Küsimus lisatud!");
      }

      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Typography variant="h1">{formTitle}</Typography>
      <FormControl>
        <TextField
          sx={{ my: 2 }}
          required
          type="text"
          size="small"
          variant="outlined"
          label="Küsimus"
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <TextField
          sx={{ my: 2 }}
          required
          type="text"
          size="small"
          variant="outlined"
          label="Vastus"
          id="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <TextField
          sx={{ my: 2 }}
          type="text"
          size="small"
          variant="outlined"
          label="Url"
          id="photo"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
        />
        <FormControlLabel
          required
          control={
            <Checkbox checked={isEvaluable} onChange={handleCheckboxChange} />
          }
          label="On hinnatav"
        />
        <Tooltip
          title="Salvesta"
          placement="right"
          sx={{
            width: "fit-content",
            my: 2,
          }}
        >
          <IconButton onClick={saveNewQuestion}>
            <AddCircleRoundedIcon fontSize="large" />
          </IconButton>
        </Tooltip>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p>{message}</p>
        <Button
          href="/"
          className="py-2 px-4 rounded-md no-underline"
          variant="contained"
          color="primary"
          sx={{
            width: "fit-content",
          }}
        >
          Lõpeta
        </Button>
      </FormControl>
    </div>
  );
}
