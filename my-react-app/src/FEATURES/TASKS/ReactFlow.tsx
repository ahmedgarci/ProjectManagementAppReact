import {
  ReactFlow,
  Controls,
  Background,
  ReactFlowProvider,
  BackgroundVariant,
  MarkerType
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import TaskDetailsForm from './TaskForm/TaskDetailsForm';
import { Box, Divider, Paper, Stack, Typography } from '@mui/material';
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

  const {flowNodes,edges,loading,error,onNodesChange,isconnecting,onEdgesChange,onConnect,addNode,enhancedNodes,onSelectNode} = useFlowGraph(projectId);

  const [showModal, setShowModal] = useState<boolean>(false);

  if (loading) return <Loader />;
  if (error) return <Typography sx={{textAlign:"center"}}>Error loading tasks</Typography>;

  return (
    <>
      <Paper
  elevation={0}
  sx={{
    px: 3,
    py: 1.2,
    backgroundColor: 'transparent',
    boxShadow: 'none',
    border: 'none'
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
              onSubmit={(form: any) => addNode(form)}
            />
          </Box>

          <ContributorsHeader ProjectPublicId={projectId!} />
        </Stack>

        <Divider sx={{ my: 1 }} />
      </Paper>
      <Box
        sx={{
          height: 'calc(100vh - 80px)',
          width: '100%',
          overflow: 'hidden',
          background: '#f8fafc'
        }}
      >
        <ReactFlowProvider>
          <ReactFlow
            nodeTypes={CustomNodeType}
            nodes={enhancedNodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodesConnectable={!isconnecting}
            onNodeClick={(_, node) => {
              onSelectNode(node.id);
            }} 
            fitView
            panOnScroll
            selectionOnDrag
            zoomOnScroll
            zoomOnPinch
            panOnDrag
            deleteKeyCode={['Backspace', 'Delete']}
            multiSelectionKeyCode="Shift"
            defaultEdgeOptions={{
              type: 'bezier',
              style: {
                strokeWidth: 3,
                stroke: '#FF0072',
              },
              markerEnd: {
                type: MarkerType.ArrowClosed,
                width: 20,
                height: 20,
                color: '#FF0072'
              },
            }}
            style={{
              background: 'linear-gradient(to bottom right, #f8fafc, #f1f5f9)'
            }}
          >
            <Background
              variant={BackgroundVariant.Dots}
              gap={18}
              size={1}
              color="#cbd5e1"
            />

            <Controls />
          </ReactFlow>
        </ReactFlowProvider>
      </Box>
    </>
  );
}