const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Product = require('./models/Product');
const { verifyToken, isFarmer, optionalAuth } = require('./middleware/auth');
const { productValidation, productIdValidation } = require('./middleware/validate');
const { AppError } = require('./middleware/errorHandler');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter for images only
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new AppError('Only JPEG, PNG, and WebP images are allowed', 400), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Helper to delete image file
const deleteImageFile = (imagePath) => {
    if (imagePath) {
        const fullPath = path.join(__dirname, imagePath.replace(/^.*Backend/, ''));
        if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
        }
    }
};

// Get all products (public)
router.get('/all', optionalAuth, async (req, res, next) => {
    try {
        const { category, search, page = 1, limit = 20, sort = '-createdAt' } = req.query;

        // Build query
        const query = { isAvailable: true };

        if (category && category !== 'all') {
            query.category = category;
        }

        if (search) {
            query.$text = { $search: search };
        }

        // Pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const [products, total] = await Promise.all([
            Product.find(query)
                .sort(sort)
                .skip(skip)
                .limit(parseInt(limit))
                .populate('farmer', 'username'),
            Product.countDocuments(query)
        ]);

        res.status(200).json({
            success: true,
            data: {
                products,
                pagination: {
                    current: parseInt(page),
                    pages: Math.ceil(total / parseInt(limit)),
                    total
                }
            }
        });
    } catch (error) {
        next(error);
    }
});

// Get single product
router.get('/:id', productIdValidation, async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('farmer', 'username phone');

        if (!product) {
            throw new AppError('Product not found', 404);
        }

        res.status(200).json({
            success: true,
            data: { product }
        });
    } catch (error) {
        next(error);
    }
});

// Get products by farmer (authenticated farmer only)
router.get('/farmer/my-products', verifyToken, isFarmer, async (req, res, next) => {
    try {
        const products = await Product.find({ farmer: req.user.id })
            .sort('-createdAt');

        res.status(200).json({
            success: true,
            data: { products }
        });
    } catch (error) {
        next(error);
    }
});

// Create product (farmer only)
router.post('/', verifyToken, isFarmer, upload.single('image'), async (req, res, next) => {
    try {
        if (!req.file) {
            throw new AppError('Product image is required', 400);
        }

        const { cropName, description, pricePerKg, quantity, category } = req.body;

        // Validate required fields
        if (!cropName || !description || !pricePerKg || !quantity || !category) {
            deleteImageFile(req.file.path);
            throw new AppError('All fields are required', 400);
        }

        const product = await Product.create({
            cropName,
            description,
            pricePerKg: parseFloat(pricePerKg),
            image: `uploads/${req.file.filename}`,
            quantity: parseInt(quantity),
            category,
            farmer: req.user.id,
            farmerName: req.user.username
        });

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: { product }
        });
    } catch (error) {
        // Clean up uploaded file on error
        if (req.file) {
            deleteImageFile(req.file.path);
        }
        next(error);
    }
});

// Update product (farmer only, must own product)
router.put('/:id', verifyToken, isFarmer, productIdValidation, upload.single('image'), async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            if (req.file) deleteImageFile(req.file.path);
            throw new AppError('Product not found', 404);
        }

        // Check ownership
        if (product.farmer.toString() !== req.user.id) {
            if (req.file) deleteImageFile(req.file.path);
            throw new AppError('You can only update your own products', 403);
        }

        const { cropName, description, pricePerKg, quantity, category, isAvailable } = req.body;

        // Update fields
        if (cropName) product.cropName = cropName;
        if (description) product.description = description;
        if (pricePerKg) product.pricePerKg = parseFloat(pricePerKg);
        if (quantity !== undefined) product.quantity = parseInt(quantity);
        if (category) product.category = category;
        if (isAvailable !== undefined) product.isAvailable = isAvailable === 'true' || isAvailable === true;

        // Update image if provided
        if (req.file) {
            // Delete old image
            deleteImageFile(product.image);
            product.image = `uploads/${req.file.filename}`;
        }

        await product.save();

        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            data: { product }
        });
    } catch (error) {
        if (req.file) deleteImageFile(req.file.path);
        next(error);
    }
});

// Delete product (farmer only, must own product)
router.delete('/:id', verifyToken, isFarmer, productIdValidation, async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            throw new AppError('Product not found', 404);
        }

        // Check ownership
        if (product.farmer.toString() !== req.user.id) {
            throw new AppError('You can only delete your own products', 403);
        }

        // Soft delete
        product.isDeleted = true;
        product.isAvailable = false;
        await product.save();

        // Optionally delete the image file
        // deleteImageFile(product.image);

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        next(error);
    }
});

// Search products
router.get('/search/:query', async (req, res, next) => {
    try {
        const searchQuery = req.params.query;

        const products = await Product.find({
            isAvailable: true,
            $or: [
                { cropName: { $regex: searchQuery, $options: 'i' } },
                { description: { $regex: searchQuery, $options: 'i' } },
                { category: { $regex: searchQuery, $options: 'i' } }
            ]
        }).limit(20);

        res.status(200).json({
            success: true,
            data: { products }
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
