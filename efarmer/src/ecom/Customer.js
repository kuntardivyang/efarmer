import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Navbar } from '../base/Navbar';
import Footer from '../base/Footer';
import { API_ENDPOINTS } from '../config/api';

const categories = [
    { id: 'all', label: 'All Products', icon: '🌾' },
    { id: 'seeds', label: 'Seeds', icon: '🌱' },
    { id: 'pulses', label: 'Pulses', icon: '🫘' },
    { id: 'fruits', label: 'Fruits', icon: '🍎' },
    { id: 'vegetables', label: 'Vegetables', icon: '🥬' },
    { id: 'herbs_spices', label: 'Herbs & Spices', icon: '🌿' },
];

const Customer = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('newest');
    const [selectedProduct, setSelectedProduct] = useState(null);

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_ENDPOINTS.PRODUCTS.ALL);
            const productsData = response.data?.data?.products || response.data?.products || response.data || [];
            setProducts(Array.isArray(productsData) ? productsData : []);
            setError(null);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError('Failed to load products. Please try again.');
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const filteredProducts = products
        .filter(product => {
            const matchesSearch = product.cropName?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'price_low':
                    return (a.pricePerKg || 0) - (b.pricePerKg || 0);
                case 'price_high':
                    return (b.pricePerKg || 0) - (a.pricePerKg || 0);
                case 'name':
                    return (a.cropName || '').localeCompare(b.cropName || '');
                default:
                    return 0;
            }
        });

    return (
        <div className="min-h-screen bg-slate-900">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/30 via-slate-900 to-slate-900"></div>
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-float"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-float-slow"></div>
                </div>

                <div className="relative container mx-auto px-6">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-6">
                            Fresh from Farms
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Farm Fresh
                            <span className="block mt-2 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                                Marketplace
                            </span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Buy directly from farmers. Fresh produce, fair prices, no middlemen.
                        </p>
                    </div>

                    {/* Search & Filters */}
                    <div className="max-w-4xl mx-auto">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur-lg opacity-20"></div>
                            <div className="relative p-6 rounded-2xl bg-slate-800/80 backdrop-blur-xl border border-slate-700/50">
                                <div className="flex flex-col md:flex-row gap-4">
                                    {/* Search */}
                                    <div className="flex-1 relative">
                                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        <input
                                            type="text"
                                            placeholder="Search products..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-900/50 border border-slate-600/50 text-white placeholder-gray-500 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all"
                                        />
                                    </div>

                                    {/* Sort */}
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="px-4 py-3.5 rounded-xl bg-slate-900/50 border border-slate-600/50 text-white focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all"
                                    >
                                        <option value="newest">Newest First</option>
                                        <option value="price_low">Price: Low to High</option>
                                        <option value="price_high">Price: High to Low</option>
                                        <option value="name">Name: A-Z</option>
                                    </select>
                                </div>

                                {/* Categories */}
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setSelectedCategory(cat.id)}
                                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                                                selectedCategory === cat.id
                                                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
                                                    : 'bg-slate-900/50 text-gray-300 hover:bg-slate-700/50'
                                            }`}
                                        >
                                            <span>{cat.icon}</span>
                                            {cat.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section className="py-12">
                <div className="container mx-auto px-6">
                    {/* Stats */}
                    <div className="flex items-center justify-between mb-8">
                        <p className="text-gray-400">
                            Showing <span className="text-white font-medium">{filteredProducts.length}</span> products
                        </p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3">
                            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-red-400">{error}</p>
                            <button onClick={fetchProducts} className="ml-auto text-red-400 hover:text-red-300">
                                Retry
                            </button>
                        </div>
                    )}

                    {/* Loading */}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="rounded-2xl bg-slate-800/50 border border-slate-700/50 overflow-hidden animate-pulse">
                                    <div className="h-56 bg-slate-700/50"></div>
                                    <div className="p-6">
                                        <div className="h-6 bg-slate-700/50 rounded mb-3"></div>
                                        <div className="h-4 bg-slate-700/50 rounded w-2/3 mb-4"></div>
                                        <div className="h-8 bg-slate-700/50 rounded"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts.map((product, index) => (
                                <div
                                    key={product._id}
                                    className="group relative rounded-2xl bg-slate-800/50 border border-slate-700/50 overflow-hidden hover:border-green-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-green-500/10"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    {/* Image */}
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={API_ENDPOINTS.UPLOADS(product.image)}
                                            alt={product.cropName}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            onError={(e) => {
                                                e.target.src = 'https://images.unsplash.com/photo-1518843875459-f738682238a6?w=400';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>

                                        {/* Category Badge */}
                                        <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-medium capitalize">
                                            {product.category?.replace('_', ' ')}
                                        </span>

                                        {/* Quantity Badge */}
                                        <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-green-500/20 backdrop-blur-md text-green-400 text-xs font-medium">
                                            {product.quantity} kg available
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h3 className="text-lg font-semibold text-white mb-2 truncate">
                                            {product.cropName}
                                        </h3>
                                        <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                                            {product.description || 'Fresh from the farm'}
                                        </p>

                                        {/* Farmer Info */}
                                        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-700/50">
                                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-sm font-bold">
                                                {product.farmer?.username?.charAt(0)?.toUpperCase() || 'F'}
                                            </div>
                                            <div>
                                                <p className="text-sm text-white">{product.farmer?.username || 'Local Farmer'}</p>
                                                <p className="text-xs text-gray-500">{product.farmer?.location || 'India'}</p>
                                            </div>
                                        </div>

                                        {/* Price & Action */}
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="text-2xl font-bold text-white">₹{product.pricePerKg}</span>
                                                <span className="text-gray-400 text-sm">/kg</span>
                                            </div>
                                            <button
                                                onClick={() => setSelectedProduct(product)}
                                                className="px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-green-500/25 transition-all"
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-6">
                                <span className="text-4xl">🔍</span>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
                            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Product Detail Modal */}
            {selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-800 border border-slate-700/50 shadow-2xl">
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedProduct(null)}
                            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-xl bg-slate-900/80 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Image */}
                        <div className="relative h-72">
                            <img
                                src={API_ENDPOINTS.UPLOADS(selectedProduct.image)}
                                alt={selectedProduct.cropName}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1518843875459-f738682238a6?w=800';
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-800 via-transparent to-transparent"></div>
                        </div>

                        {/* Content */}
                        <div className="p-8 -mt-16 relative">
                            <span className="inline-block px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium capitalize mb-4">
                                {selectedProduct.category?.replace('_', ' ')}
                            </span>

                            <h2 className="text-3xl font-bold text-white mb-4">{selectedProduct.cropName}</h2>

                            <p className="text-gray-400 mb-6">
                                {selectedProduct.description || 'Fresh produce directly from the farm. Quality guaranteed.'}
                            </p>

                            {/* Details Grid */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="p-4 rounded-xl bg-slate-900/50">
                                    <p className="text-gray-400 text-sm">Price</p>
                                    <p className="text-2xl font-bold text-white">₹{selectedProduct.pricePerKg}<span className="text-gray-400 text-sm">/kg</span></p>
                                </div>
                                <div className="p-4 rounded-xl bg-slate-900/50">
                                    <p className="text-gray-400 text-sm">Available</p>
                                    <p className="text-2xl font-bold text-white">{selectedProduct.quantity}<span className="text-gray-400 text-sm"> kg</span></p>
                                </div>
                            </div>

                            {/* Farmer Card */}
                            <div className="p-4 rounded-xl bg-slate-900/50 mb-6 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-xl font-bold">
                                    {selectedProduct.farmer?.username?.charAt(0)?.toUpperCase() || 'F'}
                                </div>
                                <div>
                                    <p className="text-white font-medium">{selectedProduct.farmer?.username || 'Local Farmer'}</p>
                                    <p className="text-gray-400 text-sm">Verified Seller</p>
                                </div>
                                <div className="ml-auto">
                                    <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm hover:bg-white/10 transition-colors">
                                        Contact
                                    </button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4">
                                <button className="flex-1 py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    Add to Cart
                                </button>
                                <button className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Customer;
