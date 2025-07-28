import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import UsersSelect from './UsersSelect';
import TaskLabelInput from './TaskLabelInput';
import DatePickers from './TaskDate';
import FormTitleLabel from './FormTitle';
import TaskSubmitBtn from './FormSubmitBtn';
import AddIcon from '@mui/icons-material/Add';
import type { StateProps } from './Shared/StateProps';
import type { TaskDetailsFormProps } from './Shared/FormProps';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
};




export default function TaskDetailsForm({state,setState,onSubmit}:TaskDetailsFormProps) {

  const handleOpen = () => setState(true);
  const handleClose = () => setState(false);

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        startIcon={<AddIcon />}
        sx={{
          backgroundColor: 'red',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '8px',
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: '0 3px 5px rgba(0,0,0,0.3)',
          '&:hover': {
            backgroundColor: '#b71c1c',
          },
          '&:focus': {
            outline: '2px solid white',
            outlineOffset: '2px',
          },
        }}
      >
        Add Task
      </Button>   
     <Modal
        open={state}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormTitleLabel />
          <TaskLabelInput />
          <UsersSelect />
          <DatePickers taskDateState='starting' />
          <DatePickers taskDateState='ending' />
          <TaskSubmitBtn onSubmit={onSubmit} />
        </Box>
      </Modal>
    </div>
  );
}
