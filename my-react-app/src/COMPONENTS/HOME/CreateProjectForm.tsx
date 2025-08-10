import { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from '@mui/material';
import type { TaskDetailsFormProps } from '../../FEATURES/TASKS/TaskForm/Shared/FormProps';
import type { CreateProjectRequest } from '../../SERVICES/Projects/ProjectDomain';
import CreateProject from '../../SERVICES/Projects/CreateProject';

const formatDateInput = (date?: Date) => {
  if (!date) return '';
  return date.toISOString().split('T')[0];
};

const parseDateInput = (value: string): Date => new Date(value);

export default function CreateProjectModal({ state, setState }: TaskDetailsFormProps) {
  const [project, setProject] = useState<CreateProjectRequest>({
    projectNameVo: '',
    projectDescriptionVo: '',
    startingDateVo: undefined,
    endingDate: undefined,
  });

  const handleChange = (field: keyof CreateProjectRequest) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      setProject((prev) => ({
        ...prev,
        [field]: field === 'startingDateVo' || field === 'endingDate'
          ? parseDateInput(value)
          : value,
      }));
    };

  const handleClose = () => setState(false);

  const handleCreate = async() => {
    try {
      await CreateProject(project)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={state} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 500 }}>Create Project</DialogTitle>

      <DialogContent sx={{ py: 2 }}>
        <TextField
          label="Project Name"
          fullWidth
          variant="outlined"
          value={project.projectNameVo}
          onChange={handleChange('projectNameVo')}
          sx={{ mb: 1 }}
        />

        <TextField
          label="Project Description"
          fullWidth
          variant="outlined"
          value={project.projectDescriptionVo}
          onChange={handleChange('projectDescriptionVo')}
          multiline
          minRows={3}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Start Date"
          type="date"
          fullWidth
          value={formatDateInput(project.startingDateVo)}
          onChange={handleChange('startingDateVo')}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2 }}
        />

        <TextField
          label="End Date"
          type="date"
          fullWidth
          value={formatDateInput(project.endingDate)}
          onChange={handleChange('endingDate')}
          InputLabelProps={{ shrink: true }}
        />
      </DialogContent>

      <DialogActions sx={{ pr: 3, pb: 2 }}>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button
          sx={{bgcolor:"red",color:"white"}}
          variant="contained"
          onClick={handleCreate}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
