import { Box, Typography } from "@mui/material";
import { useAuthStore } from "../STORE/Auth";


export default function SidebarUserProfile (){
    const {auth} = useAuthStore.getState()
    console.log(auth);
    return(
        <Box sx={{display:"flex" , justifyContent:"center", alignItems:"center" , mt:5, gap:2}} >
            <Box  component="img" src="" width={20} height={20}/>
            <Typography component="h6">{auth?.userEmail}</Typography>
        </Box>

    )

}