import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';
import MainLayout from '../components/Layout/MainLayout';

const AppRoutes: React.FC = () => {
    const { user } = useAuth();

    return (
        <Router>
            {user ? (
                <MainLayout>
                    <Routes>
                        <Route path="/login" element={<Navigate to="/" />} />
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
