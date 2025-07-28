import Grid from '@mui/material/Grid';
import ProjectsCard from '../COMPONENTS/HOME/ProjectsCard';
import CalendarCard from '../COMPONENTS/HOME/CalendarCard';
import UserTasksTable from '../FEATURES/HOME/UserTaksTable';
import NotificationsPanel from '../COMPONENTS/HOME/NotificationsCard';
import { Box } from '@mui/material';


export default function HomePage() {
  return (
    <Box sx={{bgcolor:"#f5f5f5" , minHeight:'100vh'}}>
    <Grid container spacing={1}>
    <Grid size={6}>
        <Box>
          <Box sx={{width:"100%", height:'100%' , display:"flex" , gap:3}}>
            <Grid  size={6}>
              <ProjectsCard />
            </Grid>
            <Grid  size={6}>
              <ProjectsCard />
            </Grid>
          </Box>
          <UserTasksTable />
        </Box>
    </Grid>
    <Grid  size={5} sx={{mx:'auto'}}>
      <Box>
        <CalendarCard />
        <NotificationsPanel />
      </Box>
      </Grid>

  </Grid>
  </Box>

  );
}
