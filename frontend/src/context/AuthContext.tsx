// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from '../types/auth';

interface AuthContextProps {
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    isAdmin: boolean;
    loadingAuth: boolean;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loadingAuth, setLoadingAuth] = useState(true);


    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoadingAuth(false);
    }, []);

    const login = async (username: string, password: string) => {
        if (password === 'password') {
            const role = username === 'admin' ? 'admin' : 'user';
            const newUser: User = { username, role };
            setUser(newUser);
            localStorage.setItem('user', JSON.stringify(newUser));
        } else {
            throw new Error('Invalid credentials');
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAdmin: user?.role === 'admin', loadingAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
