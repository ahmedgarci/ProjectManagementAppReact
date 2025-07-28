import type { CreateTaskRequest } from "../../../../SERVICES/Tasks/Model"

export type TaskDetailsFormProps = {
    onSubmit:(task:CreateTaskRequest)=>void,
    state:any,
    setState: React.Dispatch<React.SetStateAction<any>>;
}