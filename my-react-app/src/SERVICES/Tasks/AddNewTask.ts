import { Api } from "../../HOOKS/AxiosApi";
import type { CreateTaskRequest } from "./Model";


export default async function addNewProjectTask(req:CreateTaskRequest,projectId:string){
 const newReq = {
    taskVo:{task:req.task},
    projectPublicIdVo:{projectPublicId:projectId},
    userIdVo:{userPublicId:req.userId},
    taskDateVo:{startingDate:req.taskStartingDate,endingDate:req.taskEndingDate},
    parentTaskPublicIdVo:{parentTaskPublicId:req.parentTaskId}
    }     
    try {
      const {data} =  await Api.post("/tasks/create",newReq)
      console.log(data);
    } catch (error) {
        console.log(error);
    }

}