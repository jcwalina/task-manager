import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Switch, Box } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useCustomTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
    handleDrawerToggle: () => void;
    drawerOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ handleDrawerToggle }) => {
    const { isDarkMode, toggleTheme } = useCustomTheme();
    const { user, logout } = useAuth();

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <span className="material-icons">menu</span>
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Task Manager
                </Typography>

                <Switch checked={isDarkMode} onChange={toggleTheme} color="default" />

                {user && (
                    <Box display="flex" alignItems="center" ml={2}>
                        <Typography variant="body1" mr={1}>{user.username} ({user.role})</Typography>
                        <IconButton color="inherit" onClick={logout}>
                            <LogoutIcon />
                        </IconButton>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
