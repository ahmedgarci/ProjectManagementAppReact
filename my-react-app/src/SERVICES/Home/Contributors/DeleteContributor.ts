import { Api } from "../../../HOOKS/AxiosApi";



export default async function UnassignContributorFromProject({userId,projectId}:{userId:string,projectId:string}) {
    const data= {
        "projectPublicId":projectId,
        "contributorPublicId":userId
    }
    try {
       const response =  await Api.post("/contributors/remove",data)
       console.log(response);
    } catch (error) {
        console.log(error);
    }

}