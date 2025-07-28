import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
} from '@mui/material';
import {
  AddRounded,
  SearchRounded,
  VisibilityOutlined,
  EditOutlined,
  DeleteOutline,
} from '@mui/icons-material';

const mockProjects = [
  {
    id: 1,
    name: 'Website Redesign',
    deadline: '2025-07-15',
    completedTasks: 4,
    totalTasks: 10,
    status: 'In Progress',
  },
  {
    id: 2,
    name: 'Marketing Campaign',
    deadline: '2025-07-20',
    completedTasks: 10,
    totalTasks: 10,
    status: 'Completed',
  },
];

export default function ProjectsPage() {
  const [projects] = useState(mockProjects);
  const [search, setSearch] = useState('');
  const [openNew, setOpenNew] = useState(false);

  const filtered = projects.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const statusColor = (status) =>
    status === 'Completed' ? 'success' : status === 'In Progress' ? 'info' : 'default';

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="600">Projects</Typography>
        <Button
          variant="contained"
          startIcon={<AddRounded />}
          onClick={() => setOpenNew(true)}
          sx={{ borderRadius: 3, textTransform: 'none', bgcolor:"#f4511e", p:1 }}
        >
          New Project
        </Button>
      </Box>

      <TextField
        placeholder="Search projects..."
        fullWidth
        size="small"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRounded color="action" />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 4, borderRadius: 2 }}
      />

      <Grid container spacing={3}>
        {filtered.map((project) => {
          const progress = (project.completedTasks / project.totalTasks) * 100;

          return (
            <Grid item xs={12} sm={6} md={4} size={4} key={project.id}>
              <Card
                variant="outlined"
                sx={{
                  borderRadius: 3,
                  px: 2,
                  py: 2,
                  cursor:"pointer",
                  boxShadow:1,
                  transition: '0.2s',
                  '&:hover': { borderColor: '#dd2c00', boxShadow: 2 },
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="subtitle1" fontWeight="500">
                      {project.name}
                    </Typography>
                    <Chip
                      label={project.status}
                      color={statusColor(project.status)}
                      size="small"
                      sx={{ fontSize: '0.7rem', borderRadius: '6px' }}
                    />
                  </Box>

                  <Typography variant="caption" color="text.secondary">
                    Due: {project.deadline}
                  </Typography>

                  <Box mt={2}>
                    <LinearProgress
                      variant="determinate"
                      value={progress}
                      color='error'
                      sx={{ borderRadius: 10, height: 6, backgroundColor: '#ffe5e5',  }}
                    />
                    <Typography variant="caption" mt={1} display="block">
                      {project.completedTasks}/{project.totalTasks} tasks
                    </Typography>
                  </Box>
                </CardContent>

                <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
                  <IconButton size="small"><VisibilityOutlined fontSize="small" /></IconButton>
                  <IconButton size="small"><EditOutlined fontSize="small" /></IconButton>
                  <IconButton size="small"><DeleteOutline fontSize="small" /></IconButton>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* New Project Dialog */}
      <Dialog open={openNew} onClose={() => setOpenNew(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 500 }}>Create Project</DialogTitle>
        <DialogContent sx={{ py: 2 }}>
          <TextField label="Project Name" fullWidth variant="outlined" sx={{ my: 2 }} />
          <TextField
            label="Deadline"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions sx={{ pr: 3, pb: 2 }}>
          <Button onClick={() => setOpenNew(false)} color="inherit">Cancel</Button>
          <Button variant="contained">Create</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
