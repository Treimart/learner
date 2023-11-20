
import { cookies } from "next/headers"
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import ShowForms from "./ShowForms"



export default async function GetCategories() {
  const supabase = createServerComponentClient({ cookies })

	const { data: categories } = await supabase.from("category").select()
		if (!categories) {
		return <p>No categories found</p>
	}
	

	return (
			categories.map((category) => (
				<div>
					<h3>{category.name}</h3>
					<ShowForms categoryID={category.id} />
				</div>
			))
	)
}
