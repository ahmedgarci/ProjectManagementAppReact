import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Divider, Typography } from '@mui/material';
import useFetch from '../../HOOKS/useFetch';
import type { UserUrgentTasksResponse } from '../../SERVICES/Tasks/Model';
import Loader from '../../COMPONENTS/Loading/Loading';

export default function UserTasksTable() {
   const {data:Tasks,error,loading} =  useFetch<UserUrgentTasksResponse[]>("/tasks/urgent");

   if(loading){
    return <Loader />
   }

   
   return (
    <>
    {(Tasks && Tasks.length > 0 )?
    <>
      <Divider sx={{mt:3, pb:2 , mx:2,color:"#1a237e"}} textAlign='left' >My Urgent Tasks</Divider>
        <TableContainer component={Paper} sx={{ml:2}}>
          <Table sx={{ minWidth: 450, pl:10 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Task Name</TableCell>
                <TableCell align="center">Task Starting</TableCell>
                <TableCell align="center">Task Ending</TableCell>
              </TableRow>
            </TableHead>
          <TableBody>
            {Tasks?.map((task,index) => (
              <TableRow key={index}>
                <TableCell align="center">{task.task}</TableCell>
                 <TableCell align="center">{task.startingDate.toString()}</TableCell>
                <TableCell align="center">{task.endingDate.toString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  </>
  :
  <Typography sx={{mt:5, pb:2 , mx:2,color:"#1a237e"}}>you have no urgent tasks</Typography>
            }
  </>
  );
}
