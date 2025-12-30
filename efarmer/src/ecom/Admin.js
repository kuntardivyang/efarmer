import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar } from '../base/Navbar';
import Footer from '../base/Footer';
import Create from './Create';
import EditProduct from './EditProduct';
import { useAuth } from '../context/AuthContext';
import { API_ENDPOINTS } from '../config/api';

const Admin = () => {
    const { getAuthHeaders, user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [error, setError] = useState(null);

    const categories = [
        { id: 'all', label: 'All Products', icon: '🌾' },
        { id: 'seeds', label: 'Seeds', icon: '🌱' },
        { id: 'pulses', label: 'Pulses', icon: '🫘' },
        { id: 'fruits', label: 'Fruits', icon: '🍎' },
        { id: 'vegetables', label: 'Vegetables', icon: '🥬' },
        { id: 'herbs_spices', label: 'Herbs & Spices', icon: '🌿' },
    ];

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_ENDPOINTS.PRODUCTS.MY_PRODUCTS, {
                headers: getAuthHeaders()
            });

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

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.cropName?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const stats = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            ),
            label: 'Total Products',
            value: products.length,
            color: 'from-green-500 to-emerald-600',
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
            ),
            label: 'Categories',
            value: new Set(products.map(p => p.category)).size,
            color: 'from-blue-500 to-cyan-600',
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
            ),
            label: 'Total Stock',
            value: `${products.reduce((sum, p) => sum + (p.quantity || 0), 0)} kg`,
            color: 'from-purple-500 to-pink-600',
        },
    ];

    return (
        <div className="min-h-screen bg-slate-900">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-12 overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/30 via-slate-900 to-slate-900"></div>
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-float"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-float-slow"></div>
                </div>

                <div className="relative container mx-auto px-6">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium">
                                    <span>🌾</span>
                                    Farmer Dashboard
                                </span>
                            </div>
                            <h1 className="text-4xl font-bold text-white mb-2">My Products</h1>
                            <p className="text-gray-400">Welcome back, {user?.username || 'Farmer'}! Manage your product listings.</p>
                        </div>
                        <Create onProductCreated={handleProductCreated} />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <p className="text-red-400">{error}</p>
                            </div>
                            <button
                                onClick={() => setError(null)}
                                className="text-red-400 hover:text-red-300 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    )}

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {stats.map((stat, index) => (
                            <div key={stat.label} className="group relative">
                                <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.color} rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity`}></div>
                                <div className="relative p-6 rounded-2xl bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg`}>
                                            {stat.icon}
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-400">{stat.label}</p>
                                            <p className="text-3xl font-bold text-white">{stat.value}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Search and Filter */}
                    <div className="relative mb-8">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur"></div>
                        <div className="relative p-6 rounded-2xl bg-slate-800/80 backdrop-blur-xl border border-slate-700/50">
                            <div className="flex flex-col lg:flex-row gap-4">
                                {/* Search Input */}
                                <div className="relative flex-1">
                                    <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Search your products..."
                                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                                    />
                                </div>

                                {/* Category Filter */}
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setSelectedCategory(cat.id)}
                                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                                                selectedCategory === cat.id
                                                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25'
                                                    : 'bg-slate-900/50 text-gray-400 border border-slate-700 hover:border-green-500/30 hover:text-white'
                                            }`}
                                        >
                                            <span>{cat.icon}</span>
                                            <span className="hidden sm:inline">{cat.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="rounded-2xl bg-slate-800/50 border border-slate-700/50 overflow-hidden animate-pulse">
                                    <div className="h-48 bg-slate-700/50"></div>
                                    <div className="p-5">
                                        <div className="h-5 bg-slate-700/50 rounded-lg w-3/4 mb-3"></div>
                                        <div className="h-4 bg-slate-700/50 rounded-lg w-full mb-2"></div>
                                        <div className="h-4 bg-slate-700/50 rounded-lg w-2/3 mb-4"></div>
                                        <div className="flex gap-2">
                                            <div className="h-10 bg-slate-700/50 rounded-lg flex-1"></div>
                                            <div className="h-10 bg-slate-700/50 rounded-lg flex-1"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts.map((product, index) => (
                                <div
                                    key={product._id}
                                    className="group relative rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 overflow-hidden hover:border-green-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/10"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    {/* Product Image */}
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={API_ENDPOINTS.UPLOADS(product.image)}
                                            alt={product.cropName}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>

                                        {/* Category Badge */}
                                        <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-sm text-xs font-medium text-white border border-slate-700/50 capitalize">
                                            {categories.find(c => c.id === product.category)?.icon} {product.category?.replace('_', ' ')}
                                        </span>

                                        {/* Stock Badge */}
                                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-green-500/20 backdrop-blur-sm text-xs font-medium text-green-400 border border-green-500/30">
                                            {product.quantity} kg in stock
                                        </span>
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-5">
                                        <h3 className="font-semibold text-lg text-white mb-2 group-hover:text-green-400 transition-colors truncate">
                                            {product.cropName}
                                        </h3>
                                        <p className="text-gray-400 text-sm line-clamp-2 mb-4">{product.description}</p>

                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-2xl font-bold text-green-400">₹{product.pricePerKg}</span>
                                            <span className="text-sm text-gray-500">per kg</span>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEditClick(product)}
                                                className="flex-1 py-2.5 px-4 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-all duration-300 font-medium text-sm flex items-center justify-center gap-2"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => setDeleteConfirm(product._id)}
                                                className="flex-1 py-2.5 px-4 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all duration-300 font-medium text-sm flex items-center justify-center gap-2"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                Delete
                                            </button>
                                        </div>
                                    </div>

                                    {/* Hover Glow */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-3xl blur-lg"></div>
                            <div className="relative text-center py-20 px-8 rounded-3xl bg-slate-800/50 backdrop-blur-xl border border-slate-700/50">
                                <div className="w-24 h-24 rounded-2xl bg-slate-700/50 flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">No Products Found</h3>
                                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                                    {searchTerm || selectedCategory !== 'all'
                                        ? 'No products match your search criteria. Try adjusting your filters.'
                                        : 'Start building your inventory by adding your first product.'}
                                </p>
                                {!searchTerm && selectedCategory === 'all' && (
                                    <Create onProductCreated={handleProductCreated} />
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <Footer />

            {/* Edit Modal */}
            {showEditModal && selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div
                        className="absolute inset-0"
                        onClick={() => setShowEditModal(false)}
                    ></div>
                    <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-800 border border-slate-700/50 shadow-2xl">
                        {/* Modal Header */}
                        <div className="sticky top-0 z-10 px-6 py-4 bg-slate-800/95 backdrop-blur-xl border-b border-slate-700/50 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-white">Edit Product</h2>
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="p-2 rounded-xl bg-slate-700/50 text-gray-400 hover:text-white hover:bg-slate-700 transition-all duration-300"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-6">
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div
                        className="absolute inset-0"
                        onClick={() => setDeleteConfirm(null)}
                    ></div>
                    <div className="relative w-full max-w-sm rounded-3xl bg-slate-800 border border-slate-700/50 shadow-2xl p-8">
                        <div className="text-center">
                            <div className="w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Delete Product?</h3>
                            <p className="text-gray-400 mb-8">This action cannot be undone. The product will be permanently removed.</p>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setDeleteConfirm(null)}
                                    className="flex-1 py-3 px-6 rounded-xl bg-slate-700/50 text-gray-300 border border-slate-600 hover:bg-slate-700 transition-all duration-300 font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleDeleteClick(deleteConfirm)}
                                    className="flex-1 py-3 px-6 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-all duration-300 font-medium shadow-lg shadow-red-500/25"
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
