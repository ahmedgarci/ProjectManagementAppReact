import * as React from 'react';
import { TextField } from '@mui/material';
import { useTaskContext } from '../../../HOOKS/Tasks/TaskContext';



export default function TaskLabelInput() {
  const {setState} = useTaskContext()
  
  const HandleTaskLabelChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setState(prev=>({...prev,task:e.target.value}))
  }

  return (
        <TextField
          label="Task Label"
          variant="outlined"
          type="text"
          onChange={HandleTaskLabelChange}
          required
          fullWidth
          sx={{
            mb: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            borderRadius: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />
      
  );
}
