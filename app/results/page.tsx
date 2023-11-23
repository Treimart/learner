"use client"
import { useEffect, useState } from "react"

type Answer = {
  title: string
  answer: string
}

export default function ResultsPage() {
  const [answers, setAnswers] = useState<Record<string, Answer>>({})

  useEffect(() => {
    const savedAnswers = localStorage.getItem("answers")
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers))
    }
  }, [])

  return (
    <div>
      {Object.entries(answers).map(([questionId, { title, answer }]) => (
        <div key={questionId}>
          <h2>Question: {title}</h2>
          <p>Your Answer: {String(answer)}</p>
        </div>
      ))}
    </div>
  )
}
