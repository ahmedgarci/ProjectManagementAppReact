import { Api } from "../../HOOKS/AxiosApi";


export default async function DeleteTask(TaskId:string) {
    try {
      console.log(TaskId);
      const response = await Api.delete(`/tasks`, {
        params: { taskId: TaskId }
      });
    } catch (error) {
        console.log(error);        
    }
    
} 