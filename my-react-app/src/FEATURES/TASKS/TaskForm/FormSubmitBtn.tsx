import Button from '@mui/material/Button';

type FunctionAsProps = {
        onSubmit:()=>void,
}

export default function TaskSubmitBtn({onSubmit}:FunctionAsProps) {
        return(
                <Button variant='contained' fullWidth sx={{mt:2,py:1.8,borderRadius:3,bgcolor:"#DC143C"}} 
                onClick={onSubmit}
                >Create
                </Button>
        )
}
