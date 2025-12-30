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
    const [dragActive, setDragActive] = useState(false);

    const categories = [
        { value: 'seeds', label: 'Seeds', icon: '🌱' },
        { value: 'pulses', label: 'Pulses', icon: '🫘' },
        { value: 'fruits', label: 'Fruits', icon: '🍎' },
        { value: 'vegetables', label: 'Vegetables', icon: '🥬' },
        { value: 'herbs_spices', label: 'Herbs & Spices', icon: '🌿' },
    ];

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

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.type.startsWith('image/')) {
                setFormData({ ...formData, image: file });
                setImagePreview(URL.createObjectURL(file));
            }
        }
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

                if (onProductCreated && newProduct) {
                    onProductCreated(newProduct);
                }

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
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transform hover:-translate-y-0.5 transition-all duration-300"
                onClick={() => setShowModal(true)}
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Add Product
            </button>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div
                        className="absolute inset-0"
                        onClick={handleClose}
                    ></div>
                    <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-800 border border-slate-700/50 shadow-2xl">
                        {/* Modal Header */}
                        <div className="sticky top-0 z-10 px-6 py-4 bg-slate-800/95 backdrop-blur-xl border-b border-slate-700/50 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-white">Add New Product</h2>
                                <p className="text-sm text-gray-400">Fill in the details below</p>
                            </div>
                            <button
                                onClick={handleClose}
                                className="p-2 rounded-xl bg-slate-700/50 text-gray-400 hover:text-white hover:bg-slate-700 transition-all duration-300"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Success Message */}
                        {success && (
                            <div className="mx-6 mt-4 p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium text-green-400">Product Added!</p>
                                    <p className="text-sm text-green-400/70">Your product has been created successfully.</p>
                                </div>
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className="mx-6 mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium text-red-400">Error</p>
                                    <p className="text-sm text-red-400/70">{error}</p>
                                </div>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Product Image</label>
                                <div
                                    className={`relative border-2 border-dashed rounded-2xl transition-all duration-300 ${
                                        dragActive
                                            ? 'border-green-500 bg-green-500/10'
                                            : imagePreview
                                            ? 'border-green-500/50 bg-green-500/5'
                                            : 'border-slate-600 hover:border-slate-500'
                                    }`}
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                >
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={handleChange}
                                        className="hidden"
                                        id="image-upload"
                                        accept="image/*"
                                        required={!imagePreview}
                                    />
                                    <label
                                        htmlFor="image-upload"
                                        className="flex flex-col items-center justify-center w-full h-48 cursor-pointer"
                                    >
                                        {imagePreview ? (
                                            <div className="relative w-full h-full">
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="h-full w-full object-cover rounded-xl"
                                                />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                                                    <span className="text-white text-sm font-medium">Click to change</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center p-6">
                                                <div className="w-16 h-16 rounded-2xl bg-slate-700/50 flex items-center justify-center mx-auto mb-4">
                                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <p className="text-gray-300 font-medium mb-1">Drop image here or click to upload</p>
                                                <p className="text-gray-500 text-sm">PNG, JPG up to 5MB</p>
                                            </div>
                                        )}
                                    </label>
                                </div>
                            </div>

                            {/* Crop Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Product Name</label>
                                <input
                                    type="text"
                                    name="cropName"
                                    value={formData.cropName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                                    placeholder="e.g., Fresh Tomatoes"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 resize-none"
                                    placeholder="Describe your product..."
                                    rows="3"
                                    required
                                ></textarea>
                            </div>

                            {/* Price and Quantity Row */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Price (₹/kg)</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">₹</span>
                                        <input
                                            type="number"
                                            name="pricePerKg"
                                            value={formData.pricePerKg}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                                            placeholder="0.00"
                                            min="0"
                                            step="0.01"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Quantity (kg)</label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                                        placeholder="0"
                                        min="0"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.value}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, category: cat.value })}
                                            className={`p-3 rounded-xl border text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                                                formData.category === cat.value
                                                    ? 'bg-green-500/20 border-green-500/50 text-green-400'
                                                    : 'bg-slate-900/50 border-slate-700 text-gray-400 hover:border-slate-600 hover:text-white'
                                            }`}
                                        >
                                            <span>{cat.icon}</span>
                                            <span>{cat.label}</span>
                                        </button>
                                    ))}
                                </div>
                                <input
                                    type="hidden"
                                    name="category"
                                    value={formData.category}
                                    required
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="flex-1 py-3 px-6 rounded-xl bg-slate-700/50 text-gray-300 border border-slate-600 hover:bg-slate-700 transition-all duration-300 font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading || success || !formData.category}
                                    className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
