import { Navigate } from "react-router-dom"
import { useAuthStore } from "../../STORE/Auth";


export default function RequireAuth({children}){
    const token = useAuthStore.getState().auth?.token;
    if(!token){
        return <Navigate to={"/"} replace />
    }

    return children

}