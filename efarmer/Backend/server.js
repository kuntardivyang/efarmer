require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const path = require('path');
const fs = require('fs');

const config = require('./config');
const authRoutes = require('./auth');
const productRoutes = require('./products');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

// Security middleware
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: config.rateLimitWindowMs,
    max: config.rateLimitMaxRequests,
    message: {
        success: false,
        message: 'Too many requests, please try again later.'
    }
});
app.use('/api/', limiter);

// Stricter rate limit for auth routes
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // 10 attempts
    message: {
        success: false,
        message: 'Too many login attempts, please try again after 15 minutes.'
    }
});
app.use('/api/auth/login', authLimiter);

// CORS configuration
app.use(cors({
    origin: config.corsOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Sanitize data against NoSQL injection
app.use(mongoSanitize());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Connect to MongoDB
mongoose.connect(config.mongodbUri)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// Handle MongoDB connection events
mongoose.connection.on('error', (err) => {
    console.error('MongoDB error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected. Attempting to reconnect...');
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        environment: config.nodeEnv
    });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Handle 404
app.use(notFound);

// Global error handler
app.use(errorHandler);

// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed.');
        process.exit(0);
    } catch (err) {
        console.error('Error closing MongoDB connection:', err);
        process.exit(1);
    }
});

// Start server
const PORT = config.port;
app.listen(PORT, () => {
    console.log(`Server running in ${config.nodeEnv} mode on http://localhost:${PORT}`);
});

module.exports = app;
