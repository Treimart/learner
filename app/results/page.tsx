"use client"
import { useEffect, useState } from "react"

export default function ResultsPage() {
  const [answers, setAnswers] = useState({})

  useEffect(() => {
    const savedAnswers = localStorage.getItem("answers")
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers))
    }
  }, [])

  return (
    <div>
      {Object.entries(answers).map(([questionId, answer]) => (
        <div key={questionId}>
          <h2>Question ID: {questionId}</h2>
          <p>Answer: {String(answer)}</p>
        </div>
      ))}
    </div>
  )
}
