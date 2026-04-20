import { TextField } from '@mui/material';

export default function TaskLabelInput({value,error,onChange}:{value:string,error:string,onChange:(value:string)=>void}) {
  
  return (
        <TextField
          label="Task Label"
          variant="outlined"
          value={value}
          error={!!error}
          helperText={error}
          type="text"
          onChange={(e)=>onChange(e.target.value)}
          required
          fullWidth
          sx={{
            mb: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            borderRadius: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />
      
  );
}
