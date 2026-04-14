import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  ListItemButton,
  ListItemIcon,
  IconButton
} from '@mui/material';

import SidebarUserProfile from './SidebarUserProfile';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import FolderIcon from '@mui/icons-material/Folder';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';

import LogoutUser from '../SERVICES/Auth/Logout';
import { useAuthStore } from '../STORE/Auth';
import { toast } from 'react-toastify';
import { useState } from "react";

const drawerWidth = 240;

const SidebarElements = [
  { text: 'Home', path: "/dashboard/home", icon: <HomeIcon /> },
  { text: 'Tasks', path: "/dashboard/tasks", icon: <AccountTreeIcon /> },
  { text: 'Projects', path: "/dashboard/projects", icon: <FolderIcon /> },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  function handleLogout() {
    try {
      LogoutUser();
      useAuthStore.getState().disconnect();
      navigate("/");
    } catch (error) {
      toast.error("Error occurred while logging out");
    }
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <IconButton
        onClick={() => setOpen(true)}
        sx={{ position: "fixed", top: 10, left: 10, zIndex: 1300 }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        variant="temporary"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
            bgcolor: "#fafafa"
          },
        }}
      >

        <SidebarUserProfile />

        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem>
              <ListItemText
                sx={{ textAlign: "center" }}
                primaryTypographyProps={{
                  fontSize: '1.25rem',
                  px: 3,
                  mt: 2
                }}
              >
                Menu
              </ListItemText>
            </ListItem>

            {SidebarElements.map((element, index) => (
              <ListItemButton
                key={index}
                component={NavLink}
                to={element.path}
                onClick={() => setOpen(false)} 
                sx={{
                  cursor: "pointer",
                  '&:hover .MuiListItemText-primary': {
                    color: 'red',
                  }
                }}
              >
                <ListItemIcon>
                  {element.icon}
                </ListItemIcon>

                <ListItemText primary={element.text} />
              </ListItemButton>
            ))}

            <ListItemButton
              onClick={handleLogout}
              sx={{
                cursor: "pointer",
                color: "#757575",
                '&:hover': { color: 'red' },
              }}
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
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 2
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}