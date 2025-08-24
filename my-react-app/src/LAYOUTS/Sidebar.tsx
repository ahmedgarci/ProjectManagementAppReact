import { Drawer, List, ListItem, ListItemText, Box, ListItemButton, ListItemIcon, } from '@mui/material';

import SidebarUserProfile from './SidebarUserProfile';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import LogoutIcon from '@mui/icons-material/Logout';
import LogoutUser from '../SERVICES/Auth/Logout';
import { useAuthStore } from '../STORE/Auth';
import { toast } from 'react-toastify';
const drawerWidth = 240;

const SidebarElements = [
  {text:'Home' , path:"/dashboard/home",icon:<HomeIcon/>},
  {text:'Tasks' , path:"/dashboard/tasks/",icon:<AccountTreeIcon/>},
  {text:'Projects' , path:"/dashboard/projects"},

]

export default function Sidebar() {
 const navigate =  useNavigate();
  function HandleLogout(){
    try {
      LogoutUser();
      useAuthStore.getState().disconnect();
      navigate("/")
    } catch (error) {
        toast.error("error occured while logging out")
    }

  }

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
              <ListItemButton
                onClick={HandleLogout}
                sx={{
                cursor: "pointer",
                alignItems:"center",
                color: "#757575",
                '&:hover': {
                color: 'red',
          },}}
              >
  <ListItemIcon>
    <LogoutIcon />
  </ListItemIcon>
    <ListItemText primary="Disconnect" />
</ListItemButton>
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
