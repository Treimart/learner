import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"

import InspirationalQuote from "../components/InspirationalQuote"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import ShowCategories from "@/components/database/ShowCategories"



export default async function Index() {
  const supabase = createServerComponentClient({ cookies })


  const { data: forms } = await supabase.from("form").select().eq("category_id", 1)

  console.log(forms)


  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <h1 className="flex flex-col items-center">main page</h1>
      <InspirationalQuote />
      <ShowCategories />
    </div>
  )
}
