import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Loading spinner component
const LoadingSpinner = () => (
    <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
    </div>
);

// Protected route - requires authentication
export const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!isAuthenticated) {
        // Redirect to login, saving the attempted URL
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

// Farmer only route - requires farmer role
export const FarmerRoute = ({ children }) => {
    const { isAuthenticated, isFarmer, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!isFarmer) {
        return <Navigate to="/consumer" replace />;
    }

    return children;
};

// Customer only route - requires non-farmer role
export const CustomerRoute = ({ children }) => {
    const { isAuthenticated, isFarmer, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (isFarmer) {
        return <Navigate to="/ecommerce" replace />;
    }

    return children;
};

// Public only route - redirects authenticated users
export const PublicOnlyRoute = ({ children }) => {
    const { isAuthenticated, isFarmer, loading } = useAuth();

    if (loading) {
        return <LoadingSpinner />;
    }

    if (isAuthenticated) {
        // Redirect based on role
        return <Navigate to={isFarmer ? '/ecommerce' : '/consumer'} replace />;
    }

    return children;
};

export default ProtectedRoute;
