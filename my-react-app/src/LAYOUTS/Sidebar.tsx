import { Drawer, List, ListItem, ListItemText, Box, ListItemButton, } from '@mui/material';

import SidebarUserProfile from './SidebarUserProfile';
import { NavLink, Outlet } from 'react-router-dom';

const drawerWidth = 240;

const SidebarElements = [
  {text:'Home' , path:"/dashboard/home"},
  {text:'My Tasks' , path:"/dashboard/tasks"},
  {text:'Projects' , path:"/dashboard/projects"},
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
                <ListItemText  sx={{textAlign:"center"}}
                  primaryTypographyProps={{ fontSize: '1.25rem' , px:3 , mt:2 }}
                >Menu</ListItemText>
            </ListItem>
            {SidebarElements.map((element,index) => (
              <ListItemButton
              key={index}
              component={NavLink}
              to={element.path}
              sx={{
                cursor:"pointer",
                '&:hover .MuiListItemText-primary': {
                  color: 'red',
                }
            }}>
                <ListItemText primary={element.text} sx={{textAlign:"center",color:"#757575"}}><NavLink to={element.path}/></ListItemText>
              </ListItemButton>
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
