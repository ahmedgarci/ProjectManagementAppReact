import { useEffect, useState } from "react";
import {
  TextField,
  InputAdornment,
  Container,
  Box,
  Typography,
} from "@mui/material";
import { SearchRounded } from "@mui/icons-material";
import useFetch from "../HOOKS/useFetch";
import Loader from "../COMPONENTS/Loading/Loading";
import type { ProjectDetailsResponse } from "../SERVICES/Projects/ProjectDomain";
import ProjectModalHeader from "../FEATURES/Projects/ProjectModalHeader";
import ProjectCard from "../FEATURES/Projects/ProjectCard";

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [allProjects, setAllProjects] = useState<ProjectDetailsResponse[]>([]);

  const { data: projects, loading, error } = useFetch<ProjectDetailsResponse[]>("/project/all");

  useEffect(() => {
    if (projects) setAllProjects(projects);
  }, [projects]);

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <ProjectModalHeader />

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
        sx={{ mb: 4 }}
      />

      {loading && <Loader />}

      {!loading && allProjects.length === 0 && (
        <Box
          sx={{
            width: "100%",
            py: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            color: "text.secondary",
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            No projects found
          </Typography>

          <Typography variant="body2" sx={{ mt: 1 }}>
            Create your first project to get started 🚀
          </Typography>
        </Box>
      )}

      {!loading && allProjects.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 3,
            width: "100%",
          }}
        >
          {allProjects.map((project) => (
            <Box
              key={project.projectId}
              sx={{
                flex: "1 1 300px",
                maxWidth: "400px",
                minWidth: "300px",
              }}
            >
              <ProjectCard
                setState={setAllProjects}
                state={allProjects}
                project={project}
              />
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
}