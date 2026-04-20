import { Box, Button, TextField } from "@mui/material";
import SendInvitationToNewContributor from "../../../SERVICES/Tasks/AddNewContributor";
import { useState } from "react";
import { toast } from "react-toastify";
import { Navigate, useParams } from "react-router-dom";
import Loader from "../../../COMPONENTS/Loading/Loading";

export default function AddNewContributor() {
    const [email,setEmail] = useState<string>("")
    const {projectId} = useParams();
    const [isLoading,setLoading] = useState<boolean>(false)
    if(!projectId){
      return <Navigate to={"/projects"} />
    }
    async function handleSendingInv(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        setLoading(true)
        try {
            await SendInvitationToNewContributor(email,projectId!);
            toast.success("invitation sent successfully")
            setEmail("")
        } catch (error:any) {
          if(error.status == 404){
            toast.error(error.error)
          }else{
            toast.error("network Error")            
          }
        }finally{
          setLoading(false);
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

    {
        isLoading ? <Loader /> :
        <>
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
      </>
      }
     
    </Box>
  );
}
