import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Box, Typography } from '@mui/material';
import { useTaskContext } from '../../../HOOKS/Tasks/TaskContext';


export default function TaskDatePicker({taskDateState}:{taskDateState:string}) {
  const [taskDate, setTaskDate] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
  const {setState} = useTaskContext();

  const handleDateChange = (newDate: Dayjs|null) => {
    if(!newDate){return;}
    setTaskDate(newDate)
    const formattedDate:Date = newDate.toDate();
    taskDateState=="starting" ? setState(prev=> ({...prev,taskStartingDate:formattedDate})) : setState(prev=> ({...prev,taskEndingDate:formattedDate})) 
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body1" gutterBottom>
          Task {taskDateState} Date
        </Typography>
        <DesktopDatePicker
          value={taskDate}
          onChange={handleDateChange}
          slotProps={{ textField: { fullWidth: true } }}

        />
      </Box>
    </LocalizationProvider>
  );
}
