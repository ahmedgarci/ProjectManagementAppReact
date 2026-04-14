import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import UsersSelect from './UsersSelect';
import TaskLabelInput from './TaskLabelInput';
import DatePickers from './TaskDate';
import FormTitleLabel from './FormTitle';
import TaskSubmitBtn from './FormSubmitBtn';
import AddIcon from '@mui/icons-material/Add';
import type { TaskDetailsFormProps } from './Shared/FormProps';
import { useState } from 'react';
import { useTaskContext } from '../../../HOOKS/Tasks/TaskContext';
import Loader from '../../../COMPONENTS/Loading/Loading';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
};

export default function TaskDetailsForm({state,setState,onSubmit}: TaskDetailsFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [Loading,setLoading] = useState<boolean>(false);
  const { state: taskData } = useTaskContext();

  const handleOpen = () => setState(true);
  const handleClose = () => setState(false);

  const handleSubmit = async () => {
    try {
      setErrors({});
      setLoading(true);
  
      await onSubmit(taskData);
  
      handleClose();
    } catch (err: any) {
      console.log(err);
        setErrors(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        startIcon={<AddIcon />}
        sx={{
          backgroundColor: '#DC143C',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '8px',
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: '0 3px 5px rgba(0,0,0,0.3)',
          '&:hover': { backgroundColor: '#b71c1c' },
        }}
      >
        Add Task
      </Button>

      <Modal open={state} onClose={handleClose} >
        <Box sx={style} >
          <FormTitleLabel />
          <TaskLabelInput error={errors.task}/>
          <UsersSelect fieldError={errors.userPublicId} />
          <DatePickers taskDateState="starting" />
          <DatePickers taskDateState="ending" />

          {errors.general && (
            <Box sx={{ color: 'red', mb: 2 }}>
              {errors.general}
            </Box>
          )}
          {Loading ? <Loader/> : 
            <TaskSubmitBtn onSubmit={handleSubmit} />
          }
        </Box>
      </Modal>
    </div>
  );
}