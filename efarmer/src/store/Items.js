import React, { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '../config/api';

const Items = ({ selectedCategory }) => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addedToCart, setAddedToCart] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch(API_ENDPOINTS.PRODUCTS.ALL);
                const data = await response.json();

                // Handle both old and new API response formats
                const productsData = data?.data?.products || data?.products || data || [];
                setProducts(Array.isArray(productsData) ? productsData : []);

                // Load existing cart from local storage
                const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
                setCart(storedCart);
            } catch (error) {
                console.error('Error fetching products:', error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Function to add an item to the cart
    const addToCart = (product) => {
        const existingItem = cart.find(item => item._id === product._id);
        let newCart;

        if (existingItem) {
            newCart = cart.map(item =>
                item._id === product._id
                    ? { ...item, quantity: (item.quantity || 1) + 1 }
                    : item
            );
        } else {
            newCart = [...cart, { ...product, quantity: 1 }];
        }

        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));

        // Show added animation
        setAddedToCart(product._id);
        setTimeout(() => setAddedToCart(null), 1500);
    };

    // Filter products based on the selected category
    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter((product) => product.category === selectedCategory);

    if (loading) {
        return (
            <div className="mt-20 px-5 py-24">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
                                <div className="h-48 bg-gray-200"></div>
                                <div className="p-4">
                                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-20 bg-gray-50 min-h-screen">
            <section className="py-12">
                <div className="container px-5 mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-12 animate-fade-in">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            {selectedCategory === 'all' ? 'All Products' : selectedCategory.replace('_', ' ').charAt(0).toUpperCase() + selectedCategory.replace('_', ' ').slice(1)}
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Fresh from the farm to your table. Browse our selection of quality produce.
                        </p>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product, index) => (
                                <div
                                    key={product._id}
                                    className="group bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    {/* Product Image */}
                                    <div className="relative h-52 overflow-hidden">
                                        <img
                                            alt={product.cropName}
                                            className="object-cover object-center w-full h-full transition-transform duration-700 group-hover:scale-110"
                                            src={API_ENDPOINTS.UPLOADS(product.image)}
                                            onError={(e) => {
                                                e.target.src = 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400';
                                            }}
                                        />
                                        {/* Category Badge */}
                                        <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-700 capitalize shadow-sm">
                                            {product.category?.replace('_', ' ')}
                                        </span>
                                        {/* Overlay on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-5">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                                                {product.cropName}
                                            </h3>
                                        </div>

                                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                                            {product.description || 'Fresh and organic produce from local farmers.'}
                                        </p>

                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <span className="text-2xl font-bold text-green-600">₹{product.pricePerKg}</span>
                                                <span className="text-gray-500 text-sm">/kg</span>
                                            </div>
                                            <span className="text-sm text-gray-400">
                                                {product.quantity} kg available
                                            </span>
                                        </div>

                                        {/* Add to Cart Button */}
                                        <button
                                            onClick={() => addToCart(product)}
                                            disabled={addedToCart === product._id}
                                            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 transform flex items-center justify-center gap-2 ${
                                                addedToCart === product._id
                                                    ? 'bg-green-500 text-white scale-95'
                                                    : 'bg-green-600 text-white hover:bg-green-700 hover:scale-[1.02] active:scale-95'
                                            }`}
                                        >
                                            {addedToCart === product._id ? (
                                                <>
                                                    <svg className="w-5 h-5 animate-scale-in" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    Added!
                                                </>
                                            ) : (
                                                <>
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                    Add to Cart
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-16 animate-fade-in">
                                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
                                <p className="text-gray-500">Try selecting a different category or check back later.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Items;
