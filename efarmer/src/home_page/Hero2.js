import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const features = [
    {
        title: 'AI Disease Detection',
        description: 'Upload a photo of your plant and our AI instantly identifies diseases with 99% accuracy. Get treatment recommendations in seconds.',
        image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=1891&auto=format&fit=crop',
        link: '/predictDisease',
        color: 'from-red-500 to-orange-500',
        stats: '99% Accuracy',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
    },
    {
        title: 'Smart Yield Prediction',
        description: 'Leverage machine learning to predict your harvest yield. Make data-driven decisions for better farm planning.',
        image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1770&auto=format&fit=crop',
        link: '/yield',
        color: 'from-green-500 to-emerald-500',
        stats: 'ML Powered',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
    },
    {
        title: 'Direct Marketplace',
        description: 'Sell your produce directly to consumers. No middlemen, higher profits, fresh delivery.',
        image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=1770&auto=format&fit=crop',
        link: '/consumer',
        color: 'from-blue-500 to-cyan-500',
        stats: 'Zero Commission',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
    },
];

const Hero2 = () => {
    const [visibleCards, setVisibleCards] = useState([]);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        features.forEach((_, index) => {
                            setTimeout(() => {
                                setVisibleCards((prev) => [...prev, index]);
                            }, index * 200);
                        });
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="relative py-24 bg-slate-900 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-72 h-72 bg-green-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative container mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-6">
                        Powerful Features
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Everything You Need to
                        <span className="gradient-text"> Succeed</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        From disease detection to marketplace - we've got every aspect of modern farming covered.
                    </p>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={feature.title}
                            className={`group relative transition-all duration-700 ${
                                visibleCards.includes(index)
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-10'
                            }`}
                        >
                            {/* Card */}
                            <div className="relative h-full bg-slate-800/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-slate-700/50 hover:border-green-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/10">
                                {/* Image */}
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={feature.image}
                                        alt={feature.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>

                                    {/* Stats Badge */}
                                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r ${feature.color} text-white text-xs font-semibold`}>
                                        {feature.stats}
                                    </div>

                                    {/* Icon */}
                                    <div className={`absolute bottom-4 left-4 w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                        {feature.icon}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-400 mb-6 leading-relaxed">
                                        {feature.description}
                                    </p>
                                    <Link
                                        to={feature.link}
                                        className="inline-flex items-center gap-2 text-green-400 font-semibold group/link"
                                    >
                                        <span>Explore Feature</span>
                                        <svg
                                            className="w-5 h-5 transform group-hover/link:translate-x-2 transition-transform"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </div>

                                {/* Hover Glow */}
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}>
                                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5`}></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <p className="text-gray-400 mb-6">
                        Ready to transform your farming experience?
                    </p>
                    <Link to="/signup" className="btn-premium inline-flex items-center gap-2">
                        Start Your Journey
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero2;
