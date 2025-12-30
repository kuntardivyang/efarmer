import axios from 'axios';
import API_CONFIG from '../config/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_CONFIG.EXPRESS_BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - handle errors
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const { response } = error;

        if (response) {
            // Handle specific status codes
            switch (response.status) {
                case 401:
                    // Unauthorized - clear auth and redirect to login
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    // Only redirect if not already on auth pages
                    if (!window.location.pathname.includes('/signup') &&
                        !window.location.pathname.includes('/login')) {
                        window.location.href = '/signup';
                    }
                    break;
                case 403:
                    console.error('Access denied');
                    break;
                case 404:
                    console.error('Resource not found');
                    break;
                case 500:
                    console.error('Server error');
                    break;
                default:
                    break;
            }
        } else if (error.request) {
            // Network error
            console.error('Network error - please check your connection');
        }

        return Promise.reject(error);
    }
);

// Django API instance
export const djangoApi = axios.create({
    baseURL: API_CONFIG.DJANGO_BASE_URL,
    timeout: 60000, // Longer timeout for ML predictions
});

export default api;
