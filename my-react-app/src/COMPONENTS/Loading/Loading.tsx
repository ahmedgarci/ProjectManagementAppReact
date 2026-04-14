import { Box, CircularProgress } from '@mui/material';

export default function Loader() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center',justifyContent:"center",width:'100%', height:"100%"}}>
      <CircularProgress color='error' />
    </Box>
  );
}
