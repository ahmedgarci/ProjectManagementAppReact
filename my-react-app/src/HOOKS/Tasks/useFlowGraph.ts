import { useCallback, useEffect, useState } from "react";
import type { TaskNode } from "../../SERVICES/Tasks/Model";
import useFetch from "../useFetch";

import {
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  type Connection,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
} from "@xyflow/react";

import TransformTreeToReactFlow from "../../FEATURES/TASKS/TreeToReactFlow";
import DeleteTask from "../../SERVICES/Tasks/DeleteNode";
import AddEdge from "../../SERVICES/Tasks/AddEdgeBetweenTasks";
import { toast } from "react-toastify";
import addNewProjectTask from "../../SERVICES/Tasks/AddNewTask";

function useFlowGraph(projectId: string) {
  const [flowNodes, setFlowNodes] = useState<Node[]>([]);
  const [edges, setFlowEdges] = useState<Edge[]>([]);
  const [isconnecting,setIsConnecting] = useState<boolean>(false)

  const { data: tree, error, loading } = useFetch<TaskNode[]>(`/tasks/${projectId}`);

  const deleteNode = useCallback(async (taskId: string) => {
    try {
      await DeleteTask(taskId);
      setFlowNodes((prev) =>prev.filter((node) => node.id !== taskId));
      setFlowEdges((prev) =>prev.filter((edge) => edge.source !== taskId && edge.target !== taskId));
    } catch {
      toast.error("Error deleting node");
    }
  }, []);

  useEffect(() => {
    if (!tree) return;

    const { nodes, edges } =TransformTreeToReactFlow(tree, deleteNode);
    setFlowNodes(nodes);
    setFlowEdges(edges);
  }, [tree]);


  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setFlowNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setFlowEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  const onConnect = useCallback(async (params: Connection) => {
    if (!params.source || !params.target) return;
    setIsConnecting(true)
    const isCycleDetected = await AddEdge(params.source,params.target);

    if (isCycleDetected) {
      toast.error("Cycle detected");
      return;
    }

    setFlowEdges((eds) => addEdge(params, eds));
    setIsConnecting(false)
  }, [isconnecting]);


    const addNode = async (form:any) => {
    const tempId = crypto.randomUUID();
    const optimisticNode: Node = {
      id: tempId,
      type: 'custom',
      position: {
        x: Math.random() * 200 + 100,
        y: Math.random() * 200 + 100,
      },
      data: {
        task: form.task,
        stage: "Not Started",
        start: form.taskStartingDate,
        end: form.taskEndingDate,
        username: "loading...",
        onDelete: () => deleteNode(tempId),
      }
    }

    setFlowNodes(prev => [...prev, optimisticNode]);


    try {
      const result: TaskNode = await addNewProjectTask({ task: form.task,userId: form.userPublicId,taskStartingDate:
         form.start,taskEndingDate: form.end,parentTaskId: undefined,}, projectId);
      setFlowNodes(prev =>
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
      setFlowNodes(prev => prev.filter(n => n.id !== tempId));
      console.log(error);
      toast.error("Failed to create task");
    }
  };

  


  return {
    flowNodes,
    edges,
    loading,
    error,
    onNodesChange,
    onEdgesChange,
    onConnect,
    deleteNode,
    addNode,
    isconnecting
  };
}

export default useFlowGraph;