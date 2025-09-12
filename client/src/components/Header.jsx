// src/components/Header.jsx
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";

export default function Header() {
  return (
    <AppBar position="static" color="primary" elevation={1}>
      <Toolbar className="flex justify-between">
        <div className="flex items-center gap-3">
          <Typography variant="h6" component="div">
            Restaurant Analytics
          </Typography>
          <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
            Insights dashboard
          </Typography>
        </div>
        <div className="flex items-center">
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}
