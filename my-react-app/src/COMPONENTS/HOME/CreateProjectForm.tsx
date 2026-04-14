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
import { toast } from 'react-toastify';

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
  const [errors,setErrors] = useState<Record<string,string>>({})
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
      toast.success("project was created successfully")
    } catch (error:any) {
      setErrors(error)
    }
  };

  return (
    <Dialog open={state} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 500 }}>Create Project</DialogTitle>

      <DialogContent sx={{ py: 2 }}>
        <TextField
          label="Project Name"
          error={!!errors.name}
          helperText={errors.name}
          fullWidth
          variant="outlined"
          value={project.projectNameVo}
          onChange={handleChange('projectNameVo')}
          sx={{ mb: 1 }}
        />

        <TextField
          label="Project Description"
          fullWidth
          error={!!errors.description}
          helperText={errors.description}
          variant="outlined"
          value={project.projectDescriptionVo}
          onChange={handleChange('projectDescriptionVo')}
          multiline
          minRows={3}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Start Date"
          error={!!errors.startingDate}
          helperText={errors.startingDate}
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
          error={!!errors.endingDate}
          helperText={errors.endingDate}
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
          sx={{bgcolor:"#DC143C",color:"white"}}
          variant="contained"
          onClick={handleCreate}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
