const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Configure storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, 'uploads'); // Save in 'uploads' folder in the same directory as products.js

        // Check if the uploads folder exists, create it if it doesn't
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath); // Create uploads directory if it doesn't exist
        }

        cb(null, uploadPath); // Set the destination to 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Save file with a timestamp to avoid conflicts
    }
});

const upload = multer({ storage });

// Product Schema
const productSchema = new mongoose.Schema({
    cropName: { type: String, required: true },
    description: { type: String, required: true },
    pricePerKg: { type: Number, required: true },
    image: { type: String, required: true }, // Store the image path
    quantity: { type: Number, required: true },
    farmerName: { type: String, required: true },
    category: { type: String, required: true }
});

// Product Model
const Product = mongoose.model('Product', productSchema);

// Route to Add Product
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const newProduct = new Product({
            cropName: req.body.cropName,
            description: req.body.description,
            pricePerKg: req.body.pricePerKg,
            image: req.file.path, // Save the image path
            quantity: req.body.quantity,
            farmerName: req.body.farmerName,
            category: req.body.category
        });
        
        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
        console.error('Error saving product:', error);
        res.status(500).json({ error: 'An error occurred while saving the product.' });
    }
});

// Route to Get All Products
router.get('/all', async (req, res) => {
    console.log("Fetching all products");
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: 'Failed to fetch products', details: error.message });
    }
});

// Route to Update Product
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            cropName: req.body.cropName,
            description: req.body.description,
            pricePerKg: req.body.pricePerKg,
            quantity: req.body.quantity,
            farmerName: req.body.farmerName,
            category: req.body.category,
            ...(req.file && { image: req.file.path }) // Update image if provided
        }, { new: true }); // Return the updated product
        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'An error occurred while updating the product.' });
    }
});

// Route to Delete Product
router.delete('/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'An error occurred while deleting the product.' });
    }
});

module.exports = router;
