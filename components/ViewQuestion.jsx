"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { format } from "date-fns";

import { Box, Button, Typography, TextField, IconButton } from "@mui/material"
import StarIcon from '@mui/icons-material/Star';


export default function ViewQuestion() {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const searchParams = useSearchParams()
  const form_id = searchParams.get("form_id")

  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [fav, setFav] = useState(false)
  const [formData, setFormData] = useState("")
  const [userID, setUserID] = useState("")
  const [userIDLoaded, setUserIDLoaded] = useState(false)
  const [answers, setAnswers] = useState({})

  // Get the current question
  const currentQuestion = questions[currentQuestionIndex]
  const formTitle = formData.title

  useEffect(() => {
    const getQuestions = async () => {
      const { data } = await supabase
        .from("question")
        .select()
        .eq("form_id", form_id)
      if (data) {
        setQuestions(data)
      }
    }
    getQuestions()
  }, [supabase, setQuestions])

  useEffect(() => {
    const getFormData = async () => {
      const { data } = await supabase
        .from("form")
        .select(`id, title, category(name)`)
        .eq("id", form_id)
      if (data.length > 0) {
        setFormData(data[0])
      }
    }
    getFormData()
  }, [supabase, form_id])

  const getUserID = async () => {
    const { data } = await supabase.auth.getUser()
    if (data) {
      const id = data.user.id
      setUserID(id)
      setUserIDLoaded(true)
    }
  }
  getUserID()
  //console.log("form:", form_id, " user:", userID)

  if (userIDLoaded) {
    const getInitialFavorite = async () => {
      const { data } = await supabase
        .from("favorite")
        .select()
        .match({ form_id: form_id, user_id: userID })
      if (data) {
        if (data.length > 0) {
          setFav(true)
        }
      }
    }
    getInitialFavorite()
  }

  const getFavorite = async () => {
    if (userIDLoaded) {
      const { data } = await supabase
        .from("favorite")
        .select()
        .match({ form_id: form_id, user_id: userID })
      if (data) {
        return data
      }
    }
  }

  const saveNewFavorite = async () => {
    const a = await getFavorite()
    //console.log(a[0].id)
    if (!fav) {
      try {
        setFav(true)
        const { data: newFavorite, error } = await supabase
          .from("favorite")
          .insert([
            {
              form_id: form_id,
              user_id: userID
            },
          ])
          .select()
        if (error) {
          console.error("Error saving fav:", error.message);
        } else {
          console.log("Fav saved successfully:", newFavorite);
        }
      } catch (error) {
        console.error("An error occurred:", error.message)
      }
    } else {
      try {
        setFav(false)
        const { error } = await supabase
          .from('favorite')
          .delete()
          .eq('id', a[0].id)
        if (error) {
          console.error("Error deleting fav:", error.message);
        } else {
          console.log("Fav deleted successfully!");
        }
      } catch (error) {
        console.error("An error occurred:", error.message)
      }
    }
  }

  const handleAnswerChange = e => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: {
        answer: e.target.value,
        title: currentQuestion.title
      }
    })
  }


  // Handlers for next and previous buttons
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleFinish = async () => {
    localStorage.setItem("answers", JSON.stringify(answers))
    const currentTimestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss");

    try {
      const { data: hist, count } = await supabase
        .from("history")
        .select('*', { count: 'exact' })
        .match({ form_id: form_id, user_id: userID })
      console.log(hist, count)
      if ( count == 0 ) {
        const { data, error } = await supabase
          .from("history")
          .insert([
            {
              user_id: userID,
              form_id: form_id,
              lastcompletion: currentTimestamp
            },
          ])
          .select()
        if (error) {
          console.error("Error saving hist:", error.message);
        } else {
          console.log("hist saved successfully:", data);
        }
      } else if ( count == 1 ) {
        const { data, error } = await supabase
        .from("history")
        .update({ lastcompletion: currentTimestamp })
        .match({ form_id: form_id, user_id: userID })
        .select()
      if (error) {
        console.error("Error saving hist:", error.message);
      } else {
        console.log("hist udated successfully:", data);
      }
      }
    } catch (error) {
      console.error("An error occurred:", error.message)
    }

    router.push("/results/")
  }



  return (
    <Box>
      <Box 
        sx={{ 
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography variant="h1">{formTitle}</Typography>
        <IconButton onClick={saveNewFavorite}>
          <StarIcon 
            fontSize="large"
            sx={{
              color: !fav ? 'primary.main' : "#FFC861",
              "&:hover": {
                color: 'secondary.main'
              }
            }}
          />
        </IconButton>
      </Box>
      
      {questions.map(({ id: questionID }, i) => (
        <Button
          variant="contained"
          key={questionID}
          onClick={() => setCurrentQuestionIndex(i)}
          sx={{
            backgroundColor: currentQuestionIndex === i ? "secondary.main" : null, // Change background color for active button
            mr: 2,
            mb: 2
          }}
        >
          {i + 1}
        </Button>
      ))}
      {currentQuestion && (
        <>
          <Typography variant="h2">{currentQuestion.title}</Typography>
          {currentQuestion.photo_url && (
            <Box
              component="img"
              sx={{
                maxHeight: 300
              }}
              src={currentQuestion.photo_url}
              alt={currentQuestion.title}
            />
          )}
          <TextField
            id="user_answer"
            label="Vastus"
            variant="outlined"
            placeholder="Sisesta vastus"
            value={answers[currentQuestion.id]?.answer || ""}
            onChange={handleAnswerChange}
            sx={{mt: 2}}
            fullWidth
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              mt: 2
            }}
          >
            <Box>
              <Button
                color="primary"
                variant="contained"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                sx={{
                  mr: 2,
                  "&.Mui-disabled": {
                    background: "secondary",
                    color: "#c0c0c0"
                  }
                }}
              >
                Eelmine
              </Button>
              <Button
                color="primary"
                variant="contained"
                onClick={handleNext}
                disabled={currentQuestionIndex === questions.length - 1}
                sx={{
                  "&.Mui-disabled": {
                    background: "secondary",
                    color: "#c0c0c0"
                  }
                }}
              >
                Järgmine
              </Button>
            </Box>
            <Button
              color="primary"
              variant="contained"
              onClick={handleFinish}
            >
              Lõpeta
            </Button>
          </Box>
        </>
      )}
    </Box>
  )
}
