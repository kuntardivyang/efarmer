// API Configuration
const API_CONFIG = {
    EXPRESS_BASE_URL: process.env.REACT_APP_EXPRESS_API_URL || 'http://localhost:5000',
    DJANGO_BASE_URL: process.env.REACT_APP_DJANGO_API_URL || 'http://localhost:8000',
};

export const API_ENDPOINTS = {
    // Auth endpoints
    AUTH: {
        LOGIN: `${API_CONFIG.EXPRESS_BASE_URL}/api/auth/login`,
        SIGNUP: `${API_CONFIG.EXPRESS_BASE_URL}/api/auth/signup`,
        PROFILE: (userId) => `${API_CONFIG.EXPRESS_BASE_URL}/api/auth/profile/${userId}`,
        ME: `${API_CONFIG.EXPRESS_BASE_URL}/api/auth/me`,
        VERIFY: `${API_CONFIG.EXPRESS_BASE_URL}/api/auth/verify`,
        UPDATE_PROFILE: `${API_CONFIG.EXPRESS_BASE_URL}/api/auth/profile`,
        CHANGE_PASSWORD: `${API_CONFIG.EXPRESS_BASE_URL}/api/auth/change-password`,
    },
    // Product endpoints
    PRODUCTS: {
        ALL: `${API_CONFIG.EXPRESS_BASE_URL}/api/products/all`,
        SINGLE: (id) => `${API_CONFIG.EXPRESS_BASE_URL}/api/products/${id}`,
        CREATE: `${API_CONFIG.EXPRESS_BASE_URL}/api/products`,
        UPDATE: (id) => `${API_CONFIG.EXPRESS_BASE_URL}/api/products/${id}`,
        DELETE: (id) => `${API_CONFIG.EXPRESS_BASE_URL}/api/products/${id}`,
        MY_PRODUCTS: `${API_CONFIG.EXPRESS_BASE_URL}/api/products/farmer/my-products`,
        SEARCH: (query) => `${API_CONFIG.EXPRESS_BASE_URL}/api/products/search/${query}`,
    },
    // ML endpoints
    ML: {
        PREDICT_DISEASE: `${API_CONFIG.DJANGO_BASE_URL}/api/predict/`,
        RECOMMEND_CROP: `${API_CONFIG.DJANGO_BASE_URL}/api/recommend_crop/`,
        HEALTH: `${API_CONFIG.DJANGO_BASE_URL}/api/health/`,
    },
    // Static files
    UPLOADS: (path) => `${API_CONFIG.EXPRESS_BASE_URL}/${path}`,
};

export default API_CONFIG;
