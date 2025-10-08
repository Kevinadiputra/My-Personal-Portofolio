"use client";

import { createContext, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Auth system removed - no longer needed
export const AuthProvider = ({ children }) => {
    const value = {
        isAuthenticated: false,
        user: null,
        loading: false,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
