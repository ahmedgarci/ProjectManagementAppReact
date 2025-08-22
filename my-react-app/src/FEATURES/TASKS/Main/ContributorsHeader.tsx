import { Avatar, Box, IconButton, TextField } from "@mui/material";
import Loader from "../../../COMPONENTS/Loading/Loading";
import useFetch from "../../../HOOKS/useFetch";
import type { ProjectContributorResponse } from "../../../SERVICES/Tasks/Model";
import ContributorsModal from "./ContributorsModal";

interface ContributorsHeaderProps {
  ProjectPublicId: string;
}

export default function ContributorsHeader({ ProjectPublicId }: ContributorsHeaderProps) {
  const {data: contributors,loading,error} = useFetch<ProjectContributorResponse[]>(`/contributors/${ProjectPublicId}`);
  if (loading) return <Loader />;

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", mx: 4, gap: 1 }}>
      <ContributorsModal contributors={contributors!}/>
    </Box>
  );
}