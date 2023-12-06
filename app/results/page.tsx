"use client"
import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

type Answer = {
  title: string
  answer: string
  correctAnswer?: string
  is_evaluable?: boolean
}

export default function ResultsPage() {
  const supabase = createClientComponentClient()
  const [answers, setAnswers] = useState<Record<string, Answer>>({})

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
    <div>
      {Object.entries(answers).map(
        ([questionId, { title, answer, correctAnswer, is_evaluable }]) => (
          <div key={questionId}>
            <h2>Küsimus: {title}</h2>
            <p
              style={{
                color: is_evaluable
                  ? answer.toLowerCase() == correctAnswer?.toLowerCase()
                    ? "green"
                    : "red"
                  : "black"
              }}
            >
              Sinu vastus: {String(answer)}
            </p>
            {correctAnswer && <p>Õige vastus: {correctAnswer}</p>}
            <br />
          </div>
        )
      )}
    </div>
  )
}
