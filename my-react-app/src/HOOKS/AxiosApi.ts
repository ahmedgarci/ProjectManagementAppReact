import axios from "axios";
import { useAuthStore } from "../STORE/Auth";

const Api = axios.create({
    baseURL:"http://localhost:8080/api/v1",
    withCredentials:true,
    
})

Api.interceptors.request.use((config)=>{
    const token = useAuthStore.getState().auth?.token;
    console.log(token);
    if(token){
        console.log(token);
        config.headers.Authorization=token;
    }
    return config;

},(error)=>{
    return Promise.reject(error)
}
)


export {Api}