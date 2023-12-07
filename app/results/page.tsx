"use client"
import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@mui/material"

type Answer = {
  title: string
  answer: string
  correctAnswer?: string
  is_evaluable?: boolean
}

export default function ResultsPage() {
  const supabase = createClientComponentClient()
  const [answers, setAnswers] = useState<Record<string, Answer>>({})
  const [userID, setUserID] = useState("")
  const [userIDLoaded, setUserIDLoaded] = useState(false)
  const [latestEntry, setLatestEntry] = useState<any>(null)

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

   useEffect(() => {
    const getUserID = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session != null) {
        const id = data.session.user.id
        setUserID(id)
      } else {
        setUserID("0")
      }
      setUserIDLoaded(true)
    }
    getUserID()
  }, [])
  
  useEffect(() => {
    if (userIDLoaded && userID !== "0") {
      const fetchHistory = async () => {
        const { data: historyData, error } = await supabase
          .from('history')
          .select('form_id, lastcompletion')
          .eq('user_id', userID)
          .order('lastcompletion', { ascending: false })
          .limit(1);
        if (error) {
          console.error('Error fetching history:', error.message)
          return;
        }
    
        if (historyData && historyData.length > 0) {
          const latest = historyData[0]
          setLatestEntry(latest)
        }
      };
      fetchHistory()
    }
  }, [supabase, userID, userIDLoaded])

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
      <Button href={`/form?form_id=${latestEntry?.form_id}`}>
        Proovi uuesti
      </Button>
    </div>
  )
}
