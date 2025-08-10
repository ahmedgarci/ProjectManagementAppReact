import { Api } from "../../HOOKS/AxiosApi";
import type { TaskNode } from "./Model";


export default async function DeleteTask(task:TaskNode) {
    try {
      const {data} = await  Api.delete("");
    } catch (error) {
        console.log(error);        
    }
    
} 