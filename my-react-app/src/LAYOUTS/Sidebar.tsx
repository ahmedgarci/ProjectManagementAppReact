import { Drawer, List, ListItem, ListItemText, Box, ListItemButton, ListItemIcon, } from '@mui/material';

import SidebarUserProfile from './SidebarUserProfile';
import { NavLink, Outlet } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
const drawerWidth = 240;

const SidebarElements = [
  {text:'Home' , path:"/dashboard/home",icon:<HomeIcon/>},
  {text:'Tasks' , path:"/dashboard/tasks/",icon:<AccountTreeIcon/>},
  {text:'Projects' , path:"/dashboard/projects"},
  {text:'Users' , path:"",icon:<PersonIcon/>},

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
            }}
            >
       <ListItemText
        sx={{ color: "#757575" }}
        primary={
          <Box display="flex" alignItems="center" justifyContent="center">
            {element.icon}
            <Box component="span" ml={1}>
              {element.text}
            </Box>
          </Box>
          }
      />    
              </ListItemButton>
            ))}
              <ListItemText
              sx={{
                cursor:"pointer",
                color:"#757575",
                '&:hover .MuiListItemText-primary': {
              color: 'red',
              }
}}        primary={
          <Box display="flex" alignItems="center" justifyContent="center">
            <LogoutIcon/>
            <Box component="span" ml={1}>
              Disconnect
            </Box>
          </Box>
          }
      />  
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
