import {useState,useEffect} from "react";
import {Api} from "./AxiosApi"



export default function useFetch<T>(path:string|null){

    const [data,setData] = useState<T>();

    const [error,setError] = useState();
    
    const [loading,setLoading] = useState<boolean>(false);


    useEffect(()=>{
    
        async function Fetch(){
            if(path==null){return;}
            setLoading(true);
    
            try{
                
                const response = await Api.get(path);
                setData(response.data);
                setError(undefined)
            }catch(e:any){
                setError(e.message || "oops something went wrong ! ")
            }finally{
    
                setLoading(false)
            }
        }
    
        Fetch();

    },[path])

    return{
        data,
        error,
        loading
    }

}