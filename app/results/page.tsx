"use client"
import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

type Answer = {
  title: string
  answer: string
  correctAnswer?: string
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
      const { data } = await supabase.from("question").select("id, answer")
      if (data) {
        const correctAnswers = Object.fromEntries(
          data.map(({ id, answer }) => [id, answer])
        )
        setAnswers(prevAnswers => {
          return Object.fromEntries(
            Object.entries(prevAnswers).map(([questionId, answer]) => {
              return [
                questionId,
                { ...answer, correctAnswer: correctAnswers[questionId] }
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
        ([questionId, { title, answer, correctAnswer }]) => (
          <div key={questionId}>
            <h2>Question: {title}</h2>
            <p>Your Answer: {String(answer)}</p>
            {correctAnswer && <p>Correct Answer: {correctAnswer}</p>}
            <br />
          </div>
        )
      )}
    </div>
  )
}
