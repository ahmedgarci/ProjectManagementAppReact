import axios from "axios";
import type { RegisterRequest } from "./Model/AuthModel";


export default async function Register(req:RegisterRequest):Promise<void>{
    const userInfo = {
        positionVo:{"jobPosition":req.jobPosition},
        userIdentifiersVo:{"fullName":req.fullName},
        userEmailVo:{"email":req.email},
        userPasswordVo:{"password":req.password}
    }
    try {
        await axios.post(`${import.meta.env.VITE_API_URL}/authentication/register`,userInfo)
    } catch (error:any) {
        if(error.status == 400){
            throw error.response.data
        }
        throw {general:"email already exists"}
    }
}

