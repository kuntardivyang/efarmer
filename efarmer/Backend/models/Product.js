const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    cropName: {
        type: String,
        required: [true, 'Crop name is required'],
        trim: true,
        minlength: [2, 'Crop name must be at least 2 characters'],
        maxlength: [100, 'Crop name cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        minlength: [10, 'Description must be at least 10 characters'],
        maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    pricePerKg: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0.01, 'Price must be greater than 0']
    },
    image: {
        type: String,
        required: [true, 'Product image is required']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [0, 'Quantity cannot be negative']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: {
            values: ['vegetables', 'fruits', 'grains', 'dairy', 'other'],
            message: 'Invalid category'
        }
    },
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    farmerName: {
        type: String,
        required: [true, 'Farmer name is required']
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Indexes for common queries
productSchema.index({ category: 1 });
productSchema.index({ farmer: 1 });
productSchema.index({ isAvailable: 1, isDeleted: 1 });
productSchema.index({ cropName: 'text', description: 'text' }); // Text search

// Don't return deleted products by default
productSchema.pre(/^find/, function(next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

module.exports = mongoose.model('Product', productSchema);
