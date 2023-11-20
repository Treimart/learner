
import { Box, List } from '@mui/material'
import AdjustIcon from '@mui/icons-material/Adjust';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import GetForms from './GetForms'



export default function ShowForms({categoryID}: any) {

	const supabase = createClientComponentClient()
		

	return (
		<Box sx={{ display: 'flex' }}>
			<AdjustIcon />
			<GetForms categoryID={categoryID}/>
		</Box>
	)
		
}