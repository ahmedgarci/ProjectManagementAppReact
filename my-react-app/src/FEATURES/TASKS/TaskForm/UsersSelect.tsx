import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import useFetch from '../../../HOOKS/useFetch';
import type { ProjectContributorResponse } from '../../../SERVICES/Tasks/Model';
import Loader from '../../../COMPONENTS/Loading/Loading';
import { Avatar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useTaskContext } from '../../../HOOKS/Tasks/TaskContext';
import { useParams } from 'react-router-dom';


export default function UsersSelect({fieldError}:{fieldError:string}) {
  const {projectId} = useParams();
  const {state,setState} = useTaskContext()

  const { data: contributors, loading, error } = useFetch<ProjectContributorResponse[]>(`/contributors/${projectId}`)

  if (loading) { return <Loader /> }
  if(contributors == null || contributors.length ==0) return <p className='text-center'>No contributors yet</p>
  if(error){return <p>oops error</p>}

  const handleChange = (event: SelectChangeEvent) => {
    setState((prev)=>({...prev,userId:event.target.value}))
  };


  return (
    <div>
      <FormControl sx={{ mx: 'auto', width: "100%" }} error={!!fieldError}>
        <InputLabel id="demo-simple-select-helper-label">user</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={state.userId}
          label="user"
          onChange={handleChange}
        >
          {contributors && contributors.map((contributor) => {
            return (
              <MenuItem value={contributor.publicId}>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar
                  sx={{ width: 36, height: 36 }}
                >
                  {contributor.userEmail?.[0]}
                </Avatar>
            
                <Box display="flex" flexDirection="column">
                  <Typography variant="body2" fontWeight={600}>
                    {contributor.jobPos}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {contributor.userEmail}
                  </Typography>
                </Box>
              </Box>
            </MenuItem>
          )})}

        </Select>
        {fieldError && <FormHelperText>{fieldError}</FormHelperText>}
      </FormControl>

    </div>
  );
}