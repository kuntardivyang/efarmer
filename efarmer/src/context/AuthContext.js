import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

const AuthContext = createContext(null);

// Storage keys
const STORAGE_KEYS = {
    USER: 'user',
    TOKEN: 'token',
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Clear auth state - defined first so it can be used in useEffect
    const clearAuth = useCallback(() => {
        localStorage.removeItem(STORAGE_KEYS.USER);
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        setUser(null);
        setToken(null);
    }, []);

    // Initialize auth state from localStorage
    useEffect(() => {
        const initAuth = async () => {
            try {
                const storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
                const storedUser = localStorage.getItem(STORAGE_KEYS.USER);

                if (storedToken && storedUser) {
                    // Verify token is still valid
                    try {
                        const response = await axios.get(API_ENDPOINTS.AUTH.VERIFY, {
                            headers: { Authorization: `Bearer ${storedToken}` }
                        });

                        if (response.data.success) {
                            setToken(storedToken);
                            setUser(JSON.parse(storedUser));
                        } else {
                            // Token invalid, clear storage
                            clearAuth();
                        }
                    } catch {
                        // Token verification failed, clear storage
                        clearAuth();
                    }
                }
            } catch (err) {
                console.error('Auth initialization error:', err);
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, [clearAuth]);

    // Login function
    const login = async (email, password) => {
        setError(null);
        try {
            const response = await axios.post(API_ENDPOINTS.AUTH.LOGIN, {
                email,
                password
            });

            if (response.data.success) {
                const { user: userData, token: authToken } = response.data.data;

                // Save to localStorage
                localStorage.setItem(STORAGE_KEYS.TOKEN, authToken);
                localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));

                setToken(authToken);
                setUser(userData);

                return { success: true, user: userData };
            } else {
                throw new Error(response.data.message || 'Login failed');
            }
        } catch (err) {
            const responseData = err.response?.data;
            const message = responseData?.message || err.message || 'Login failed';
            const fieldErrors = responseData?.errors || null;
            setError(message);
            return { success: false, error: message, fieldErrors };
        }
    };

    // Signup function
    const signup = async (userData) => {
        setError(null);
        try {
            const response = await axios.post(API_ENDPOINTS.AUTH.SIGNUP, userData);

            if (response.data.success) {
                const { user: newUser, token: authToken } = response.data.data;

                // Save to localStorage
                localStorage.setItem(STORAGE_KEYS.TOKEN, authToken);
                localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));

                setToken(authToken);
                setUser(newUser);

                return { success: true, user: newUser };
            } else {
                throw new Error(response.data.message || 'Signup failed');
            }
        } catch (err) {
            const responseData = err.response?.data;
            const message = responseData?.message || err.message || 'Signup failed';
            const fieldErrors = responseData?.errors || null;
            setError(message);
            return { success: false, error: message, fieldErrors };
        }
    };

    // Logout function
    const logout = useCallback(() => {
        clearAuth();
    }, [clearAuth]);

    // Update user data
    const updateUser = (updatedData) => {
        const newUser = { ...user, ...updatedData };
        setUser(newUser);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
    };

    // Check if user is authenticated
    const isAuthenticated = Boolean(user && token);

    // Check if user is a farmer
    const isFarmer = Boolean(user?.isFarmer);

    // Get auth headers for API calls
    const getAuthHeaders = useCallback(() => {
        if (!token) return {};
        return { Authorization: `Bearer ${token}` };
    }, [token]);

    const value = {
        user,
        token,
        loading,
        error,
        isAuthenticated,
        isFarmer,
        login,
        signup,
        logout,
        updateUser,
        getAuthHeaders,
        clearError: () => setError(null),
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
