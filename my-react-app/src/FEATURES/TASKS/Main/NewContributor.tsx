import { Box, Button, TextField } from "@mui/material";
import SendInvitationToNewContributor from "../../../SERVICES/Tasks/AddNewContributor";
import { useState } from "react";
import { toast } from "react-toastify";
import { Navigate, useParams } from "react-router-dom";

export default function AddNewContributor() {
    const [email,setEmail] = useState<string>("")
    const {projectId} = useParams();
    if(!projectId){
      return <Navigate to={"/projects"} />
    }
    async function handleSendingInv(e){
        e.preventDefault();
        try {
            await SendInvitationToNewContributor(email,projectId as string)
            toast.success("invitation sent successfully")
            setEmail("")
        } catch (error:any) {
          if(error.response.data.error){
            toast.error(error.response.data.error)
          }else{
            toast.error("user was not found")            
          }
        }
    }
  return (
    <Box
      component="form"
      onSubmit={handleSendingInv}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
        mt: 2,
      }}
    >
      <TextField
        label="Contributor Email"
        type="email"
        variant="outlined"
        required
        size="small"
        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)}
        sx={{ flex: 1 }}
      />
      <Button
        type="submit"
        variant="contained"
        color="error"
        sx={{ height: 40 }}
      >
        Send Invite
      </Button>
    </Box>
  );
}
