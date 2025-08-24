import { Box, Typography, Chip, Stack } from '@mui/material';
import { Handle, Position } from '@xyflow/react';
import getStageColor from '../../COMPONENTS/common/GetStageColor';

const CustomNode = ({ data }: any) => {
  return (
    <Box
      p={1.5}
      sx={{
        border: '1px solid #ccc',
        borderRadius: 2,
        backgroundColor: '#fff',
        minWidth: 280,
        height: 80,
        boxShadow: 1,
        transition: 'border-color 0.2s ease-in-out',
        ':hover': { borderColor: 'black', boxShadow: 3 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Handle type="target" position={Position.Top} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle2" fontWeight="bold" sx={{ flex: 1, pr: 1 }} noWrap>
          {data.task}
        </Typography>

        <Chip
          label={data.stage}
          color={getStageColor(data.stage)}
          size="small"
          sx={{ width: 'fit-content', flexShrink: 0 }}
        />
      </Box>

      <Stack spacing={0.2}>
        <Typography variant="body2" color="text.secondary" noWrap>
          Assigned to: {data.assignedTo}
        </Typography>

        <Typography variant="caption" color="text.secondary" noWrap>
          {data.start} → {data.end}
        </Typography>
      </Stack>

      <Handle type="source" position={Position.Bottom} />
    </Box>
  );
};

export default CustomNode;
