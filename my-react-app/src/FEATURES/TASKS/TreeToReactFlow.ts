import type { TaskNode } from "../../SERVICES/Tasks/Model";
import type { Node, Edge } from "@xyflow/react";


export default function TransformTreeToReactFlow(tree:TaskNode):{edges:Edge[],nodes:Node[]}{
    const nodes:Node[] = [];
    const edges:Edge[] = [];

    function Traverse(task:TaskNode,parentId:string|null = null, depth=0, index=0){
        const  nodeId:string = task.taskId;
        nodes.push({
            id:nodeId,
            data:{
                label:`${task.task}`
            },
            position:{
                x:index*200,
                y:depth*150
            }
        })

        if(parentId){
            edges.push({
                type:"default",
                id: `${parentId}-${nodeId}`,
                source:parentId,
                target:nodeId,
            })
        }
        if(task.children && task.children.length > 0){
            task.children.forEach((child,index) =>  Traverse(child,nodeId,depth+1,index));
        }
    }


    Traverse(tree)


    return {nodes,edges};
}


