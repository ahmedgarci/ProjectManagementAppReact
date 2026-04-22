import axios from "axios";
import { useAuthStore } from "../../STORE/Auth";
import type { AuthReq } from "./Model/AuthModel";



export async function AuthenticateUser(req:AuthReq):Promise<void>{
    const reqBody = {
        userEmailVo:{email:req.email},
        userPasswordVo:{password:req.password}
    }
    try {
       const {data} =  await axios.post(`${import.meta.env.VITE_API_URL}/authentication/authenticate`,reqBody);
       useAuthStore.getState().setAuth(data)
    } catch (error: any) {
        const { status, data } = error.response;       
        if (status === 400 && data) {
            throw data;
        }
        else if (status === 404 && data ){
            throw data
        }
        throw new Error("Something went wrong");
    }
}