import Grid from '@mui/material/Grid';
import CalendarCard from '../COMPONENTS/HOME/CalendarCard';
import { Box } from '@mui/material';
import useFetch from '../HOOKS/useFetch';
import type { StatsResponse } from '../SERVICES/Home/domain';
import StatCard from '../COMPONENTS/HOME/ProjectsCard';
import UserTasksTable from '../FEATURES/HOME/UserTaksTable';

export default function HomePage() {
  const { data: stats, error, loading } = useFetch<StatsResponse>("/project/stats");

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: '100vh', p: 2 }}>
      <Grid container spacing={2} >
        <Grid  size={12} mx={1}>
          <Grid container spacing={2}>
            <Grid  size={3}>
              <StatCard text='All Projects' stat={stats?.numberOfProjects ?? 0} />
            </Grid>
            <Grid  size={3}>
              <StatCard text='Projects Completed' stat={stats?.numberOfProjectCompleted ?? 0} />
            </Grid>
            <Grid  size={3}>
              <StatCard text='All Tasks' stat={stats?.allTasks ?? 0} />
            </Grid>
            <Grid  size={3}>
              <StatCard text='Tasks Completed' stat={stats?.taksCompleted ?? 0} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid  size={12}>
          <Grid container spacing={5}>
            <Grid  size={6}>
            <UserTasksTable />
            </Grid>
            <Grid  size={6}>
            <CalendarCard/>

            </Grid>
          
        </Grid>
      </Grid>
    </Grid>
    </Box>
  );
}
