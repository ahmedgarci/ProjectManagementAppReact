import { DeleteOutline } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";
import type { ProjectDetailsResponse } from "../../SERVICES/Projects/ProjectDomain";
import { useState } from "react";
import getStageColor from "../../COMPONENTS/common/GetStageColor";
import DisplayProjectInfoModal from "./DisplayProjectInfos";
import { NavLink } from "react-router-dom";
import DeleteProject from "../../SERVICES/Projects/DeleteProject";

interface ProjectCardProps {
  project: ProjectDetailsResponse;
  state:ProjectDetailsResponse[],
  setState: React.Dispatch<React.SetStateAction<ProjectDetailsResponse[]>>
}

export default function ProjectCard({ project,setState,state }: ProjectCardProps) {
  const [open, setOpen] = useState(false);
  function  deleteProject(id:string) {
      try {
        DeleteProject(id);
        setState(prev => prev.filter(p => p.projectId !== id));
            } catch (error) {
        
      }
  }
  const { projectName, startedAt, endsAt, projectTasks, stage, projectId } = project;

  const completedTasks = projectTasks?.completedTasks ?? 0;
  const allTasks = projectTasks?.allTasks ?? 0;

  const progress = allTasks > 0 ? (completedTasks / allTasks) * 100 : 0;

  return (
    <Card
      variant="outlined"
      sx={{
        flex:"1 1 250px",
        maxWidth:"350px",
        minWidth:"260px",
        borderRadius: 3,
        px: 2,
        py: 2,
        boxShadow: 1,
        transition: "all 0.3s ease",
        "&:hover": {
          borderColor: "#dd2c00",
          boxShadow: 3,
          transform: "translateY(-2px)",
        },
      }}
    >
      <NavLink
        to={`/dashboard/tasks/${projectId}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <CardContent sx={{ p: 0 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
            <Typography variant="subtitle1" fontWeight={600}>
              {projectName}
            </Typography>
          </Box>

          <Typography variant="caption" color="text.secondary">
            From: {startedAt} | To: {endsAt}
          </Typography>

          <Box mt={2}>
            <LinearProgress
              variant="determinate"
              value={progress}
              color="error"
              sx={{
                borderRadius: 10,
                height: 6,
                backgroundColor: "#ffe5e5",
              }}
            />
            <Typography variant="caption" mt={0.5} display="block">
              {completedTasks}/{allTasks} tasks completed
            </Typography>
          </Box>
        </CardContent>
      </NavLink>

      <Box display="flex" justifyContent="space-between" mt={2} alignItems="center">
        <Chip
          label={stage}
          color={getStageColor(stage)}
          size="small"
          sx={{ fontSize: "0.7rem", borderRadius: "6px" }}
        />

        <Box display="flex" gap={1}>
          <DisplayProjectInfoModal state={{ state: open, setState: setOpen }} projectId={projectId} />

          <IconButton size="small" onClick={() => deleteProject(projectId)}>
            <DeleteOutline fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}