"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Tooltip } from "@mui/material";
import { format } from "date-fns";

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
    const currentTimestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    const { data } = await supabase
      .from("form")
      .select()
      .eq("user_id", userID)
      .or(`deleted.is.null,deleted.gt.${currentTimestamp}`)
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
    const currentTimestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss")
    console.log("Changing status for form id", id, "to", newStatus)
    const { data, error } = await supabase
      .from("form")
      .update({ status: newStatus, updated: currentTimestamp })
      .match({ id: id })
      .select()
    if (error) {
      console.error("Error updating status:", error)
    } else {
      console.log("Updated form:", data)
    }
    getForms()
  }

  const deleteForm = async (id: number) => {
    const currentTimestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    const { data, error } = await supabase
      .from("form")
      .update({ deleted: currentTimestamp})
      .match({ id: id })
      .select()
    if (error) {
      console.error("Error updating delete:", error)
    } else {
      console.log("Deleted form:", data)
      getForms()
    }
  }

  return (
    <div>
      <h1>Sinu küsimustikud</h1>
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
            <option value={1}>Privaatne</option>
            <option value={2}>Kontodega kasutajad</option>
            <option value={3}>Avalik</option>
          </select>
          <br />
          <Tooltip
            title="Kustuta"
            placement="right"
            arrow
          >
            <DeleteOutlineIcon 
              onClick={() => deleteForm(form.id)}
              sx={{
                color: "red",
                cursor: "pointer"
              }}
            />
          </Tooltip>
          <br />
        </div>
      ))}
    </div>
  )
}
