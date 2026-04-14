import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Divider, Typography, Box } from '@mui/material';
import useFetch from '../../HOOKS/useFetch';
import type { UserUrgentTasksResponse } from '../../SERVICES/Tasks/Model';
import Loader from '../../COMPONENTS/Loading/Loading';

export default function UserTasksTable() {

  const {data:tasks,error,loading} =  useFetch<UserUrgentTasksResponse[]>("/tasks/urgent");
 
  if (loading) {
    return <Loader />;
  }

  if (!tasks || tasks.length === 0) {
    return (
      <Typography sx={{ mt: 4, textAlign: "center", color: "#1a237e" }}>
        You have no urgent tasks 🎉
      </Typography>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>

      <Divider sx={{ mt: 2, mb: 2, color: "#1a237e" }} textAlign="left">
        My Urgent Tasks
      </Divider>

      <TableContainer component={Paper} sx={{ width: "100%" }}>

        <Table sx={{ minWidth: 300 }}>

          <TableHead>
            <TableRow>
              <TableCell align="center">Task Name</TableCell>
              <TableCell align="center">Starting Date</TableCell>
              <TableCell align="center">Ending Date</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tasks.map((task, index) => (
              <TableRow key={index} hover>

                <TableCell align="center">
                  {task.task}
                </TableCell>

                <TableCell align="center">
                  {new Date(task.startingDate).toLocaleDateString()}
                </TableCell>

                <TableCell align="center">
                  {new Date(task.endingDate).toLocaleDateString()}
                </TableCell>

              </TableRow>
            ))}
          </TableBody>

        </Table>

      </TableContainer>
    </Box>
  );
}