import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Hero1 = () => {
    const { user } = useAuth();
    const [isVisible, setIsVisible] = useState(false);
    const [currentStat, setCurrentStat] = useState(0);

    const stats = [
        { number: '10K+', label: 'Active Farmers', icon: '🌾' },
        { number: '50K+', label: 'Products Sold', icon: '📦' },
        { number: '98%', label: 'Satisfaction Rate', icon: '⭐' },
        { number: '24/7', label: 'Support Available', icon: '💬' },
    ];

    useEffect(() => {
        setIsVisible(true);
        const interval = setInterval(() => {
            setCurrentStat((prev) => (prev + 1) % stats.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [stats.length]);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
            {/* Animated Background */}
            <div className="absolute inset-0">
                {/* Gradient Mesh */}
                <div className="absolute inset-0 gradient-mesh opacity-80"></div>

                {/* Animated Orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>

                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
                                         linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }}
                ></div>

                {/* Floating Particles */}
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-green-400 rounded-full opacity-40"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    ></div>
                ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10 container mx-auto px-6 py-20 lg:py-32">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className={`space-y-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 backdrop-blur-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-green-400 text-sm font-medium">AI-Powered Agriculture Platform</span>
                        </div>

                        {/* Heading */}
                        <div className="space-y-4">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                                {user ? (
                                    <>
                                        Welcome back,
                                        <span className="block gradient-text">{user.username}!</span>
                                    </>
                                ) : (
                                    <>
                                        Revolutionizing
                                        <span className="block gradient-text">Smart Farming</span>
                                    </>
                                )}
                            </h1>
                            <p className="text-lg sm:text-xl text-gray-400 max-w-xl leading-relaxed">
                                Harness the power of AI to predict crop diseases, optimize yields, and connect directly with buyers. Your farm's success starts here.
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4">
                            {user ? (
                                <>
                                    <Link to="/predictDisease" className="btn-premium inline-flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                        Detect Disease
                                    </Link>
                                    <Link to="/consumer" className="btn-glass inline-flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        Browse Store
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/signup" className="btn-premium inline-flex items-center gap-2">
                                        Get Started Free
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                    <Link to="/consumer" className="btn-glass inline-flex items-center gap-2">
                                        Explore Platform
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex items-center gap-8 pt-4">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div
                                        key={i}
                                        className="w-10 h-10 rounded-full border-2 border-slate-900 bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-xs font-bold"
                                    >
                                        {String.fromCharCode(64 + i)}
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm text-gray-400">
                                <span className="text-white font-semibold">10,000+</span> farmers trust us
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Feature Cards */}
                    <div className={`relative ${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
                        {/* Main Card */}
                        <div className="relative">
                            {/* Subtle Glow Effect - reduced opacity */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-green-500/50 to-emerald-500/50 rounded-3xl blur-xl opacity-20"></div>

                            {/* Card Content - darker background */}
                            <div className="relative p-5 sm:p-8 space-y-4 sm:space-y-6 rounded-2xl sm:rounded-3xl bg-slate-800/90 backdrop-blur-xl border border-slate-700/50">
                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                    {stats.map((stat, index) => (
                                        <div
                                            key={stat.label}
                                            className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-500 ${
                                                currentStat === index
                                                    ? 'bg-green-500/15 border border-green-500/30 scale-105'
                                                    : 'bg-slate-900/50 border border-slate-700/50'
                                            }`}
                                        >
                                            <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{stat.icon}</div>
                                            <div className="text-xl sm:text-2xl font-bold text-white">{stat.number}</div>
                                            <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Feature List */}
                                <div className="space-y-3">
                                    {[
                                        { icon: '🔬', text: 'AI Disease Detection', desc: '99% accuracy rate' },
                                        { icon: '📊', text: 'Yield Prediction', desc: 'Data-driven insights' },
                                        { icon: '🛒', text: 'Direct Marketplace', desc: 'No middlemen' },
                                    ].map((feature, i) => (
                                        <div
                                            key={feature.text}
                                            className="flex items-center gap-4 p-3 rounded-xl bg-slate-900/50 border border-slate-700/50 hover:border-green-500/30 hover:bg-slate-800 transition-all duration-300 cursor-pointer group"
                                            style={{ animationDelay: `${0.5 + i * 0.1}s` }}
                                        >
                                            <div className="text-2xl group-hover:scale-110 transition-transform">{feature.icon}</div>
                                            <div className="flex-1">
                                                <div className="text-white font-medium">{feature.text}</div>
                                                <div className="text-sm text-gray-400">{feature.desc}</div>
                                            </div>
                                            <svg className="w-5 h-5 text-gray-500 group-hover:text-green-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Floating Badge */}
                        <div className="absolute -top-4 -right-4 px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-semibold shadow-lg animate-bounce">
                            100% Free
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="flex flex-col items-center gap-2 text-gray-500">
                    <span className="text-xs uppercase tracking-wider">Scroll to explore</span>
                    <div className="w-6 h-10 rounded-full border-2 border-gray-600 flex justify-center pt-2">
                        <div className="w-1 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero1;
