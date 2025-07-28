import { Typography, Box, Paper, Stack } from '@mui/material';

const StatItem = ({ label, value }: { label: string; value: number }) => (
  <Box sx={{ textAlign: 'center', minWidth: 100 }}>
    <Typography sx={{ fontSize: 16, color: 'text.secondary' }}>{label}</Typography>
    <Typography sx={{ fontSize: 22, fontWeight: 600, color: 'text.primary' }}>{value}</Typography>
  </Box>
);

export default function NotificationsPanel() {
  return (
    <Paper
      elevation={1}
      sx={{
        height: '100%',
        mt: 2,
        p: 3,
        borderRadius: 2,
        bgcolor: 'background.paper',
      }}
      component="section"
    >
      <Typography
        variant="h6"
        sx={{
          fontSize: 20,
          color: '#1a237e',
          fontWeight: 600,
          mb: 2,
          textAlign:'start'
        }}
      >
        Design Project
      </Typography>

      <Stack direction="row" spacing={4} justifyContent="start">
        <StatItem label="Completed" value={114} />
        <StatItem label="In Progress" value={87} />
        <StatItem label="Pending " value={32} />
      </Stack>
    </Paper>
  );
}
