import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navbar } from './Navbar';
import Footer from './Footer';

const Profile = () => {
    const navigate = useNavigate();
    const { user, isFarmer, logout, loading } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <p className="text-gray-600 mb-4">Please log in to view your profile.</p>
                    <Link to="/login" className="btn bg-green-600 text-white hover:bg-green-700">
                        Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="pt-24 pb-12 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Profile Header */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="h-32 bg-gradient-to-r from-green-600 to-green-700"></div>
                        <div className="relative px-6 pb-6">
                            <div className="flex flex-col sm:flex-row sm:items-end -mt-16">
                                <div className="w-32 h-32 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center">
                                    <span className="text-5xl font-bold text-green-600">
                                        {user.username?.charAt(0)?.toUpperCase() || 'U'}
                                    </span>
                                </div>
                                <div className="mt-4 sm:mt-0 sm:ml-6 sm:mb-2">
                                    <h1 className="text-2xl font-bold text-gray-900">{user.username}</h1>
                                    <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${
                                        isFarmer
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-blue-100 text-blue-800'
                                    }`}>
                                        {isFarmer ? 'Farmer' : 'Customer'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="mt-6 bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Full Name</label>
                                <p className="mt-1 text-lg text-gray-900">{user.username}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Email Address</label>
                                <p className="mt-1 text-lg text-gray-900">{user.email}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Phone Number</label>
                                <p className="mt-1 text-lg text-gray-900">{user.phone || 'Not provided'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Account Type</label>
                                <p className="mt-1 text-lg text-gray-900">{isFarmer ? 'Farmer Account' : 'Customer Account'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-6 bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {isFarmer ? (
                                <>
                                    <Link
                                        to="/ecommerce"
                                        className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition"
                                    >
                                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                        </svg>
                                        <div className="ml-4">
                                            <p className="font-medium text-gray-900">My Products</p>
                                            <p className="text-sm text-gray-500">Manage your listings</p>
                                        </div>
                                    </Link>
                                    <Link
                                        to="/predictDisease"
                                        className="flex items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition"
                                    >
                                        <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                        <div className="ml-4">
                                            <p className="font-medium text-gray-900">Disease Detection</p>
                                            <p className="text-sm text-gray-500">Check crop health</p>
                                        </div>
                                    </Link>
                                    <Link
                                        to="/yield"
                                        className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                                    >
                                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                        <div className="ml-4">
                                            <p className="font-medium text-gray-900">Yield Prediction</p>
                                            <p className="text-sm text-gray-500">Get crop recommendations</p>
                                        </div>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/consumer"
                                        className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition"
                                    >
                                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <div className="ml-4">
                                            <p className="font-medium text-gray-900">Browse Store</p>
                                            <p className="text-sm text-gray-500">Shop fresh produce</p>
                                        </div>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Logout Section */}
                    <div className="mt-6 bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Actions</h2>
                        <button
                            onClick={handleLogout}
                            className="flex items-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Profile;
