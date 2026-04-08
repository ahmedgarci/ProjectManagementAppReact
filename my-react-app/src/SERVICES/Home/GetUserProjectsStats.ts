import { Api } from "../../HOOKS/AxiosApi";
import type { StatsResponse } from "./domain";

export default async function fetchUserProjectsStats():Promise<StatsResponse> {
    try {
        const {data} = await Api.get("/project/stats")
        console.log(data);
        return data;
    } catch (error:any) {
        throw error.response.data   
    }
    
}
