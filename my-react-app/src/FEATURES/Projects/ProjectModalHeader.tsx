import { AddRounded } from "@mui/icons-material"
import { Box, Button, Typography } from "@mui/material"
import CreateProjectModal from "../../COMPONENTS/HOME/CreateProjectForm"
import { useState } from "react"


export default function ProjectModalHeader(){
    const [open,setOpen] = useState<boolean>(false)
    return(
        <>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="600">Projects</Typography>
        <Button
          variant="contained"
          startIcon={<AddRounded />}
          onClick={() => setOpen(true)}
          sx={{ borderRadius: 3, textTransform: 'none', bgcolor:"#f4511e", p:1 }}
        >
          New Project
        </Button>
      </Box>
      <CreateProjectModal state={open} setState={setOpen} onSubmit={()=>console.log("object")}/>
      </>
    )
}