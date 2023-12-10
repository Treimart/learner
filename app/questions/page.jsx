"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField,
  Typography,
  Grid,
  Card,
} from "@mui/material";
import React, { useEffect, useState } from "react";

export default function CreateQuestion() {
  const supabase = createClientComponentClient();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isEvaluable, setIsEvaluable] = useState(true);
  const [photo, setPhoto] = useState("");
  const [formData, setFormData] = useState("");
  const [error, setError] = useState(null);
  const [submittedQuestions, setSubmittedQuestions] = useState([]);
  const [rerender, setRerender] = useState(false);

  const storedFormId =
    typeof window !== "undefined" ? localStorage.getItem("formId") : null;
  const formTitle = formData.title;

  useEffect(() => {
    const fetchData = async () => {
      const formResponse = await supabase
        .from("form")
        .select(`title`)
        .eq("id", storedFormId);
      const formData = formResponse.data[0] || {};
      setFormData(formData);
    };
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

      const { data: error } = await supabase
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
        setError(null);
        setQuestion("");
        setAnswer("");
        setPhoto("");
        setIsEvaluable(true);
      }

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
    <>
      <Typography variant="h3">{formTitle}</Typography>
      <Grid
        sx={{
          display: "flex",
          flexDirection: "row",
          mt: 2,
          mb: 10,
        }}
      >
        <FormControl
          sx={{
            width: 500,
            border: 1,
            borderColor: "primary.main",
            borderRadius: 1,
            p: 2,
          }}
        >
          <TextField
            sx={{ my: 2 }}
            required
            type="text"
            size="medium"
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
            size="medium"
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
          <Button
            onClick={saveNewQuestion}
            variant="outlined"
            color="primary"
            sx={{
              width: 90,
              mt: 2,
            }}
          >
            Salvesta
          </Button>
          <Button
            href="/"
            variant="outlined"
            color="primary"
            sx={{
              width: 90,
              mt: 2,
              mb: 5,
            }}
          >
            Lõpeta
          </Button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </FormControl>
        <Card
          sx={{
            ml: 5,
            p: 2,
            backgroundColor: "#647360",
            color: "white",
            minWidth: 500,
            maxWidth: 500,
          }}
        >
          {submittedQuestions.map((submittedQuestion) => (
            <div>
              <Typography
                key={submittedQuestion.id}
                sx={{
                  mb: 1,
                }}
              >
                <p style={{ fontWeight: "bold" }}>{submittedQuestion.title}</p>
                {submittedQuestion.answer}
              </Typography>
            </div>
          ))}
        </Card>
      </Grid>
    </>
  );
}
