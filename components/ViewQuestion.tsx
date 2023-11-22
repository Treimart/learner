"use client"

import { useState } from "react"

export default function QuestionViewer({ questions }: any) {
  // Initialize state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

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
    </div>
  )
}
