import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { API_ENDPOINTS } from '../config/api';

const Create = ({ onProductCreated }) => {
    const { getAuthHeaders } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        cropName: '',
        description: '',
        pricePerKg: '',
        image: null,
        quantity: '',
        category: '',
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        if (name === 'image') {
            const file = files[0];
            if (file) {
                setFormData({ ...formData, image: file });
                setImagePreview(URL.createObjectURL(file));
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
        if (error) setError(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        const data = new FormData();
        for (const key in formData) {
            if (formData[key] !== null) {
                data.append(key, formData[key]);
            }
        }

        try {
            const response = await axios.post(API_ENDPOINTS.PRODUCTS.CREATE, data, {
                headers: {
                    ...getAuthHeaders(),
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                setSuccess(true);
                const newProduct = response.data.data?.product || response.data.product;

                // Notify parent component
                if (onProductCreated && newProduct) {
                    onProductCreated(newProduct);
                }

                // Reset form after short delay
                setTimeout(() => {
                    setShowModal(false);
                    setFormData({
                        cropName: '',
                        description: '',
                        pricePerKg: '',
                        image: null,
                        quantity: '',
                        category: '',
                    });
                    setImagePreview(null);
                    setSuccess(false);
                }, 1500);
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Error creating product';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setShowModal(false);
        setError(null);
        setFormData({
            cropName: '',
            description: '',
            pricePerKg: '',
            image: null,
            quantity: '',
            category: '',
        });
        setImagePreview(null);
    };

    return (
        <>
            <button
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                onClick={() => setShowModal(true)}
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Add Product
            </button>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto animate-scale-in">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">Add New Product</h2>
                            <button
                                onClick={handleClose}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Success Message */}
                        {success && (
                            <div className="mx-6 mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 animate-fade-in">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium text-green-800">Product Added!</p>
                                    <p className="text-sm text-green-600">Your product has been created successfully.</p>
                                </div>
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className="mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 animate-fade-in">
                                <p className="font-medium">Error</p>
                                <p className="text-sm">{error}</p>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                                <div className="relative">
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={handleChange}
                                        className="hidden"
                                        id="image-upload"
                                        accept="image/*"
                                        required
                                    />
                                    <label
                                        htmlFor="image-upload"
                                        className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-green-500 transition-colors bg-gray-50 hover:bg-gray-100"
                                    >
                                        {imagePreview ? (
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="h-full w-full object-cover rounded-xl"
                                            />
                                        ) : (
                                            <div className="text-center">
                                                <svg className="w-10 h-10 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <p className="text-sm text-gray-500">Click to upload image</p>
                                                <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                                            </div>
                                        )}
                                    </label>
                                </div>
                            </div>

                            {/* Crop Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                                <input
                                    type="text"
                                    name="cropName"
                                    value={formData.cropName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                    placeholder="e.g., Fresh Tomatoes"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
                                    placeholder="Describe your product..."
                                    rows="3"
                                    required
                                ></textarea>
                            </div>

                            {/* Price and Quantity Row */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹/kg)</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                                        <input
                                            type="number"
                                            name="pricePerKg"
                                            value={formData.pricePerKg}
                                            onChange={handleChange}
                                            className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                            placeholder="0.00"
                                            min="0"
                                            step="0.01"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Quantity (kg)</label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                        placeholder="0"
                                        min="0"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white"
                                    required
                                >
                                    <option value="">Select a category</option>
                                    <option value="seeds">Seeds</option>
                                    <option value="pulses">Pulses</option>
                                    <option value="fruits">Fruits</option>
                                    <option value="vegetables">Vegetables</option>
                                    <option value="herbs_spices">Herbs & Spices</option>
                                </select>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="flex-1 py-3 px-4 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading || success}
                                    className="flex-1 py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Creating...
                                        </>
                                    ) : success ? (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            Created!
                                        </>
                                    ) : (
                                        'Create Product'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Create;
