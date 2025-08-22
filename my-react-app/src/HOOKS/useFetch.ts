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
                console.log(response);
            }catch(e:any){
                console.log(e);
                setError(e.message || "oops something went wrong ! ")
                console.log(e);
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