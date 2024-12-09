import React from 'react';
import { Drawer, Toolbar, Box, Typography } from '@mui/material';

interface SidebarProps {
    drawerWidth: number;
    mobileOpen: boolean;
    handleDrawerToggle: () => void;
}

const SidebarContent = (
    <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>Navigation</Typography>
        <Typography variant="body2" color="textSecondary">
            This is a placeholder sidebar. You can add nav links here.
        </Typography>
    </Box>
);

const Sidebar: React.FC<SidebarProps> = ({ drawerWidth, mobileOpen, handleDrawerToggle }) => {
    return (
        <>
            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { width: drawerWidth },
                }}
            >
                <Toolbar />
                {SidebarContent}
            </Drawer>

            {/* Desktop Drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
                }}
                open
            >
                <Toolbar />
                {SidebarContent}
            </Drawer>
        </>
    );
};

export default Sidebar;
