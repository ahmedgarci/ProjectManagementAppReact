import { Drawer, List, ListItem, ListItemText, Box, } from '@mui/material';

import SidebarUserProfile from './SidebarUserProfile';
import { Outlet } from 'react-router-dom';

const drawerWidth = 240;

const SidebarElements = [
  {text:'Home' , path:""},
  {text:'My Tasks' , path:""},
  {text:'Projects' , path:""},
  {text:'Settings' , path:""},
  {text:'Users' , path:""},
]

export default function Sidebar() {
  return (
    <Box sx={{ display: 'flex' }}>
    <Drawer
        variant="permanent"
        sx={{
        width: drawerWidth,
        flexShrink: 0,
        ' & .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
        boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)',
        bgcolor:"#fafafa"
        },
        }}
        >
        <SidebarUserProfile/>
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem>
                <ListItemText 
                  primaryTypographyProps={{ fontSize: '1.25rem' , px:3 , mt:2 }}
                >Menu</ListItemText>
            </ListItem>
            {['Home' ,'My Tasks', 'Projects', 'Settings', 'Users'].map((text,index) => (
              <ListItem key={index}  
              sx={{
                cursor:"pointer",
                '&:hover .MuiListItemText-primary': {
                  color: 'red',
                }
            }}>
                <ListItemText primary={text} sx={{textAlign:"center",color:"#757575"}} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default' }}
      >
   
        <Outlet/>
      </Box>
    </Box>
  );
}
