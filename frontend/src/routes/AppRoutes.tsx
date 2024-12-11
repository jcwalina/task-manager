import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';
import MainLayout from '../components/Layout/MainLayout';
import { CircularProgress, Box } from '@mui/material';


const AppRoutes: React.FC = () => {
    const { user, loadingAuth  } = useAuth();

    if (loadingAuth) {
        return (
            <Box sx={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Router>
            {user ? (
                <MainLayout>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </MainLayout>
            ) : (
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            )}
        </Router>
    );
};

export default AppRoutes;
