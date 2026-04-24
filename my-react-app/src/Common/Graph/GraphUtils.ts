import type { Edge } from "@xyflow/react";


export function getDownStreamNodes(nodeId:string,edges:Edge[]):string[]{
    const visited = new Set<string>();
    function dfs(current:string) {
        edges.forEach(edge => {
            if(edge.source == current  && !visited.has(edge.target)){
                visited.add(edge.target);
                dfs(edge.target);
            }
        });
    }
    dfs(nodeId);
    return Array.from(visited);
}

export function getUpStreamNodes(nodeId:string,edges:Edge[]):string[]{
    const visited = new Set<string>();

    function dfs(current:string){
        edges.forEach(edge =>{
            if(edge.target == current && !visited.has(edge.source)){
                visited.add(edge.source);
                dfs(edge.source);
            }
        })
    }
    dfs(nodeId)
    return Array.from(visited);
}

