// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from '../types/auth';

interface AuthContextProps {
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    // Beim Laden des Contexts User aus localStorage laden
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = async (username: string, password: string) => {
        if (password === 'password') {
            const role = username === 'admin' ? 'admin' : 'user';
            const newUser: User = { username, role };
            setUser(newUser);
            // User in localStorage speichern
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
        <AuthContext.Provider value={{ user, login, logout, isAdmin: user?.role === 'admin' }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
