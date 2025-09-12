import React from "react";
import { Box } from "@mui/system";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <Box className="min-h-screen bg-gray-100">
      <Header />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flex: 1, p: 3 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
