
import {  MenuItem } from '@mui/material';

import MuiSelect from '@mui/material/Select';
export default function TaskStage({selectedElement,onChange}:{selectedElement:string,onChange:(v:string)=>void}) {
    
    return(
        <MuiSelect
            value={selectedElement ?? ""}
            size="small"
            onChange={(e) => onChange(e.target.value)}
        >
        <MenuItem value="NotStarted">Not Started</MenuItem>
        <MenuItem value="IN_PROGRESS">IN PROGRESS</MenuItem>
        <MenuItem value="DONE">DONE</MenuItem>
        </MuiSelect>
    )
    


}