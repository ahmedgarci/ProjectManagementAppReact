import {useState,useEffect} from "react";
import {Api} from "./AxiosApi"



export default function useFetch<T>(path:string){

    const [data,setData] = useState<T>();

    const [error,setError] = useState();
    
    const [loading,setLoading] = useState<boolean>(false);


    useEffect(()=>{
    
        async function Fetch(){
    
            setLoading(true);
    
            try{
                
                const response = await Api.get(path);
                console.log(response);
                setData(response.data);
                console.log(response.data);
            }catch(e:any){
                console.log(e);
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