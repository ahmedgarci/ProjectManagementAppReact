import { Alert, Box } from "@mui/material";

export default function DisplayError({error}:{error:string}){
    return(
            <Box sx={{mb:2,width:'100%'}}>
              <Alert severity="error">
                { error || 'An unexpected error occurred.'}
              </Alert>
            </Box>
    )
}