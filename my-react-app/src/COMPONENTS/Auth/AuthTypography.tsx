import { Typography } from "@mui/material";



function AuthTypography({formName}:{formName:string}){
    return(
        <>
        <Typography
          variant="subtitle1"
          sx={{ mb: 4, color: '#555', fontWeight: 500 }}
        >
          Please {formName} to continue
        </Typography>
        </>
    )
}
export {AuthTypography}