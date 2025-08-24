import { Api } from "../../HOOKS/AxiosApi";

export default async function LogoutUser(){
    try {
       await Api.post("/logout",null)
    } catch (error) {
        console.log(error);
    }
}