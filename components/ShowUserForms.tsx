"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface Form {
  id: number
  title: string
  description: string
  status: number
}

export default function ShowUserForms() {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const [userID, setUserID] = useState("")
  const [userIDLoaded, setUserIDLoaded] = useState(false)

  useEffect(() => {
    const getUserID = async () => {
      const { data } = await supabase.auth.getSession()
      //console.log(data.session)
      if (data.session != null) {
        const id = data.session.user.id
        setUserID(id)
      } else {
        console.log("123")
        setUserID("0")
      }
      setUserIDLoaded(true)
    }
    getUserID()
  }, [])

  const [forms, setForms] = useState<Form[]>([])

  const getForms = async () => {
    const { data } = await supabase.from("form").select().eq("user_id", userID)
    if (data) {
      setForms(data)
    }
  }

  //console.log(userID)

  useEffect(() => {
    if (userIDLoaded) {
      getForms()
      //console.log(userIDLoaded, userID)
    }
  }, [userID])

  const handleClick = (id: number) => {
    router.push(`../form?form_id=${id}`)
  }

  const handleStatusChange = async (
    id: number,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newStatus = parseInt(event.target.value)
    console.log("Changing status for form id", id, "to", newStatus)
    const { data, error } = await supabase
      .from("form")
      .update({ status: newStatus })
      .match({ id: id })
    if (error) {
      console.error("Error updating status:", error)
    } else {
      console.log("Updated form:", data)
    }
    getForms()
  }

  return (
    <div>
      <h1>Your Forms</h1>
      <br />
      {forms.map(form => (
        <div key={form.id}>
          <h2
            onClick={() => handleClick(form.id)}
            style={{ cursor: "pointer" }}
          >
            {form.title}
          </h2>
          <p>{form.description}</p>
          <select
            value={form.status}
            onChange={event => handleStatusChange(form.id, event)}
          >
            <option value={1}>Private</option>
            <option value={2}>Only authenticated users</option>
            <option value={3}>Public</option>
          </select>
          <br />
          <br />
        </div>
      ))}
    </div>
  )
}
