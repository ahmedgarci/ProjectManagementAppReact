import { createContext, useState, type ReactNode, useContext } from "react";
import type { CreateTaskRequest } from "../../SERVICES/Tasks/Model";
 

export type TaskContextType = {
    state:CreateTaskRequest,
    setState: React.Dispatch<React.SetStateAction<CreateTaskRequest>>;
}

const TaskContext = createContext<TaskContextType|undefined>( undefined);


export const TaskProvider = ({children}:{children:ReactNode})=>{
    const [state,setState] = useState<CreateTaskRequest>({userId:''});

    return(
        <TaskContext.Provider value={{state,setState}}>
        {children}
        </TaskContext.Provider>
    )
}

export const useTaskContext = ()=>{
    const context = useContext(TaskContext)
    if(!context){
        throw new Error("error in task context")
    }
    return context
}