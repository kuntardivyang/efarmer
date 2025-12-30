import axios from 'axios';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { API_ENDPOINTS } from '../config/api';

const EditProduct = ({ product, onClose, onUpdate }) => {
    const { getAuthHeaders } = useAuth();
    const [formData, setFormData] = useState({ ...product });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const categories = [
        { value: 'seeds', label: 'Seeds', icon: '🌱' },
        { value: 'pulses', label: 'Pulses', icon: '🫘' },
        { value: 'fruits', label: 'Fruits', icon: '🍎' },
        { value: 'vegetables', label: 'Vegetables', icon: '🥬' },
        { value: 'herbs_spices', label: 'Herbs & Spices', icon: '🌿' },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        if (error) setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.put(
                API_ENDPOINTS.PRODUCTS.UPDATE(product._id),
                formData,
                { headers: getAuthHeaders() }
            );
            const updatedProduct = response.data?.data?.product || response.data?.product || response.data;
            onUpdate(updatedProduct);
            onClose();
        } catch (error) {
            console.error('Error updating product:', error);
            setError(error.response?.data?.message || 'Failed to update product. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Message */}
            {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <p className="text-red-400 text-sm">{error}</p>
                </div>
            )}

            {/* Product Name */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    Product Name
                </label>
                <input
                    type="text"
                    name="cropName"
                    value={formData.cropName || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                    placeholder="e.g., Fresh Tomatoes"
                    required
                />
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                </label>
                <textarea
                    name="description"
                    value={formData.description || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 resize-none"
                    placeholder="Describe your product..."
                    rows="3"
                ></textarea>
            </div>

            {/* Price and Quantity Row */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Price (₹/kg)
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">₹</span>
                        <input
                            type="number"
                            name="pricePerKg"
                            value={formData.pricePerKg || ''}
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
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Quantity (kg)
                    </label>
                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                        placeholder="0"
                        min="0"
                    />
                </div>
            </div>

            {/* Category */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                </label>
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
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-3 px-6 rounded-xl bg-slate-700/50 text-gray-300 border border-slate-600 hover:bg-slate-700 transition-all duration-300 font-medium"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Updating...
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Update Product
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default EditProduct;
