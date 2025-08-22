import { Avatar, Box, Typography } from "@mui/material";
import { useAuthStore } from "../STORE/Auth";
import { orange } from "@mui/material/colors";


export default function SidebarUserProfile (){
    const {auth} = useAuthStore.getState()
    return(
        <Box sx={{display:"flex", justifyContent:"center", alignItems:"center" , mt:5,gap:1}} >
            <Avatar sx={{ bgcolor: orange[500] }}>{auth?.username.charAt(0)}</Avatar>      
            <Typography component="h6">{auth?.username}</Typography>
        </Box>

    )

}