import * as React from 'react';
import Box from '@mui/material/Box';
import {Button, Toolbar, Typography  } from '@mui/material';
import CreateProjectModal from './CreateProjectForm';


export default function ProjectsCard() {
      const [open,setOpen] = React.useState<boolean>(false)

      return (
        <Box sx={{ flexGrow: 1  , pl:2 , height:'100%' , width:'100%'}}>
            <Toolbar/>
            <Box sx={{ p: 2, display: "flex", flexDirection: "column", alignItems: "flex-start"  , borderRadius:3 , bgcolor:"white", boxShadow:1  }}>
          <Typography variant="h6" sx={{fontWeight:600, fontSize:20,color:"#1a237e"}} >
            Total Projects
        </Typography>
        <Typography variant="h5" sx={{fontSize:30}}  gutterBottom>
            184
        </Typography>
          <Button sx={{color:"white" ,borderRadius: 3, textTransform: 'none', bgcolor:"#f4511e", p:1,px:2}} onClick={()=>setOpen(true)}>Create new Project</Button>
          <CreateProjectModal state={open} setState={setOpen} onSubmit={()=>console.log("object")}/>
   
    </Box>
    </Box>
  );
}
