import { Box, Typography } from "@mui/material";
import Loader from "../../../COMPONENTS/Loading/Loading";
import useFetch from "../../../HOOKS/useFetch";
import type { ProjectContributorResponse } from "../../../SERVICES/Tasks/Model";
import ContributorsModal from "./ContributorsModal";
import { useEffect, useState } from "react";

interface ContributorsHeaderProps {
  ProjectPublicId: string;
}

export default function ContributorsHeader({ ProjectPublicId }: ContributorsHeaderProps) {
  const [contributors,setContributors] = useState<ProjectContributorResponse[]>([]);
  const {data,loading,error} = useFetch<ProjectContributorResponse[]>(`/contributors/${ProjectPublicId}`);

  useEffect(()=>{
    if(data) setContributors(data);
  },[data])

  if (loading) return <Loader />;
  
  if(error){
    return <Typography bgcolor={"error"}>Error Loading The Contributors</Typography>
  }
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", mx: 4, gap: 1 }}>
      <ContributorsModal contributors={contributors!} onRemoveContributor={(id)=>{setContributors(prev => prev.filter(contributor => contributor.publicId !== id))}}/>
    </Box>
  );
}