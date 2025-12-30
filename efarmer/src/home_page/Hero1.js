import React from 'react';
import { Link } from 'react-router-dom';
import image1 from './farm2-slider-bg.jpg';

const Hero1 = () => {
    return (
        <div className="mt-16">
            <section
                className="relative bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${image1})` }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

                {/* Content */}
                <div className="relative mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:min-h-screen lg:items-center">
                    <div className="max-w-2xl">
                        {/* Badge */}
                        <div className="animate-fade-in-down">
                            <span className="inline-flex items-center gap-2 rounded-full bg-green-500/20 px-4 py-1.5 text-sm font-medium text-green-300 backdrop-blur-sm border border-green-500/30 mb-6">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                Trusted by 1000+ Farmers
                            </span>
                        </div>

                        {/* Heading */}
                        <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl animate-fade-in-up">
                            Empowering Farmers,
                            <span className="block mt-2 bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                                Connecting Markets
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="mt-6 text-lg text-gray-300 sm:text-xl max-w-xl animate-fade-in-up animate-delay-200">
                            Welcome to the future of agriculture, where farmers gain control and buyers access the best products directly from the source.
                        </p>

                        {/* CTA Buttons */}
                        <div className="mt-8 flex flex-wrap gap-4 animate-fade-in-up animate-delay-300">
                            <Link
                                to="/signup"
                                className="group inline-flex items-center gap-2 rounded-full bg-green-600 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-green-500 hover:scale-105 hover:shadow-lg hover:shadow-green-500/30"
                            >
                                Get Started
                                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>

                            <Link
                                to="/consumer"
                                className="group inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-gray-900 hover:scale-105"
                            >
                                Browse Store
                                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="mt-12 grid grid-cols-3 gap-8 animate-fade-in-up animate-delay-400">
                            <div>
                                <div className="text-3xl font-bold text-white">1000+</div>
                                <div className="text-sm text-gray-400">Active Farmers</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-white">50K+</div>
                                <div className="text-sm text-gray-400">Products Sold</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-white">98%</div>
                                <div className="text-sm text-gray-400">Satisfaction</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
                        <div className="w-1 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Hero1;
