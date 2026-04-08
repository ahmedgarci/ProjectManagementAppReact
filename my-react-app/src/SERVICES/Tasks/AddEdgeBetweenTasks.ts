import { Api } from "../../HOOKS/AxiosApi";


export default async function AddEdge(source:string , target:string): Promise<boolean> {
    const newReq = {
        source:{"parentTaskPublicId":source},
        destination:{"publicId":target}};
        try {
            const response = await Api.post("/tasks/markParent",newReq)
            return response.data;
        } catch (error) {
            console.log(error);
            return false;
        }
}