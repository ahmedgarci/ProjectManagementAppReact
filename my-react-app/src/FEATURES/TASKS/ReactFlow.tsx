import {ReactFlow,Controls,Background,ReactFlowProvider} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import TaskDetailsForm from './TaskForm/TaskDetailsForm';
import { Box, Divider, Paper, Stack } from '@mui/material';
import CustomNode from './FlowCustomNode';
import { Navigate, useParams } from 'react-router-dom';
import Loader from '../../COMPONENTS/Loading/Loading';
import ContributorsHeader from './Main/ContributorsHeader';
import useFlowGraph from '../../HOOKS/Tasks/useFlowGraph';
import { useState } from 'react';

const CustomNodeType = {
  custom: CustomNode
};

export default function Flow() {
  const { projectId } = useParams();
  if (!projectId) {
    return <Navigate to="/dashboard/projects" replace />;
  }

  const {flowNodes,edges,loading,error,onNodesChange,isconnecting,onEdgesChange,onConnect,addNode} = useFlowGraph(projectId);
  const [showModal,setShowModal] = useState<boolean>(false);


  if (loading) return <Loader />
  if (error) return <div>Error loading tasks</div>;
  return (
    <>
      <Paper
        elevation={0}
        sx={{
          px: 3,
          py: 2,
          borderColor: 'divider',
          backgroundColor: 'background.default'
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
          flexWrap="wrap"
        >
          <Box>
            <TaskDetailsForm
              state={showModal}
              setState={setShowModal}
              onSubmit={(form:any)=>addNode(form)}
            />
          </Box>
          <ContributorsHeader ProjectPublicId={projectId!} />
        </Stack>
        <Divider sx={{ my: 2 }} />
      </Paper>

      <div style={{ height: '100vh', width: '100%' }}>
        <ReactFlowProvider>
          <ReactFlow
            nodeTypes={CustomNodeType}
            nodes={flowNodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodesConnectable={!isconnecting}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    </>
  );
}