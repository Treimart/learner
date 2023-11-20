
import { List } from '@mui/material'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import GetCategories from './GetCategories'



export default function ShowCategories() {

	const supabase = createClientComponentClient()
		

	return (
			<GetCategories />
	)
		
  }