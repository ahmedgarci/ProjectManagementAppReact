import { Navigate } from "react-router-dom"
import { useAuthStore } from "../../STORE/Auth";
import type React from "react";


export default function RequireAuth({children}:{children:React.ReactNode}){
    const token = useAuthStore.getState().auth?.token;
    if(!token){
        return <Navigate to={"/"} replace />
    }

    return children

}