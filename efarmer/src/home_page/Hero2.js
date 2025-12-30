import React from 'react';
import { Link } from 'react-router-dom';

const features = [
    {
        title: 'Yield Prediction',
        description: 'Increase your farming productivity with advanced AI tools that help predict crop yields with precision.',
        image: 'https://images.unsplash.com/photo-1564417947365-8dbc9d0e718e?q=80&w=1887&auto=format&fit=crop',
        link: '/yield',
        color: 'from-green-500 to-emerald-600',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
    },
    {
        title: 'Disease Detection',
        description: 'Detect plant diseases early with AI-driven image recognition technology, and protect your crops.',
        image: 'https://plus.unsplash.com/premium_photo-1661875030035-06d7da798728?q=80&w=1770&auto=format&fit=crop',
        link: '/predictDisease',
        color: 'from-orange-500 to-red-600',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
    },
    {
        title: 'E-Commerce',
        description: 'Easily sell your produce online and connect directly with consumers through our e-commerce platform.',
        image: 'https://plus.unsplash.com/premium_photo-1664299231810-29d1caf6f753?q=80&w=1770&auto=format&fit=crop',
        link: '/consumer',
        color: 'from-blue-500 to-indigo-600',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
    },
];

const Hero2 = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container px-5 mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16 animate-fade-in">
                    <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
                        Our Features
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Smart Farming Solutions
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Leverage cutting-edge technology to optimize your farming operations and maximize your profits.
                    </p>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={feature.title}
                            className="group bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            {/* Image */}
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    alt={feature.title}
                                    className="object-cover object-center h-full w-full transition-transform duration-700 group-hover:scale-110"
                                    src={feature.image}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                {/* Icon Badge */}
                                <div className={`absolute top-4 left-4 w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                                    {feature.icon}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {feature.description}
                                </p>
                                <Link
                                    to={feature.link}
                                    className="inline-flex items-center gap-2 text-green-600 font-semibold group-hover:text-green-700 transition-colors duration-300"
                                >
                                    Learn More
                                    <svg
                                        className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero2;
