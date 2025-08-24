import { useNavigate, useParams } from "react-router-dom";
import Loader from "../COMPONENTS/Loading/Loading";
import { useEffect } from "react";
import AcceptProjectInvitation from "../SERVICES/Projects/AcceptProjectUnvitation";
import { useAuthStore } from "../STORE/Auth";


export default function AcceptProjectInvitationPage() {
    const {code}= useParams();
    const navigate = useNavigate()
    const authStore = useAuthStore().auth
    
    useEffect(()=>{
        if(authStore== null){
            navigate("/")
            return;
        }
        try{
            AcceptProjectInvitation(code!)
            navigate("/dashboard/tasks")
            return;
        }catch(error){
            console.log(error);
        }
    },[code])
    return <Loader/>
    
}