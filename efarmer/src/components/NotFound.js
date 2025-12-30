import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center px-6 relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-slate-900 to-slate-900"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-float-slow"></div>
            </div>

            <div className="relative max-w-2xl w-full text-center">
                {/* 404 Number */}
                <div className="relative mb-8">
                    <div className="text-[12rem] md:text-[16rem] font-black leading-none">
                        <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent">
                            404
                        </span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-48 h-48 rounded-full border-4 border-dashed border-slate-700/50 animate-spin-slow"></div>
                    </div>
                </div>

                {/* Icon */}
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 flex items-center justify-center mx-auto mb-8">
                    <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>

                {/* Text */}
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Page Not Found
                </h1>
                <p className="text-xl text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
                    Oops! The page you're looking for seems to have wandered off into the fields.
                    Let's get you back on track.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transform hover:-translate-y-0.5 transition-all duration-300"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Go Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all duration-300"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Go Back
                    </button>
                </div>

                {/* Help Links */}
                <div className="mt-12 pt-8 border-t border-slate-800">
                    <p className="text-gray-500 mb-4">Perhaps you were looking for:</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {[
                            { label: 'Disease Detection', path: '/predictDisease', icon: '🔬' },
                            { label: 'Crop Recommendation', path: '/yield', icon: '🌾' },
                            { label: 'Marketplace', path: '/consumer', icon: '🛒' },
                            { label: 'Contact Us', path: '/contact', icon: '📧' },
                        ].map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/50 border border-slate-700/50 text-gray-400 hover:text-white hover:border-green-500/30 transition-all duration-300 text-sm"
                            >
                                <span>{link.icon}</span>
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* CSS for slow spin animation */}
            <style>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default NotFound;
