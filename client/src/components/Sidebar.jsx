// src/components/Sidebar.jsx
import React from "react";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 220;

export default function Sidebar() {
  const location = useLocation();
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box", top: '64px' },
      }}
    >
      <List>
        <ListItemButton component={Link} to="/dashboard" selected={location.pathname === "/dashboard"}>
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton component={Link} to="/restaurants" selected={location.pathname.startsWith("/restaurants")}>
          <ListItemIcon><RestaurantIcon /></ListItemIcon>
          <ListItemText primary="Restaurants" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
