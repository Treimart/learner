import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"

export default async function Index() {
  const cookieStore = cookies()

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
    <h1>
      main page
    </h1>
  </div>
  )
}
