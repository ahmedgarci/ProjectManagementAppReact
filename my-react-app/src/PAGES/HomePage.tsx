import CalendarCard from '../COMPONENTS/HOME/CalendarCard';
import { Box, Container } from '@mui/material';
import useFetch from '../HOOKS/useFetch';
import type { StatsResponse } from '../SERVICES/Home/domain';
import StatCard from '../COMPONENTS/HOME/ProjectsCard';
import UserTasksTable from '../FEATURES/HOME/UserTaksTable';

export default function HomePage() {
  const { data: stats } = useFetch<StatsResponse>("/project/stats");

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          width: "100%",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ flex: "1 1 250px" }}>
          <StatCard text='All Projects' stat={stats?.numberOfProjects ?? 0} />
        </Box>

        <Box sx={{ flex: "1 1 250px" }}>
          <StatCard text='Projects Completed' stat={stats?.numberOfProjectCompleted ?? 0} />
        </Box>

        <Box sx={{ flex: "1 1 250px" }}>
          <StatCard text='All Tasks' stat={stats?.allTasks ?? 0} />
        </Box>

        <Box sx={{ flex: "1 1 250px" }}>
          <StatCard text='Tasks Completed' stat={stats?.taksCompleted ?? 0} />
        </Box>
      </Box>
        
        <Box sx={{mt:"10px" ,display:"flex",flexWrap:"wrap",gap:"30px",width:'100%'}}>
          <Box sx={{ flex: "1 1 400px" }}>
            <UserTasksTable />
          </Box>
          <Box sx={{ flex: "1 1 400" }}>
            <CalendarCard />
          </Box>
        </Box>
          
       

    </Container>
  );
}