import axios from "axios";
import { useAuthStore } from "../../STORE/Auth";
import type { AuthReq } from "./Model/AuthModel";



export async function AuthenticateUser(req:AuthReq):Promise<void>{
    const reqBody = {
        userEmailVo:{email:req.email},
        userPasswordVo:{password:req.password}
    }
    try {
       const {data} =  await axios.post("http://localhost:8080/api/v1/authentication/authenticate",reqBody);
       useAuthStore.getState().setAuth(data)
    } catch (error) {
        console.log(error);
        throw "invalid Credentials"
    }
}