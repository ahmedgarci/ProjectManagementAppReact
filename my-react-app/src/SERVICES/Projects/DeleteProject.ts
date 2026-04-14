import { Api } from "../../HOOKS/AxiosApi";

export default async function DeleteProject(projectPublicId:string){
    try {
       await Api.delete(`/project/${projectPublicId}`);
    } catch (error) {
        console.log(error);
    }

}