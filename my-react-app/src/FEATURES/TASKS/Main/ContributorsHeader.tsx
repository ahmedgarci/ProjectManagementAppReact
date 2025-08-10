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
  console.log(contributors);
  if (loading) return <Loader />;

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", mx: 4, gap: 1 }}>
      {contributors?.map((contributor) => (
        <Avatar
          key={contributor.publicId}
          sx={{ width: 36, height: 36 }}>
          {contributor.userEmail?.[0]?.toUpperCase()}
        </Avatar>
      ))}
      <ContributorsModal contributors={contributors!}/>
    </Box>
  );
}