import axios from "axios";
import { useAuthStore } from "../STORE/Auth";
import { toast } from "react-toastify";

const Api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials:true,    
})

Api.interceptors.request.use((config)=>{
    const token = useAuthStore.getState().auth?.token;
    if(token){
        config.headers.Authorization=token;
    }
    return config;

},(error)=>{
    return Promise.reject(error)
}
)

Api.interceptors.response.use((response)=>{
    return response;
},
    (error)=>{
        if(error.response.status == 401){
            toast.error("session expired")
            window.location.href="/"
        }
        return Promise.reject(error)
    }
)

export {Api}