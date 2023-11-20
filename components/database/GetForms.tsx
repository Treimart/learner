
import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"


export default async function GetForms({categoryID}: any) {
  const supabase = createServerComponentClient({ cookies })

	const { data: forms } = await supabase.from("form").select().eq('category_id', categoryID)
		if (!forms) {
		return <p>No forms found</p>
	}

	return (
			forms.map((form) => (
					<h5>{form.title}</h5>
			))
	)
}
  