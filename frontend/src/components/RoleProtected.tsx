import React from 'react';
import { useAuth } from '../context/AuthContext';

interface RoleProtectedProps {
    requiredRole?: 'admin';
    children: React.ReactNode;
}

const RoleProtected: React.FC<RoleProtectedProps> = ({ requiredRole, children }) => {
    const { user } = useAuth();
    if (requiredRole && user?.role !== requiredRole) {
        return null;
    }
    return <>{children}</>;
};

export default RoleProtected;
