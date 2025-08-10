import { Api } from "../../HOOKS/AxiosApi";


export default async function AddEdge(source:string , target:string) {
    const newReq = {
        source:{"parentTaskPublicId":source},
        destination:{"publicId":target}};
        try {
            const response = await Api.post("/tasks/markParent",newReq)
            console.log(response);
        } catch (error) {
            console.log(error);
        }
}