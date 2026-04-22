import { Box, Typography, Stack, IconButton, Tooltip } from '@mui/material';
import { Handle, NodeResizer, Position } from '@xyflow/react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import TaskStage from './TaskStage';

const CustomNode = ({ data, selected }: any) => {
  return (
    <>
      <NodeResizer
        isVisible={selected}
        minWidth={200}
        minHeight={120}
      
      />

      <Box
        p={1.5}
        sx={{
          border: '1px solid #ccc',
          borderRadius: 2,
          backgroundColor: '#fdfdfd',
          boxShadow: 2,
          transition: 'all 0.2s ease-in-out',
          ':hover': { borderColor: 'black', boxShadow: 4 },
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
        }}
      >
        <Handle type="target" position={Position.Top} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            sx={{ flex: 1, pr: 1 }}
            noWrap
          >
            {data.task}
          </Typography>

          <TaskStage selectedElement={data.stage} onChange={() => {}} />

          <Tooltip title="Delete Node">
            <IconButton size="small" onClick={data.onDelete} sx={{ ml: 0.5 }}>
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        <Stack spacing={0.2}>
          <Typography variant="body2" color="text.secondary" noWrap>
            Assigned to: <b>{data.username}</b>
          </Typography>

          <Typography variant="caption" color="text.secondary" noWrap>
            {data.start} → {data.end}
          </Typography>
        </Stack>

        <Handle type="source" position={Position.Bottom} />
      </Box>
    </>
  );
};

export default CustomNode;