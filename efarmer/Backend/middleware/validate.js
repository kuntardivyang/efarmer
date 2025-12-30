const { body, param, validationResult } = require('express-validator');

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        });
    }
    next();
};

// Auth validation rules
const signupValidation = [
    body('username')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Username must be between 2 and 50 characters')
        .matches(/^[a-zA-Z0-9_\s]+$/)
        .withMessage('Username can only contain letters, numbers, underscores, and spaces'),

    body('email')
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),

    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .matches(/\d/)
        .withMessage('Password must contain at least one number'),

    body('phone')
        .trim()
        .matches(/^[\d\s\-\+\(\)]{10,15}$/)
        .withMessage('Please provide a valid phone number'),

    body('isFarmer')
        .isBoolean()
        .withMessage('isFarmer must be a boolean value'),

    handleValidationErrors
];

const loginValidation = [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),

    body('password')
        .notEmpty()
        .withMessage('Password is required'),

    handleValidationErrors
];

// Product validation rules
const productValidation = [
    body('cropName')
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Crop name must be between 2 and 100 characters'),

    body('description')
        .trim()
        .isLength({ min: 10, max: 1000 })
        .withMessage('Description must be between 10 and 1000 characters'),

    body('pricePerKg')
        .isFloat({ min: 0.01 })
        .withMessage('Price must be a positive number'),

    body('quantity')
        .isInt({ min: 1 })
        .withMessage('Quantity must be at least 1'),

    body('category')
        .trim()
        .isIn(['vegetables', 'fruits', 'grains', 'dairy', 'other'])
        .withMessage('Invalid category'),

    handleValidationErrors
];

const productIdValidation = [
    param('id')
        .isMongoId()
        .withMessage('Invalid product ID'),

    handleValidationErrors
];

module.exports = {
    signupValidation,
    loginValidation,
    productValidation,
    productIdValidation,
    handleValidationErrors
};
