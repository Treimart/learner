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
  const [submittedQuestions, setSubmittedQuestions] = useState([]);
  const [rerender, setRerender] = useState(false);

  const storedFormId =
    typeof window !== "undefined" ? localStorage.getItem("formId") : null;
  const formTitle = formData.title;

  useEffect(() => {
    const fetchData = async () => {
      // Fetch form data
      const formResponse = await supabase
        .from("form")
        .select(`title`)
        .eq("id", storedFormId);
      const formData = formResponse.data[0] || {};
      setFormData(formData);
    };

    // Call the fetchData function
    fetchData();
  }, [supabase, storedFormId]);

  const fetchSubmittedQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from("question")
        .select("id, title, answer, photo_url")
        .eq("form_id", storedFormId);

      if (error) {
        console.error("Error fetching submitted questions:", error.message);
      } else {
        console.log("Submitted Questions:", data);
        setSubmittedQuestions(data || []);
      }
    } catch (error) {
      console.error(
        "An error occurred while fetching submitted questions:",
        error.message
      );
    }
  };

  const handleCheckboxChange = () => {
    setIsEvaluable((prevValue) => !prevValue);
  };

  const saveNewQuestion = async () => {
    try {
      if (!question.trim() || !answer.trim()) {
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
        console.log(submittedQuestions);
        setMessage("Küsimus lisatud!");
        setError(null);
        setQuestion("");
        setAnswer("");
        setPhoto("");
        setIsEvaluable(true);
      }

      setTimeout(() => {
        setMessage(null);
      }, 3000);
      setRerender((prev) => !prev);
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  useEffect(() => {
    // Fetch submitted questions when the component mounts or when rerender changes
    if (storedFormId || rerender) {
      fetchSubmittedQuestions();
    }
  }, [storedFormId, rerender]);

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Typography variant="h3">{formTitle}</Typography>

      <div className="flex-container">
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

        <div className="submitted-questions">
          <Typography variant="h5">Lisatud küsimused:</Typography>
          {submittedQuestions.map((submittedQuestion) => (
            <div key={submittedQuestion.id}>
              <Typography>
                K: {submittedQuestion.title}, V: {submittedQuestion.answer}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
