import Box from '@mui/material/Box';
import {Toolbar, Typography  } from '@mui/material';
import type { StatsCardProps } from '../../SERVICES/Home/domain';



export default function StatCard({text,stat}:StatsCardProps) {

      return (
        <Box sx={{ flexGrow: 1  , pl:2 , height:'100%' , width:'100%'}}>
            <Toolbar/>
            <Box sx={{ p: 2, display: "flex", flexDirection: "column", alignItems: "center"  , borderRadius:3 , bgcolor:"white", boxShadow:1  }}>
          <Typography variant="h6" sx={{fontWeight:600, fontSize:20,color:"#1a237e"}} >
            {text}
        </Typography>
        <Typography variant="h5" sx={{fontSize:30}}  gutterBottom>
            {stat}
        </Typography>   
    </Box>
    </Box>
  );
}
