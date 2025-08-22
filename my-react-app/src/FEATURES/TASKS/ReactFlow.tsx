import { useCallback, useEffect, useState } from 'react';
import {ReactFlow,Controls,Background,applyEdgeChanges,applyNodeChanges,addEdge, type Node, type Edge, type Connection, ReactFlowProvider} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import useFetch from '../../HOOKS/useFetch';
import TransformTreeToReactFlow from './TreeToReactFlow';
import type { TaskNode } from '../../SERVICES/Tasks/Model';
import TaskDetailsForm from './TaskForm/TaskDetailsForm';
import { useTaskContext } from '../../HOOKS/Tasks/TaskContext';
import addNewProjectTask from '../../SERVICES/Tasks/AddNewTask';
import AddEdge from '../../SERVICES/Tasks/AddEdgeBetweenTasks';
import ContributorsHeader from './Main/ContributorsHeader';
import { Box, Divider, Paper, Stack } from '@mui/material';
import CustomNode from './FlowCustomNode';
import { useNavigate, useParams } from 'react-router-dom';

const CustomNodeType = {
  custom:CustomNode
}

export default function Flow() {
    const {projectId} = useParams()
    const navigate = useNavigate();
    useEffect(()=>{
      if(!projectId || projectId==undefined){
        navigate("/dashboard/projects")
        return;
      }
    },[projectId])
    
    const { data: tree, error, loading } = useFetch<TaskNode[]>(projectId ? `/tasks/${projectId}` : null);    
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const [addNodeModal,setAddNodeModal] = useState<boolean>(false)
    const {state:Task} = useTaskContext()

    useEffect(() => {
      if (tree) {
        const { nodes: transformedNodes, edges: transformedEdges } = TransformTreeToReactFlow(tree);
        setNodes(transformedNodes);
        setEdges(transformedEdges);
      }
    }, [tree]);
 
    const onNodesChange = useCallback((changes) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
    }, []);

    const onEdgesChange = useCallback((changes) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
    }, []);
  
    const onConnect = useCallback((params:Connection) => {
      AddEdge(params.source,params.target)
      setEdges((eds) => addEdge(params, eds));
    }, []);
  
    const addNode = async()=>{      
      setAddNodeModal(true)
      if(!Task === undefined){
        return;
      }
      const newNode = {
        id: String(Math.random()),
          position: { x: 150, y: 800 },
          data: { label: `${Task.task}` },
        }
      setNodes((prev) => [...prev, newNode])
      try {
        await addNewProjectTask(Task,projectId as string)
      } catch (error) {
        console.log(error);
      }
    }

    // const onNodeClick = useCallback((event:any, node) => {
    //   const newLabel = prompt("Nouveau label pour ce nœud :", node.data.label);
    //   if (newLabel !== null && newLabel.trim() !== "") {
    //     setNodes((prevNodes) =>
    //       prevNodes.map((n) =>n.id === node.id ? { ...n, data: { ...n.data, label: newLabel } } : n));
    //   }
    // }, []);

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;
//     if (!tree) return <div>No data</div>;    
// //    console.log(useAuthStore().auth);
    return (
      <>

 <Paper
      elevation={0}
      sx={{
        px: 3,
        py: 2,
        borderColor: 'divider',
        backgroundColor: 'background.default',
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
        <ContributorsHeader ProjectPublicId="c1c13d10-8e7a-4162-90df-ea1e63408200" />
      </Stack>
      <Divider sx={{ my: 2 }} />     
    </Paper>     
      <div style={{ height: '100vh', width: '100%', position: 'relative'}}>
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
