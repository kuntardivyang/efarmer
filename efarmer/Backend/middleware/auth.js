const jwt = require('jsonwebtoken');
const config = require('../config');

// Verify JWT token middleware
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'Access denied. No token provided.'
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expired. Please login again.'
            });
        }
        return res.status(401).json({
            success: false,
            message: 'Invalid token.'
        });
    }
};

// Check if user is a farmer
const isFarmer = (req, res, next) => {
    if (!req.user || !req.user.isFarmer) {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Farmer privileges required.'
        });
    }
    next();
};

// Optional auth - sets user if token exists but doesn't require it
const optionalAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, config.jwtSecret);
            req.user = decoded;
        } catch (error) {
            // Token invalid, but that's ok for optional auth
        }
    }
    next();
};

module.exports = { verifyToken, isFarmer, optionalAuth };
