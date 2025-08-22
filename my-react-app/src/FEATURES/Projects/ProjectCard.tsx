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

export default function ProjectCard({ project }: { project: ProjectDetailsResponse }) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        px: 2,
        py: 2,
        boxShadow: 1,
        transition: "0.2s",
        "&:hover": { borderColor: "#dd2c00", boxShadow: 2 },
      }}
    >
      {/* ✅ Wrap only the CardContent with NavLink */}
      <NavLink
        to={`/dashboard/tasks/${project.projectId}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <CardContent sx={{ p: 0 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="subtitle1" fontWeight="500">
              {project.projectName}
            </Typography>
          </Box>

          <Typography variant="caption" color="text.secondary">
            Due: {project.endsAt}
          </Typography>

          <Box mt={2}>
            <LinearProgress
              variant="determinate"
              value={70}
              color="error"
              sx={{
                borderRadius: 10,
                height: 6,
                backgroundColor: "#ffe5e5",
              }}
            />
            <Typography variant="caption" mt={1} display="block">
              7/10 tasks
            </Typography>
          </Box>
        </CardContent>
      </NavLink>

      <Box display="flex" justifyContent="space-between" mt={2}>
        <Chip
          label={project.stage}
          color={getStageColor(project.stage)}
          size="small"
          sx={{ fontSize: "0.7rem", borderRadius: "6px" }}
        />

        <Box display="flex" justifyContent="flex-end" gap={1}>
          <DisplayProjectInfoModal
            state={{ state: open, setState: setOpen }}
            projectId={project.projectId}
          />
          <IconButton size="small" onClick={() => console.log("Delete clicked")}>
            <DeleteOutline fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}
