import { Api } from "../../HOOKS/AxiosApi";
import type { CreateTaskRequest } from "./Model";


export default async function addNewProjectTask(req:CreateTaskRequest){
 const newReq = {
    taskVo:{task:req.task},
    projectPublicIdVo:{projectPublicId:"c1c13d10-8e7a-4162-90df-ea1e63408200"},
    userId:req.userId,
    taskDateVo:{startingDate:req.taskStartingDate,endingDate:req.taskEndingDate},
    parentTaskPublicIdVo:{parentTaskPublicId:req.parentTaskId}
    }     

    try {
      const {data} =  await Api.post("/",newReq)
      console.log(data);
    } catch (error) {
        console.log(error);
    }

}