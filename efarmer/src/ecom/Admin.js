import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar } from '../base/Navbar';
import Footer from '../base/Footer';
import Create from './Create';
import EditProduct from './EditProduct';
import { useAuth } from '../context/AuthContext';
import { API_ENDPOINTS } from '../config/api';

const Admin = () => {
    const { getAuthHeaders } = useAuth();
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_ENDPOINTS.PRODUCTS.MY_PRODUCTS, {
                headers: getAuthHeaders()
            });

            // Handle both old and new API response formats
            const productsData = response.data?.data?.products || response.data?.products || response.data || [];
            setProducts(Array.isArray(productsData) ? productsData : []);
            setError(null);
        } catch (error) {
            console.error("Error fetching products:", error);
            setError('Failed to load products. Please try again.');
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setShowEditModal(true);
    };

    const handleUpdateProduct = (updatedProduct) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product._id === updatedProduct._id ? updatedProduct : product
            )
        );
        setShowEditModal(false);
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(API_ENDPOINTS.PRODUCTS.DELETE(id), {
                headers: getAuthHeaders()
            });
            setProducts(products.filter((product) => product._id !== id));
            setDeleteConfirm(null);
        } catch (error) {
            console.error('Error deleting product:', error);
            setError('Failed to delete product. Please try again.');
        }
    };

    const handleProductCreated = (newProduct) => {
        setProducts([newProduct, ...products]);
    };

    // Filtered products based on search term and selected category
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.cropName?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <div className="flex-grow container mx-auto px-4 py-8 mt-16">
                {/* Header */}
                <div className="mb-8 animate-fade-in">
                    <h1 className="text-3xl font-bold text-gray-900">My Products</h1>
                    <p className="text-gray-600 mt-2">Manage your product listings</p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 animate-fade-in">
                        {error}
                        <button
                            onClick={() => setError(null)}
                            className="ml-4 text-red-500 hover:text-red-700"
                        >
                            Dismiss
                        </button>
                    </div>
                )}

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-center">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-500">Total Products</p>
                                <p className="text-2xl font-bold text-gray-900">{products.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-center">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-500">Categories</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {new Set(products.map(p => p.category)).size}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-center">
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-500">Total Quantity</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {products.reduce((sum, p) => sum + (p.quantity || 0), 0)} kg
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Bar */}
                <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100 animate-fade-in">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full md:w-1/3">
                            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-4 w-full md:w-auto">
                            <select
                                className="flex-1 md:w-48 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="all">All Categories</option>
                                <option value="seeds">Seeds</option>
                                <option value="pulses">Pulses</option>
                                <option value="fruits">Fruits</option>
                                <option value="vegetables">Vegetables</option>
                                <option value="herbs_spices">Herbs & Spices</option>
                            </select>
                            <Create onProductCreated={handleProductCreated} />
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((product, index) => (
                            <div
                                key={product._id}
                                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={API_ENDPOINTS.UPLOADS(product.image)}
                                        alt={product.cropName}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                                        }}
                                    />
                                    <span className="absolute top-2 right-2 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 capitalize">
                                        {product.category?.replace('_', ' ')}
                                    </span>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg text-gray-900 truncate">{product.cropName}</h3>
                                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">{product.description}</p>
                                    <div className="flex items-center justify-between mt-4">
                                        <span className="text-lg font-bold text-green-600">₹{product.pricePerKg}/kg</span>
                                        <span className="text-sm text-gray-500">{product.quantity} kg</span>
                                    </div>
                                    <div className="flex gap-2 mt-4">
                                        <button
                                            onClick={() => handleEditClick(product)}
                                            className="flex-1 py-2 px-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 font-medium text-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => setDeleteConfirm(product._id)}
                                            className="flex-1 py-2 px-4 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200 font-medium text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 animate-fade-in">
                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <h3 className="text-xl font-medium text-gray-600">No products found</h3>
                        <p className="text-gray-400 mt-2">Start by adding your first product</p>
                    </div>
                )}
            </div>

            <Footer />

            {/* Edit Modal */}
            {showEditModal && selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto animate-scale-in">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900">Edit Product</h2>
                                <button
                                    onClick={() => setShowEditModal(false)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <EditProduct
                                product={selectedProduct}
                                onClose={() => setShowEditModal(false)}
                                onUpdate={handleUpdateProduct}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6 animate-scale-in">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Product?</h3>
                            <p className="text-gray-500 mb-6">This action cannot be undone.</p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setDeleteConfirm(null)}
                                    className="flex-1 py-2 px-4 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleDeleteClick(deleteConfirm)}
                                    className="flex-1 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
