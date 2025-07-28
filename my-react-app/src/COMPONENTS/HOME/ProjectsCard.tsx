import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import {Toolbar, Typography , Button } from '@mui/material';


export default function ProjectsCard() {


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
        <Button
          variant="contained"
          fullWidth
          size='small'
          sx={{
            background: '#f4511e',
            color: '#fff',
            py: 1,
            borderRadius: 3,
          }}
        >Add New Project
            </Button>
   
    </Box>
    </Box>
  );
}
