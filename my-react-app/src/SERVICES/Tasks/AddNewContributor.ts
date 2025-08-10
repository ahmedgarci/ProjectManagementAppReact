import { Api } from "../../HOOKS/AxiosApi";
 

export default async function SendInvitationToNewContributor(userEmail:string,projectId:string) {
    const req = {
       "contributorEmailVo":{"contributorEmail":userEmail},
        "projectPublicIdVo":{"projectPublicId":projectId}
    }
    try {
        const response  = await Api.post("/contributors",req)
        console.log(response);
    } catch (error:any) {
        throw error.response.data
    }

}