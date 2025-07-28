import Button from '@mui/material/Button';
import { useTaskContext } from '../../../HOOKS/Tasks/TaskContext';
import type { CreateTaskRequest } from '../../../SERVICES/Tasks/Model';

type FunctionAsProps = {
        onSubmit:(task:CreateTaskRequest)=>void,
}

export default function TaskSubmitBtn({onSubmit}:FunctionAsProps) {
        const {state} = useTaskContext()
        return(
                <Button variant='contained' color='error' fullWidth sx={{mt:2,py:1.8,borderRadius:3}} 
                onClick={()=>onSubmit(state)}
                >Create</Button>
        )
}
