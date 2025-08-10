import { Box, Button, TextField } from "@mui/material";
import SendInvitationToNewContributor from "../../../SERVICES/Tasks/AddNewContributor";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddNewContributor() {
    const [email,setEmail] = useState<string>("")

    async function handleSendingInv(e){
        e.preventDefault();
        console.log(email);
        try {
            await SendInvitationToNewContributor(email,"c1c13d10-8e7a-4162-90df-ea1e63408200")
            toast.success("invitation sent successfully")
            setEmail("")
        } catch (error) {
          console.log(error);
            toast.error("user was not found")
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
