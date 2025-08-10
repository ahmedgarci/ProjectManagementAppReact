import { Avatar, Box, Typography } from "@mui/material";
import { useAuthStore } from "../STORE/Auth";
import { orange } from "@mui/material/colors";


export default function SidebarUserProfile (){
    const {auth} = useAuthStore.getState()
    console.log(auth);
    return(
        <Box sx={{display:"flex", justifyContent:"center", alignItems:"center" , mt:5}} >
            <Avatar sx={{ bgcolor: orange[500] }}>{auth?.userEmail.charAt(0)}</Avatar>      
            <Typography component="h6">{auth?.userEmail}</Typography>
        </Box>

    )

}