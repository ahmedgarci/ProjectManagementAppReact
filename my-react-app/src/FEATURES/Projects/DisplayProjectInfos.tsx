import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    Typography,
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
        <IconButton size="small" onClick={handleOpen}>
          <VisibilityOutlined fontSize="small" />
        </IconButton>
  
        <Dialog open={state.state} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle sx={{ fontWeight: 500 }}>Project Info</DialogTitle>
  
          <DialogContent sx={{ py: 2 }}>
            {loading && <Typography>Loading...</Typography>}
            {error && <Typography color="error">Failed to load project details.</Typography>}
  
            {projectDetails && (
              <>
                <TextField
                  label="Project Name"
                  fullWidth
                  variant="outlined"
                  sx={{ mb: 1 }}
                  value={projectDetails.projectName || ''}
                  InputProps={{ readOnly: true }}
                />
  
                <TextField
                  label="Project Description"
                  fullWidth
                  variant="outlined"
                  multiline
                  minRows={3}
                  sx={{ mb: 2 }}
                  value={projectDetails.description || ''}
                  InputProps={{ readOnly: true }}
                />
  
                <TextField
                  label="Start Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 2 }}
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
              </>
            )}
          </DialogContent>
  
          <DialogActions sx={{ pr: 3, pb: 2 }}>
            <Button onClick={handleClose} variant='contained' color="error">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  