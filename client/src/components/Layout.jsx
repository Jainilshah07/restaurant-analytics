import React from "react";
import { Box } from "@mui/system";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Fixed Header */}
      <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1200 }}>
        <Header />
      </Box>
      
      {/* Main Content Area */}
      <Box sx={{ display: 'flex', flex: 1, marginTop: '64px' }}> {/* Adjust marginTop based on your header height */}
        {/* Fixed Sidebar */}
        <Box sx={{ position: 'fixed', left: 0, top: '64px', bottom: 0, zIndex: 1100 }}>
          <Sidebar />
        </Box>
        
        {/* Scrollable Content */}
        <Box 
          component="main" 
          sx={{ 
            flex: 1,
            marginLeft: '240px', // Adjust based on your sidebar width
            height: 'calc(100vh - 64px)',
            overflow: 'auto',
            backgroundColor: '#f5f5f5'
          }}
        >
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}