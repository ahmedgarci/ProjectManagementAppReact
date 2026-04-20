import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useFetch from '../../../HOOKS/useFetch';
import type { ProjectContributorResponse } from '../../../SERVICES/Tasks/Model';
import Loader from '../../../COMPONENTS/Loading/Loading';
import { Avatar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useParams } from 'react-router-dom';


export default function UsersSelect({ value, fieldError, onChange }:{value:string,fieldError:string,onChange:(v:any)=>void}) {
  const { projectId } = useParams();

  const { data:contributors, loading, error } = useFetch<ProjectContributorResponse[]>(`/contributors/${projectId}`);

  return (
    <FormControl sx={{ mx: 'auto', width: "100%" }} error={!!fieldError}>
      <InputLabel id="user-select">user</InputLabel>

      {loading ? (
        <Box sx={{ py: 2 }}>
          <Loader />
        </Box>
      ) : error ? (
        <FormHelperText>oops error</FormHelperText>
      ) : contributors?.length === 0 ? (
        <FormHelperText>No contributors yet</FormHelperText>
      ) : (
        <Select
          labelId="user-select"
          value={value ?? ''}
          label="user"
          onChange={(e) => onChange(e.target.value)}
        >
          {contributors?.map((contributor) => (
            <MenuItem
              key={contributor.publicId}
              value={contributor.publicId}
            >
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ width: 36, height: 36 }}>
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
          ))}
        </Select>
      )}

      {fieldError && <FormHelperText>{fieldError}</FormHelperText>}
    </FormControl>
  );
}