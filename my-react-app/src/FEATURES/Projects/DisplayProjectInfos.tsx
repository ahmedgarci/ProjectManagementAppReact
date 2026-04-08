import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
  Skeleton,
} from '@mui/material';
import { VisibilityOutlined } from '@mui/icons-material';
import useFetch from '../../HOOKS/useFetch';
import type { StateProps } from '../TASKS/TaskForm/Shared/StateProps';
import type { ProjectDetailsResponse } from '../../SERVICES/Projects/ProjectDomain';

type ProjectInfoProps = {
  state: StateProps;
  projectId: string;
};

export default function DisplayProjectInfoModal({ state, projectId }: ProjectInfoProps) {
  const handleOpen = () => state.setState(true);
  const handleClose = () => state.setState(false);

  const { data: projectDetails, loading, error } = useFetch<ProjectDetailsResponse>(
    `/project/${projectId}`
  );

  return (
    <div>
      <IconButton
        size="small"
        onClick={handleOpen}
        sx={{
          '&:hover': { color: '#1976d2', backgroundColor: 'rgba(25, 118, 210, 0.08)' },
          transition: '0.2s',
        }}
      >
        <VisibilityOutlined fontSize="small" />
      </IconButton>

      <Dialog open={state.state} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 600 }}>Project Info</DialogTitle>

        <DialogContent sx={{ py: 2 }}>
          {loading && (
            <Stack spacing={1}>
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="rectangular" height={60} />
              <Skeleton variant="text" width="40%" />
              <Skeleton variant="text" width="40%" />
            </Stack>
          )}

          {error && (
            <Typography color="error" variant="body2">
              Failed to load project details.
            </Typography>
          )}

          {projectDetails && (
            <Stack spacing={2}>
              <TextField
                label="Project Name"
                fullWidth
                variant="outlined"
                value={projectDetails.projectName || ''}
                InputProps={{ readOnly: true }}
              />

              <TextField
                label="Project Description"
                fullWidth
                multiline
                minRows={3}
                variant="outlined"
                value={projectDetails.description || ''}
                InputProps={{ readOnly: true }}
              />

              <Stack direction="row" spacing={2}>
                <TextField
                  label="Start Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={projectDetails.startedAt?.split('T')[0] || ''}
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  label="End Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={projectDetails.endsAt?.split('T')[0] || ''}
                  InputProps={{ readOnly: true }}
                />
              </Stack>
            </Stack>
          )}
        </DialogContent>

        <DialogActions sx={{ pr: 3, pb: 2 }}>
          <Button onClick={handleClose} variant="contained" color="error">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}