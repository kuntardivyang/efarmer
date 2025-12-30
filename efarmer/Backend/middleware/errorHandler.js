const config = require('../config');

// Custom error class
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

// 404 handler
const notFound = (req, res, next) => {
    const error = new AppError(`Route ${req.originalUrl} not found`, 404);
    next(error);
};

// Global error handler
const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // Log error in development
    if (config.nodeEnv === 'development') {
        console.error('Error:', err);
    }

    // Handle specific error types
    if (err.name === 'CastError') {
        err = new AppError(`Invalid ${err.path}: ${err.value}`, 400);
    }

    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        err = new AppError(`Duplicate value for field: ${field}`, 400);
    }

    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(e => e.message);
        err = new AppError(`Validation error: ${messages.join(', ')}`, 400);
    }

    if (err.name === 'JsonWebTokenError') {
        err = new AppError('Invalid token. Please log in again.', 401);
    }

    if (err.name === 'TokenExpiredError') {
        err = new AppError('Token expired. Please log in again.', 401);
    }

    // Send response
    res.status(err.statusCode).json({
        success: false,
        status: err.status,
        message: err.message,
        ...(config.nodeEnv === 'development' && { stack: err.stack })
    });
};

module.exports = { AppError, notFound, errorHandler };
