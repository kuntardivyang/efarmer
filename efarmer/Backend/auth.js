const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const config = require('./config');
const { verifyToken } = require('./middleware/auth');
const { signupValidation, loginValidation } = require('./middleware/validate');
const { AppError } = require('./middleware/errorHandler');

const router = express.Router();

// Generate JWT token
const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            username: user.username,
            isFarmer: user.isFarmer
        },
        config.jwtSecret,
        { expiresIn: config.jwtExpiresIn }
    );
};

// Signup Route
router.post('/signup', signupValidation, async (req, res, next) => {
    try {
        const { username, email, password, phone, isFarmer } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            throw new AppError('An account with this email already exists', 400);
        }

        // Create new user
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            phone,
            isFarmer
        });

        // Generate token
        const token = generateToken(user);

        res.status(201).json({
            success: true,
            message: 'Account created successfully',
            data: {
                user: user.toJSON(),
                token
            }
        });
    } catch (error) {
        next(error);
    }
});

// Login Route
router.post('/login', loginValidation, async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find user with password field
        const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

        if (!user || !user.isActive) {
            throw new AppError('Invalid email or password', 401);
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new AppError('Invalid email or password', 401);
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save({ validateBeforeSave: false });

        // Generate token
        const token = generateToken(user);

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                user: user.toJSON(),
                token
            }
        });
    } catch (error) {
        next(error);
    }
});

// Get current user profile
router.get('/me', verifyToken, async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            throw new AppError('User not found', 404);
        }

        res.status(200).json({
            success: true,
            data: { user }
        });
    } catch (error) {
        next(error);
    }
});

// Get user profile by ID (public, limited info)
router.get('/profile/:userId', async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId);

        if (!user) {
            throw new AppError('User not found', 404);
        }

        // Return limited public info
        res.status(200).json({
            success: true,
            data: {
                user: {
                    _id: user._id,
                    username: user.username,
                    isFarmer: user.isFarmer,
                    createdAt: user.createdAt
                }
            }
        });
    } catch (error) {
        next(error);
    }
});

// Update user profile
router.put('/profile', verifyToken, async (req, res, next) => {
    try {
        const { username, phone } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { username, phone },
            { new: true, runValidators: true }
        );

        if (!user) {
            throw new AppError('User not found', 404);
        }

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: { user }
        });
    } catch (error) {
        next(error);
    }
});

// Change password
router.put('/change-password', verifyToken, async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            throw new AppError('Current password and new password are required', 400);
        }

        if (newPassword.length < 6) {
            throw new AppError('New password must be at least 6 characters', 400);
        }

        const user = await User.findById(req.user.id).select('+password');

        if (!user) {
            throw new AppError('User not found', 404);
        }

        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            throw new AppError('Current password is incorrect', 401);
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Password changed successfully'
        });
    } catch (error) {
        next(error);
    }
});

// Verify token endpoint (for frontend auth check)
router.get('/verify', verifyToken, (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Token is valid',
        data: { user: req.user }
    });
});

module.exports = router;
