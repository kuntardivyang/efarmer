import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const StoreNav = ({ setSelectedCategory }) => {
    const navigate = useNavigate();
    const { user, isAuthenticated, isFarmer, logout, loading } = useAuth();

    const handleNavigation = (category) => {
        setSelectedCategory(category);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Show minimal navbar while auth is loading
    if (loading) {
        return (
            <div className="fixed top-0 left-0 right-0 z-50">
                <div className="navbar shadow-md" style={{ backgroundColor: '#274135' }}>
                    <div className="navbar-start">
                        <Link to="/" className="btn btn-ghost text-xl text-green-600">eFarmer Store</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed top-0 left-0 right-0 z-50">
            <div className="navbar shadow-md" style={{ backgroundColor: '#274135' }}>
                {/* Mobile menu */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <button tabIndex={0} className="btn btn-ghost lg:hidden text-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </button>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
                        >
                            <li>
                                <button onClick={() => handleNavigation('all')} className="text-gray-700">All Products</button>
                            </li>
                            <li>
                                <button onClick={() => handleNavigation('seeds')} className="text-gray-700">Seeds</button>
                            </li>
                            <li>
                                <button onClick={() => handleNavigation('pulses')} className="text-gray-700">Pulses</button>
                            </li>
                            <li>
                                <button onClick={() => handleNavigation('fruits')} className="text-gray-700">Fruits</button>
                            </li>
                            <li>
                                <button onClick={() => handleNavigation('vegetables')} className="text-gray-700">Vegetables</button>
                            </li>
                            <li>
                                <button onClick={() => handleNavigation('herbs_spices')} className="text-gray-700">Herbs & Spices</button>
                            </li>
                            <li className="border-t mt-2 pt-2">
                                <Link to="/" className="text-gray-700">Back to Home</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex items-center">
                        <Link to="/" className="btn btn-ghost text-xl text-green-500 hover:text-green-400">
                            eFarmer
                        </Link>
                        <span className="text-gray-400 mx-2">|</span>
                        <span className="text-gray-200 text-sm">Store</span>
                    </div>
                </div>

                {/* Desktop category menu */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <button
                                onClick={() => handleNavigation('all')}
                                className="text-gray-200 hover:text-green-400 transition"
                            >
                                All
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleNavigation('seeds')}
                                className="text-gray-200 hover:text-green-400 transition"
                            >
                                Seeds
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleNavigation('pulses')}
                                className="text-gray-200 hover:text-green-400 transition"
                            >
                                Pulses
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleNavigation('fruits')}
                                className="text-gray-200 hover:text-green-400 transition"
                            >
                                Fruits
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleNavigation('vegetables')}
                                className="text-gray-200 hover:text-green-400 transition"
                            >
                                Vegetables
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleNavigation('herbs_spices')}
                                className="text-gray-200 hover:text-green-400 transition"
                            >
                                Herbs & Spices
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Auth section */}
                <div className="navbar-end">
                    <Link to="/" className="btn btn-ghost text-gray-200 hover:text-green-400 mr-2 hidden sm:flex">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Home
                    </Link>

                    {isAuthenticated ? (
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full bg-green-600 flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">
                                        {user?.username?.charAt(0)?.toUpperCase() || 'U'}
                                    </span>
                                </div>
                            </label>
                            <ul
                                tabIndex={0}
                                className="menu menu-compact dropdown-content mt-3 p-2 shadow-lg bg-white rounded-box w-52"
                            >
                                <li className="px-4 py-2 text-gray-500 text-sm border-b">
                                    <span className="font-medium text-gray-700">{user?.username}</span>
                                    <span className="text-xs">{isFarmer ? 'Farmer' : 'Customer'}</span>
                                </li>
                                <li>
                                    <Link to="/profile" className="text-gray-600 hover:text-green-600 transition">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Profile
                                    </Link>
                                </li>
                                {isFarmer && (
                                    <li>
                                        <Link to="/ecommerce" className="text-gray-600 hover:text-green-600 transition">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                            </svg>
                                            My Products
                                        </Link>
                                    </li>
                                )}
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="text-red-600 hover:bg-red-50 transition"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-2">
                            <Link
                                to="/login"
                                className="btn btn-ghost text-white hover:text-green-400 transition"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="btn bg-green-600 hover:bg-green-700 text-white border-none transition"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StoreNav;
