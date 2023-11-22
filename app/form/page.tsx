import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export const dynamic = "force-dynamic"

export default async function ServerComponent() {
  const supabase = createServerComponentClient({ cookies })

  const { data: question } = await supabase.from("question").select()

  return (
    <div>
      <pre>{JSON.stringify(question, null, 2)}</pre>
    </div>
  )
}
