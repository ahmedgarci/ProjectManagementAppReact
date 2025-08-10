import { Box, Typography, Chip } from '@mui/material';
import { Handle, Position } from '@xyflow/react';

const CustomNode = ({ data }: any) => {
    return (
    <Box
      p={1}
      sx={{
        border: '1px solid #ccc',
        borderRadius: 2,
        backgroundColor: '#fff',
        minWidth: 150,
        boxShadow: 1,
        ":hover":{borderColor:"black"}
      }}
    >
      <Handle type="target" position={Position.Top} />
      <Typography variant="subtitle2">{data.task}</Typography>
      <Chip
        label={data.stage}
        color={
          data.stage === 'Completed'
            ? 'success'
            : data.stage === 'inProgress'
            ? 'info'
            : 'error'
        }
        size="small"
        sx={{ mt: 1 }}
      />
      
      <Handle type="source" position={Position.Bottom} />
    </Box>
  );
};

export default CustomNode;
