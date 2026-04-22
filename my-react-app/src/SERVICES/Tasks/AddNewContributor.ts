import { Api } from "../../HOOKS/AxiosApi";
 

export default async function SendInvitationToNewContributor(userEmail:string,projectId:string) {
    const req = {
       "contributorEmailVo":{"contributorEmail":userEmail},
        "projectPublicIdVo":{"projectPublicId":projectId}
    }
    try {
        await Api.post("/contributors",req)
    } catch (error:any) {
        throw error.response.data
    }

}