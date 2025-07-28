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
      const response =  await axios.post("http://localhost:8080/api/v1/authentication/register",userInfo)
    } catch (error) {
        console.log(error);
    }
}

