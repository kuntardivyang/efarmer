import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, isAuthenticated, isFarmer, logout, loading } = useAuth();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
        setProfileDropdownOpen(false);
    }, [location.pathname]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/yield', label: 'Crop Recommendation' },
        { path: '/predictDisease', label: 'Disease Detection' },
        ...(isAuthenticated && isFarmer ? [{ path: '/ecommerce', label: 'My Products' }] : []),
        { path: '/consumer', label: 'Store' },
        { path: '/about', label: 'About' },
    ];

    // Loading state
    if (loading) {
        return (
            <nav className="fixed top-0 left-0 right-0 z-50">
                <div className="h-20 bg-slate-900/80 backdrop-blur-xl border-b border-white/5">
                    <div className="container mx-auto px-6 h-full flex items-center justify-between">
                        <div className="text-2xl font-bold">
                            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">e</span>
                            <span className="text-white">Farmer</span>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled
                    ? 'bg-slate-900/95 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/10'
                    : 'bg-transparent'
            }`}>
                <div className="container mx-auto px-6">
                    <div className="h-20 flex items-center justify-between">
                        {/* Logo */}
                        <Link to="/" className="group flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20 group-hover:shadow-green-500/40 transition-shadow">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                            </div>
                            <span className="text-2xl font-bold">
                                <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">e</span>
                                <span className="text-white">Farmer</span>
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                                        isActive(link.path)
                                            ? 'text-green-400'
                                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    {link.label}
                                    {isActive(link.path) && (
                                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-green-400" />
                                    )}
                                </Link>
                            ))}
                        </div>

                        {/* Auth Section */}
                        <div className="hidden lg:flex items-center gap-4">
                            {isAuthenticated ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                        className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold shadow-lg shadow-green-500/20">
                                            {user?.username?.charAt(0)?.toUpperCase() || 'U'}
                                        </div>
                                        <div className="text-left">
                                            <div className="text-sm font-medium text-white">{user?.username}</div>
                                            <div className="text-xs text-gray-400">{isFarmer ? 'Farmer' : 'Customer'}</div>
                                        </div>
                                        <svg className={`w-4 h-4 text-gray-400 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {/* Dropdown */}
                                    {profileDropdownOpen && (
                                        <>
                                            <div className="fixed inset-0" onClick={() => setProfileDropdownOpen(false)} />
                                            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-800/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/30 overflow-hidden animate-fade-in-up">
                                                <div className="p-2">
                                                    <Link
                                                        to="/profile"
                                                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                        Profile
                                                    </Link>
                                                    {isFarmer && (
                                                        <Link
                                                            to="/ecommerce"
                                                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                            </svg>
                                                            My Products
                                                        </Link>
                                                    )}
                                                </div>
                                                <div className="border-t border-white/5 p-2">
                                                    <button
                                                        onClick={handleLogout}
                                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                        </svg>
                                                        Logout
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <Link
                                        to="/login"
                                        className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="px-5 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transform hover:-translate-y-0.5 transition-all duration-300"
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                        >
                            {mobileMenuOpen ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
                mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}>
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={() => setMobileMenuOpen(false)}
                />

                {/* Menu panel */}
                <div className={`absolute top-0 right-0 w-80 h-full bg-slate-900 border-l border-white/10 transform transition-transform duration-300 ${
                    mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                    <div className="p-6 pt-24">
                        {/* User info (if logged in) */}
                        {isAuthenticated && (
                            <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold">
                                        {user?.username?.charAt(0)?.toUpperCase() || 'U'}
                                    </div>
                                    <div>
                                        <div className="font-medium text-white">{user?.username}</div>
                                        <div className="text-sm text-gray-400">{isFarmer ? 'Farmer' : 'Customer'}</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navigation links */}
                        <nav className="space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`block px-4 py-3 rounded-xl font-medium transition-colors ${
                                        isActive(link.path)
                                            ? 'bg-green-500/10 text-green-400'
                                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Auth buttons */}
                        <div className="mt-8 pt-6 border-t border-white/10">
                            {isAuthenticated ? (
                                <div className="space-y-2">
                                    <Link
                                        to="/profile"
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <Link
                                        to="/login"
                                        className="block w-full text-center px-4 py-3 rounded-xl font-medium text-gray-300 bg-white/5 hover:bg-white/10 transition-colors"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="block w-full text-center px-4 py-3 rounded-xl font-medium bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
