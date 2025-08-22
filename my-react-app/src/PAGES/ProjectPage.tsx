import React, { useState } from 'react';
import {Grid,TextField,
  InputAdornment,
  Container,
} from '@mui/material';
import {
  SearchRounded
} from '@mui/icons-material';
import useFetch from '../HOOKS/useFetch';
import Loader from '../COMPONENTS/Loading/Loading';
import type { ProjectDetailsResponse } from '../SERVICES/Projects/ProjectDomain';
import ProjectModalHeader from '../FEATURES/Projects/ProjectModalHeader';
import ProjectCard from '../FEATURES/Projects/ProjectCard';

export default function ProjectsPage() {
  const [search, setSearch] = useState('');
  const [open,setOpen] = React.useState<boolean>(false)

  const {data:projects,loading,error} =  useFetch<ProjectDetailsResponse[]>("/project/all");  

  if(loading){return <Loader/>}
  
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <ProjectModalHeader/>
      <TextField
        placeholder="Search projects..."
        fullWidth
        size="small"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRounded color="action" />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 4, borderRadius: 2 }}
      />

      <Grid container spacing={3}>
        {projects?.map((project) => {

          return (
            <Grid item xs={12} sm={6} md={4} size={4} key={project.id}>
              <ProjectCard project={project} />
            </Grid>
          );
        })}
      </Grid>

     
    </Container>
  );
}
