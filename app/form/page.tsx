import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import QuestionViewer from "@/components/ViewQuestion"

export const dynamic = "force-dynamic"

export default async function ServerComponent() {
  const supabase = createServerComponentClient({ cookies })

  const { data: questions } = await supabase
    .from("question")
    .select()
    .eq("form_id", 1)

  console.log(questions)

  return (
    <div>
      <QuestionViewer questions={questions} />
    </div>
  )
}
