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
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center animate-pulse">
                        <svg className="w-8 h-8 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                    </div>
                    <p className="text-gray-400">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
                <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Not Logged In</h2>
                    <p className="text-gray-400 mb-8">Please log in to view your profile.</p>
                    <Link
                        to="/login"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transform hover:-translate-y-0.5 transition-all duration-300"
                    >
                        Sign In
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        );
    }

    const quickActions = isFarmer
        ? [
            { icon: '📦', title: 'My Products', desc: 'Manage your listings', path: '/ecommerce', color: 'from-green-500 to-emerald-600' },
            { icon: '🔬', title: 'Disease Detection', desc: 'Check crop health', path: '/predictDisease', color: 'from-red-500 to-orange-500' },
            { icon: '📊', title: 'Crop Recommendation', desc: 'Get growing tips', path: '/yield', color: 'from-blue-500 to-cyan-500' },
        ]
        : [
            { icon: '🛒', title: 'Browse Store', desc: 'Shop fresh produce', path: '/consumer', color: 'from-green-500 to-emerald-600' },
            { icon: '🔬', title: 'Disease Detection', desc: 'Check your plants', path: '/predictDisease', color: 'from-red-500 to-orange-500' },
            { icon: '📊', title: 'Crop Recommendation', desc: 'Get growing tips', path: '/yield', color: 'from-blue-500 to-cyan-500' },
        ];

    return (
        <div className="min-h-screen bg-slate-900">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/30 via-slate-900 to-slate-900"></div>
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-float"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-float-slow"></div>
                </div>

                <div className="relative container mx-auto px-6">
                    {/* Profile Card */}
                    <div className="max-w-4xl mx-auto">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl blur-lg opacity-20"></div>
                            <div className="relative rounded-3xl bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 overflow-hidden">
                                {/* Banner */}
                                <div className="h-32 bg-gradient-to-r from-green-500 to-emerald-600 relative">
                                    <div className="absolute inset-0 opacity-20" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}}></div>
                                </div>

                                {/* Profile Info */}
                                <div className="px-8 pb-8 -mt-16">
                                    <div className="flex flex-col md:flex-row md:items-end gap-6">
                                        {/* Avatar */}
                                        <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 border-4 border-slate-800 flex items-center justify-center shadow-2xl">
                                            <span className="text-5xl font-bold text-white">
                                                {user.username?.charAt(0)?.toUpperCase() || 'U'}
                                            </span>
                                        </div>

                                        {/* Name & Role */}
                                        <div className="flex-1">
                                            <h1 className="text-3xl font-bold text-white mb-2">{user.username}</h1>
                                            <div className="flex items-center gap-3">
                                                <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium ${
                                                    isFarmer
                                                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                                        : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                                }`}>
                                                    <span>{isFarmer ? '🌾' : '🛒'}</span>
                                                    {isFarmer ? 'Farmer' : 'Customer'}
                                                </span>
                                                <span className="text-gray-400 text-sm">Member since 2024</span>
                                            </div>
                                        </div>

                                        {/* Edit Button */}
                                        <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                                            Edit Profile
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Account Info */}
                        <div className="mt-8 relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-3xl blur-lg"></div>
                            <div className="relative p-8 rounded-3xl bg-slate-800/80 backdrop-blur-xl border border-slate-700/50">
                                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                    <span className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </span>
                                    Account Information
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
                                        { label: 'Full Name', value: user.username, icon: '👤' },
                                        { label: 'Email Address', value: user.email, icon: '📧' },
                                        { label: 'Phone Number', value: user.phone || 'Not provided', icon: '📱' },
                                        { label: 'Account Type', value: isFarmer ? 'Farmer Account' : 'Customer Account', icon: isFarmer ? '🌾' : '🛒' },
                                    ].map((item) => (
                                        <div key={item.label} className="p-4 rounded-xl bg-slate-900/50 border border-slate-700/50">
                                            <label className="text-sm text-gray-400 flex items-center gap-2">
                                                <span>{item.icon}</span>
                                                {item.label}
                                            </label>
                                            <p className="mt-1 text-lg text-white font-medium">{item.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="mt-8 relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-3xl blur-lg"></div>
                            <div className="relative p-8 rounded-3xl bg-slate-800/80 backdrop-blur-xl border border-slate-700/50">
                                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                    <span className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </span>
                                    Quick Actions
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {quickActions.map((action) => (
                                        <Link
                                            key={action.path}
                                            to={action.path}
                                            className="group p-6 rounded-2xl bg-slate-900/50 border border-slate-700/50 hover:border-green-500/30 transition-all duration-300 hover:-translate-y-1"
                                        >
                                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                                                {action.icon}
                                            </div>
                                            <h3 className="text-lg font-semibold text-white mb-1">{action.title}</h3>
                                            <p className="text-gray-400 text-sm">{action.desc}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Account Actions */}
                        <div className="mt-8 relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-3xl blur-lg"></div>
                            <div className="relative p-8 rounded-3xl bg-slate-800/80 backdrop-blur-xl border border-slate-700/50">
                                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                    <span className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </span>
                                    Account Actions
                                </h2>

                                <div className="flex flex-wrap gap-4">
                                    <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                        </svg>
                                        Change Password
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-medium hover:bg-red-500/20 transition-all duration-300 flex items-center gap-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Profile;
