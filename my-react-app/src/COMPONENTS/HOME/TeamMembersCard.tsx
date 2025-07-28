import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Toolbar,
} from '@mui/material';

const mockTeam = [
  { id: 1, name: 'Alice Johnson', role: 'Designer', online: true },
  { id: 2, name: 'Bob Smith', role: 'Developer', online: false },
  { id: 3, name: 'Charlie Brown', role: 'Project Manager', online: true },
];

export default function TeamMembersCard() {
  return (
    <>
    <Toolbar/>
    <Box
        sx={{
          display: 'flex',
          flexDirection:'column',
          justifyContent: 'center',
          alignItems: 'center',
          
          width:'100%'
        }}
      >
      <Typography variant="h6" gutterBottom>
        Team Members
      </Typography>

      <List dense>
        {mockTeam.map((member, index) => (
          <ListItem
            key={member.id}
            sx={{
              borderRadius: 1,
              '&:hover': {
                backgroundColor: '#f9f9f9',
                cursor: 'pointer',
              },
            }}
          >
            <ListItemAvatar>
             
                <Avatar
                  sx={{
                    bgcolor: `hsl(${index * 90}, 60%, 60%)`,
                    width: 40,
                    height: 40,
                  }}
                >
                  {member.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={member.name}
              secondary={member.role}
              primaryTypographyProps={{ fontWeight: 500 }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
    </>

  );
}
