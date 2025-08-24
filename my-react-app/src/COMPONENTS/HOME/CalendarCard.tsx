import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Box, Toolbar } from '@mui/material';

export default function CenteredCalendar() {
  return (
    <>
      <Toolbar />
      <Box
        sx={{
          borderRadius: 3,
          bgcolor: 'white',
          boxShadow: 1,
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
          />
        </LocalizationProvider>
      </Box>
    </>
  );
}
