"use client"
import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useSearchParams } from "next/navigation"
import { Box, Button, Typography } from "@mui/material"

type Answer = {
  title: string
  answer: string
  correctAnswer?: string
  is_evaluable?: boolean
}

export default function ResultsPage() {
  const supabase = createClientComponentClient()
  const [answers, setAnswers] = useState<Record<string, Answer>>({})
  const searchParams = useSearchParams()
  const form_id = searchParams.get("form_id") 

  useEffect(() => {
    const savedAnswers = localStorage.getItem("answers")
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers))
    }
  }, [])

  useEffect(() => {
    const fetchCorrectAnswers = async () => {
      const { data } = await supabase
        .from("question")
        .select("id, answer, is_evaluable")
      if (data) {
        const correctAnswers = Object.fromEntries(
          data.map(({ id, answer, is_evaluable }) => [
            id,
            { answer, is_evaluable }
          ])
        )
        setAnswers(prevAnswers => {
          return Object.fromEntries(
            Object.entries(prevAnswers).map(([questionId, answer]) => {
              return [
                questionId,
                {
                  ...answer,
                  correctAnswer: correctAnswers[questionId]?.answer,
                  is_evaluable: correctAnswers[questionId]?.is_evaluable
                }
              ]
            })
          )
        })
      }
    }
    fetchCorrectAnswers()
  }, [supabase])

  return (
    <Box>
      <Typography variant="h1">Tulemused</Typography>
      {Object.entries(answers).map(
        ([questionId, { title, answer, correctAnswer, is_evaluable }]) => (
        <Box
        sx={{
          mt: 2,
          mb: 2,
        }}>
          <Box key={questionId}>
            <Typography variant="h4">{title}</Typography>
            <Typography
              style={{
                color: is_evaluable
                  ? answer.toLowerCase() == correctAnswer?.toLowerCase()
                    ? "green"
                    : "red"
                  : "black"
              }}
            >
            Sinu vastus: {String(answer)}
            </Typography>
            {correctAnswer && <Typography>Õige vastus: {correctAnswer}</Typography>}
          </Box>
        )
      )}
      <Button 
      href={`/form?form_id=${form_id}`}
      variant="contained"
      color="primary"
      sx={{
        mt: 2
      }}>
        Proovi uuesti
      </Button>
      <Button
        href="/"
        variant="contained"
        color="primary"
        sx={{
          mt: 2
        }}
      >
        Mine avalehele
      </Button>
    </Box>
  )
}
