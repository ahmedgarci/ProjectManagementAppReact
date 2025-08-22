import { Api } from "../../HOOKS/AxiosApi";


export default async function AcceptProjectInvitation(code:string){
    try {
        await Api.get(`/contributors/acceptinvite?code=${code}`)
    } catch (error) {
        console.log(error);
    }
    
}