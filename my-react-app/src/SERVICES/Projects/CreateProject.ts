import { Api } from "../../HOOKS/AxiosApi";
import type { CreateProjectRequest } from "./ProjectDomain";


export default async function CreateProject(req:CreateProjectRequest) {
    const newReq = {
        "endingDateVo":{"endingDate":req.endingDate},
        "projectNameVo":{"name":req.projectNameVo},
        "startingDateVo":{"startingDate":req.startingDateVo},
        "projectDescroptionVo":{"description":req.projectDescriptionVo}
    }
    try {
        await Api.post("/project",newReq)
    } catch (error:any) {
        throw error.response.data
    }
}