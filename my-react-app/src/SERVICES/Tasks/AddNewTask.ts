import { Api } from "../../HOOKS/AxiosApi";
import type { CreateTaskRequest, TaskNode } from "./Model";


export default async function addNewProjectTask(req:CreateTaskRequest,projectId:string):Promise<TaskNode>{
    console.log(req);
 const newReq = {
    taskVo:{task:req.task},
    projectPublicIdVo:{projectPublicId:projectId},
    userIdVo:{userPublicId:req.userId},
    taskDateVo:{startingDate:req.taskStartingDate,endingDate:req.taskEndingDate},
    parentTaskPublicIdVo:{parentTaskPublicId:req.parentTaskId}
    }     
    try {
       const response = await Api.post("/tasks/create",newReq)
       return response.data;
    } catch (error:any) {
        throw error.response.data
    }

}
