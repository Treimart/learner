import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"

import InspirationalQuote from "../components/InspirationalQuote"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

export default async function Index() {
  const cookieStore = cookies()

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <h1 className="flex flex-col items-center">main page</h1>
      <InspirationalQuote />
    </div>
  )
}
