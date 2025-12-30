import React from 'react';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './router/Router';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './components/Toast';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
    return (
        <ErrorBoundary>
            <AuthProvider>
                <ToastProvider>
                    <RouterProvider router={router} />
                </ToastProvider>
            </AuthProvider>
        </ErrorBoundary>
    );
}

export default App;
