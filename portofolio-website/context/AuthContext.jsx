"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Admin credentials (in production, this should be handled securely on the server)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123', // Change this to a secure password
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if user is already authenticated on mount
    useEffect(() => {
        const checkAuth = () => {
            try {
                const authData = localStorage.getItem('portfolio-auth');
                if (authData) {
                    const { token, user, timestamp } = JSON.parse(authData);
                    // Check if token is expired (24 hours)
                    const isExpired = Date.now() - timestamp > 24 * 60 * 60 * 1000;
                    
                    if (!isExpired && token && user) {
                        setIsAuthenticated(true);
                        setUser(user);
                    } else {
                        // Clear expired auth
                        localStorage.removeItem('portfolio-auth');
                    }
                }
            } catch (error) {
                console.error('Error checking auth:', error);
                localStorage.removeItem('portfolio-auth');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = (username, password) => {
        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
            const user = { username, role: 'admin' };
            const token = btoa(`${username}:${password}:${Date.now()}`);
            const authData = {
                token,
                user,
                timestamp: Date.now()
            };

            localStorage.setItem('portfolio-auth', JSON.stringify(authData));
            setIsAuthenticated(true);
            setUser(user);
            return { success: true };
        } else {
            return { success: false, error: 'Invalid credentials' };
        }
    };

    const logout = () => {
        localStorage.removeItem('portfolio-auth');
        setIsAuthenticated(false);
        setUser(null);
    };

    const value = {
        isAuthenticated,
        user,
        loading,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};