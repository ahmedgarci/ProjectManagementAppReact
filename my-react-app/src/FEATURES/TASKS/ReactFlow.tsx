import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  ReactFlowProvider,
  type Node,
  type Edge,
  type Connection,
  type NodeChange,
  type EdgeChange
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import useFetch from '../../HOOKS/useFetch';
import TransformTreeToReactFlow from './TreeToReactFlow';
import type { TaskNode } from '../../SERVICES/Tasks/Model';

import TaskDetailsForm from './TaskForm/TaskDetailsForm';
import { useTaskContext } from '../../HOOKS/Tasks/TaskContext';

import addNewProjectTask from '../../SERVICES/Tasks/AddNewTask';
import AddEdge from '../../SERVICES/Tasks/AddEdgeBetweenTasks';
import DeleteTask from '../../SERVICES/Tasks/DeleteNode';

import { Box, Divider, Paper, Stack } from '@mui/material';
import CustomNode from './FlowCustomNode';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../COMPONENTS/Loading/Loading';
import ContributorsHeader from './Main/ContributorsHeader';

const CustomNodeType = {
  custom: CustomNode
};

export default function Flow() {
  const { projectId } = useParams();
  const navigate = useNavigate();

useEffect(() => {
  if (!projectId) {
    navigate("/dashboard/projects");
  }
}, [projectId, navigate]);
  const initializedRef = useRef(false);

  const { data: tree, error, loading } = useFetch<TaskNode[]>(
    projectId ? `/tasks/${projectId}` : null
  );

  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [addNodeModal, setAddNodeModal] = useState(false);

  const { state: Task } = useTaskContext();

  const deleteNode = useCallback(async (taskId: string) => {
    try {
      await DeleteTask(taskId);
      setNodes(prev => prev.filter(node => node.id !== taskId));
      setEdges(prev =>prev.filter(edge => edge.source !== taskId && edge.target !== taskId));
      
    } catch (error) {
      toast.error("Error deleting node");
    }
  }, []);

  useEffect(() => {
    if (tree && !initializedRef.current) {
      const { nodes: transformedNodes, edges: transformedEdges } =
        TransformTreeToReactFlow(tree, deleteNode);

      setNodes(transformedNodes);
      setEdges(transformedEdges);

      initializedRef.current = true;
    }
  }, [tree, deleteNode]);

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes(nds => applyNodeChanges(changes, nds));
  }, []);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges(eds => applyEdgeChanges(changes, eds));
  }, []);

  const onConnect = useCallback(async (params: Connection) => {
    if (params.source && params.target) {
      const isCycleDetected = await AddEdge(params.source, params.target);

      if (isCycleDetected) {
        toast.error("Cycle detected");
        return;
      }

      setEdges(eds => addEdge(params, eds));
    }
  }, []);
  const addNode = async () => {
    const tempId = crypto.randomUUID();

    const optimisticNode: Node = {
      id: tempId,
      type: 'custom',
      position: {
        x: Math.random() * 200 + 100,
        y: Math.random() * 200 + 100,
      },
      data: {
        task: Task.task,
        stage: "Not Started",
        start: Task.taskStartingDate?.toISOString(),
        end: Task.taskEndingDate?.toISOString(),
        username: "loading...",
        onDelete: () => deleteNode(tempId),
      }
    };

    setNodes(prev => [...prev, optimisticNode]);

    try {
      const result: TaskNode = await addNewProjectTask(Task, projectId as string);
      setNodes(prev =>
        prev.map(node =>
          node.id === tempId
            ? {
                id: result.taskId,
                type: 'custom',
                position: node.position,
                data: {
                  task: result.task,
                  stage: result.stage ?? "Not Started",
                  start: result.taskStartingDate,
                  end: result.taskEndingDate,
                  username: result.assignedToUserName,
                  onDelete: () => deleteNode(result.taskId),
                }
              }
            : node
        )
      );

    } catch (error) {
      setNodes(prev => prev.filter(n => n.id !== tempId));
      toast.error("Failed to create task");
    }
  };

  if (loading) return <Loader />
  if (error) return <div>Error: {error}</div>;

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
              state={addNodeModal}
              setState={setAddNodeModal}
              onSubmit={addNode}
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
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
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