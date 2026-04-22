import * as React from 'react';
import {
  Box,
  IconButton,
  Modal,
  Typography,
  Avatar,
  Stack,
  Divider
} from '@mui/material';
import type { ProjectContributorResponse } from '../../../SERVICES/Tasks/Model';
import AddNewContributor from './NewContributor';
import GroupsIcon from '@mui/icons-material/Groups';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import { useParams } from 'react-router-dom';
import UnassignContributorFromProject from '../../../SERVICES/Home/Contributors/DeleteContributor';
import { toast } from 'react-toastify';

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 420,
  maxHeight: '80vh',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
  overflowY: 'auto',
};

interface ContributorsModalProps {
  contributors: ProjectContributorResponse[],
  onRemoveContributor:(id:string)=>void
}

export default function ContributorsModal({ contributors,onRemoveContributor }: ContributorsModalProps) {

  const [open, setOpen] = React.useState(false);
  const [Loading,setLoading] = React.useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {projectId} = useParams();

  const HandleDelete =async (id:string) => {
    setLoading(true)
    try {
      await UnassignContributorFromProject({userId:id,projectId:projectId!})
      onRemoveContributor(id)
      toast.success("contributor was removed from the project")
    } catch (error) {
      toast.error("Cannot remove user from the project")
    }finally{
      setLoading(false)
    }
  }

  return (
    <>
      <IconButton onClick={handleOpen} aria-label="View Contributors">
        <GroupsIcon />
      </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="contributors-modal-title"
        aria-describedby="contributors-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            id="contributors-modal-title"
            variant="h6"
            fontWeight={600}
            gutterBottom
          >
            Project Contributors
          </Typography>

          <Divider sx={{ mb: 2 }} />

          {contributors && contributors.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No contributors found.
            </Typography>
          ) : (
            <Stack spacing={1} sx={{overflowY:'scroll'}}>
              { (contributors ?? []).map((contributor, index) => (
                <Box
                  key={contributor.publicId || index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 1,
                    borderRadius: 1,
                    transition: 'background-color 0.2s',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <Avatar sx={{ width: 36, height: 36 }}>
                    {contributor.userEmail?.[0]?.toUpperCase() || "?"}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2">
                      {contributor.userEmail}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {contributor.jobPos}
                    </Typography>
                  </Box>
                  <IconButton disabled={Loading} sx={{marginLeft:"auto"}} onClick={()=>HandleDelete(contributor.publicId)}>
                    <DeleteOutline />
                    </IconButton>
                </Box>
              ))}
            </Stack>
          )}
          <Divider sx={{mt:1}} />
          <AddNewContributor />
        </Box>
      </Modal>
    </>
  );
}