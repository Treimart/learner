"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

export default function ViewQuestion() {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const searchParams = useSearchParams()
  const form_id = searchParams.get("form_id")

  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

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

  // Get the current question
  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div>
      {currentQuestion && (
        <>
          <h1>{currentQuestion.title}</h1>
          {currentQuestion.photo_url && (
            <img
              src={currentQuestion.photo_url}
              alt={currentQuestion.title}
            />
          )}
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentQuestionIndex === questions.length - 1}
          >
            Next
          </button>
        </>
      )}
    </div>
  )
}
