import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export default async function Index() {
  const res = await fetch("https://official-joke-api.appspot.com/random_joke")
  const data = await res.json()
  const setup = data.setup
  const punchline = data.punchline

  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user }
  } = await supabase.auth.getUser()

  return (
    <div className="flex flex-col items-center">
      {user ? null : (
        <div className="flex flex-col items-center">
          <pre>{setup}</pre>
          <pre>{punchline}</pre>
        </div>
      )}
    </div>
  )
}
