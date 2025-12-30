import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../base/Navbar';
import Footer from '../base/Footer';

const AboutUs = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const values = [
        {
            icon: '🌱',
            title: 'Sustainability',
            description: 'We prioritize eco-friendly practices and help farmers adopt sustainable methods that protect our planet.',
            color: 'from-green-500 to-emerald-600',
        },
        {
            icon: '💡',
            title: 'Innovation',
            description: 'We embrace cutting-edge AI and technology to revolutionize traditional farming practices.',
            color: 'from-blue-500 to-cyan-600',
        },
        {
            icon: '🤝',
            title: 'Community',
            description: 'We believe in the power of collaboration, connecting farmers with customers directly.',
            color: 'from-purple-500 to-pink-600',
        },
        {
            icon: '📈',
            title: 'Growth',
            description: 'We help farmers maximize their yields and profitability through data-driven insights.',
            color: 'from-orange-500 to-red-600',
        },
    ];

    const stats = [
        { number: '10,000+', label: 'Active Farmers' },
        { number: '50K+', label: 'Products Listed' },
        { number: '98%', label: 'Accuracy Rate' },
        { number: '24/7', label: 'Support' },
    ];

    const team = [
        { name: 'Agricultural AI', icon: '🤖', role: 'Disease Detection', desc: 'Powered by deep learning' },
        { name: 'Smart Analytics', icon: '📊', role: 'Crop Prediction', desc: 'ML-driven insights' },
        { name: 'Direct Connect', icon: '🔗', role: 'Marketplace', desc: 'Farm to table' },
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
                    <div className="text-center max-w-4xl mx-auto">
                        <span className="inline-block px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-6">
                            About eFarmer
                        </span>
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            Empowering Farmers with
                            <span className="gradient-text"> AI Technology</span>
                        </h1>
                        <p className="text-xl text-gray-400 leading-relaxed mb-8">
                            We're on a mission to revolutionize agriculture by combining cutting-edge AI technology
                            with the wisdom of traditional farming. Our platform helps farmers detect diseases,
                            predict yields, and connect directly with consumers.
                        </p>

                        {/* Stats Row */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                            {stats.map((stat, index) => (
                                <div key={stat.label} className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold text-green-400 mb-1">{stat.number}</div>
                                    <div className="text-gray-400 text-sm">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section ref={sectionRef} className="relative py-20 bg-slate-950">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left Content */}
                        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                            <span className="inline-block px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-6">
                                Our Mission
                            </span>
                            <h2 className="text-4xl font-bold text-white mb-6">
                                Bridging Technology and Agriculture
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed mb-6">
                                We strive to bridge the gap between traditional farming practices and modern technology,
                                helping farmers access resources, knowledge, and tools that improve their livelihoods
                                and the quality of their produce.
                            </p>
                            <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                Our AI-powered platform provides instant disease detection, accurate yield predictions,
                                and a direct marketplace connecting farmers with consumers - eliminating middlemen and
                                maximizing profits for our farming community.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-2 text-green-400">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Free to use</span>
                                </div>
                                <div className="flex items-center gap-2 text-green-400">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>AI-Powered</span>
                                </div>
                                <div className="flex items-center gap-2 text-green-400">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>24/7 Support</span>
                                </div>
                            </div>
                        </div>

                        {/* Right - Feature Cards */}
                        <div className={`grid grid-cols-2 gap-4 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                            {team.map((item, index) => (
                                <div
                                    key={item.name}
                                    className={`p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-green-500/30 transition-all duration-300 hover:-translate-y-1 ${index === 2 ? 'col-span-2' : ''}`}
                                >
                                    <div className="text-4xl mb-4">{item.icon}</div>
                                    <h3 className="text-xl font-bold text-white mb-1">{item.name}</h3>
                                    <p className="text-green-400 text-sm mb-2">{item.role}</p>
                                    <p className="text-gray-500 text-sm">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="relative py-20 bg-slate-900">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-6">
                            Our Values
                        </span>
                        <h2 className="text-4xl font-bold text-white mb-4">
                            What Drives Us Forward
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            These core values guide everything we do at eFarmer
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <div
                                key={value.title}
                                className="group relative rounded-2xl bg-slate-800/50 border border-slate-700/50 p-6 hover:border-green-500/30 transition-all duration-500 hover:-translate-y-2"
                            >
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{value.description}</p>

                                {/* Hover Glow */}
                                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="relative py-20 bg-slate-950">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-6">
                            Our Impact
                        </span>
                        <h2 className="text-4xl font-bold text-white mb-4">
                            How We Help Everyone
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Farmer Benefits */}
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                            <div className="relative p-8 rounded-2xl bg-slate-800 border border-slate-700/50">
                                <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center text-3xl mb-6">
                                    🌾
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Empowering Farmers</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    We address key farming challenges such as access to modern tools, knowledge, and markets.
                                    Our cutting-edge technology helps farmers increase productivity and adopt sustainable practices.
                                </p>
                            </div>
                        </div>

                        {/* Profit Benefits */}
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                            <div className="relative p-8 rounded-2xl bg-slate-800 border border-slate-700/50">
                                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-3xl mb-6">
                                    📈
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Increased Profitability</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    With our platform, farmers optimize operations, reduce costs, and access new markets.
                                    This leads to better financial stability and allows reinvestment in their farms.
                                </p>
                            </div>
                        </div>

                        {/* Customer Benefits */}
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                            <div className="relative p-8 rounded-2xl bg-slate-800 border border-slate-700/50">
                                <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center text-3xl mb-6">
                                    🛒
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Better for Customers</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Customers get access to fresh, sustainably grown produce directly from farmers.
                                    By shortening the supply chain, customers enjoy higher-quality products at competitive prices.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-20 bg-slate-900">
                <div className="container mx-auto px-6">
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl blur-lg opacity-20"></div>
                        <div className="relative p-12 rounded-3xl bg-slate-800/80 border border-slate-700/50 text-center">
                            <h2 className="text-4xl font-bold text-white mb-4">
                                Join Our Mission
                            </h2>
                            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                                Be part of the agricultural revolution. Whether you're a farmer looking to grow
                                or a customer seeking fresh produce, eFarmer is here for you.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link
                                    to="/signup"
                                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transform hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    Get Started Free
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all duration-300"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AboutUs;
