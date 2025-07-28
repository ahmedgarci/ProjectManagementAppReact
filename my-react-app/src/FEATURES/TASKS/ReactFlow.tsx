import { useCallback, useEffect, useState } from 'react';
import {ReactFlow,Controls,Background,applyEdgeChanges,applyNodeChanges,addEdge, type Node, type Edge} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import useFetch from '../../HOOKS/useFetch';
import TransformTreeToReactFlow from './TreeToReactFlow';
import type { TaskNode } from '../../SERVICES/Tasks/Model';
import TaskDetailsForm from './TaskForm/TaskDetailsForm';
import { useTaskContext } from '../../HOOKS/Tasks/TaskContext';

export default function Flow() {
    const { data: tree, error, loading } = useFetch<TaskNode>("/tasks/c1c13d10-8e7a-4162-90df-ea1e63408200");  
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
      console.log(changes);
      setEdges((eds) => applyEdgeChanges(changes, eds));
    }, []);
  
    const onConnect = useCallback((params) => {
      
      setEdges((eds) => addEdge(params, eds));
    }, []);
  
    const addNode = ()=>{      
      setAddNodeModal(true)
      console.log(Task);
      if(!Task){
        return;
      }
      const newNode = {
        id: String(Math.random()),
          position: { x: 150, y: 800 },
          data: { label: `${Task.task}` },
        }
      setNodes((prev) => [...prev, newNode])
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
              <TaskDetailsForm state={addNodeModal} setState={setAddNodeModal} onSubmit={addNode}/>

      <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
        <ReactFlow
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
      </div>
      </>

    );
  }
