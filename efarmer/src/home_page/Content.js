import React, { useEffect, useRef, useState } from 'react';

const stats = [
    { number: 10000, suffix: '+', label: 'Active Farmers', icon: '🌾' },
    { number: 50, suffix: 'K+', label: 'Products Listed', icon: '📦' },
    { number: 98, suffix: '%', label: 'Success Rate', icon: '✅' },
    { number: 24, suffix: '/7', label: 'Support', icon: '💬' },
];

const AnimatedCounter = ({ end, suffix, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    let start = 0;
                    const increment = end / (duration / 16);
                    const timer = setInterval(() => {
                        start += increment;
                        if (start >= end) {
                            setCount(end);
                            clearInterval(timer);
                        } else {
                            setCount(Math.floor(start));
                        }
                    }, 16);
                }
            },
            { threshold: 0.5 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => observer.disconnect();
    }, [end, duration, hasAnimated]);

    return (
        <span ref={countRef} className="stat-number">
            {count}{suffix}
        </span>
    );
};

const Content = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="relative py-24 bg-slate-950 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-slate-950 to-slate-950"></div>
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2322c55e' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                ></div>
            </div>

            <div className="relative container mx-auto px-6">
                {/* Section Header */}
                <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <span className="inline-block px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-6">
                        Our Impact
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Transforming Agriculture,
                        <span className="gradient-text"> One Farm at a Time</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        At eFarmer, we're revolutionizing agriculture by combining cutting-edge AI technology with the needs of farmers. Our platform empowers farmers to boost productivity and profitability.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={stat.label}
                            className={`relative group transition-all duration-700 delay-${index * 100} ${
                                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            {/* Card */}
                            <div className="relative p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-green-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-green-500/10 text-center">
                                {/* Icon */}
                                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 transform group-hover:scale-110 transition-transform">
                                    {stat.icon}
                                </div>

                                {/* Number */}
                                <div className="mb-2">
                                    <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                                </div>

                                {/* Label */}
                                <p className="text-gray-400 font-medium text-sm sm:text-base">{stat.label}</p>

                                {/* Hover Glow */}
                                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mission Statement */}
                <div className={`mt-20 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="relative">
                        {/* Glow */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl blur-lg opacity-20"></div>

                        {/* Content */}
                        <div className="relative p-8 lg:p-12 rounded-3xl bg-slate-900/80 border border-slate-800">
                            <div className="grid lg:grid-cols-2 gap-8 items-center">
                                {/* Left */}
                                <div>
                                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                                        Our Mission
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed mb-6">
                                        We believe every farmer deserves access to cutting-edge technology. Our AI-powered platform helps you detect diseases early, predict yields accurately, and sell directly to consumers - all from one place.
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
                                            <span>No hidden fees</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-green-400">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span>24/7 support</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right - Visual */}
                                <div className="relative">
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { icon: '🌱', title: 'Smart Farming', desc: 'AI-powered insights' },
                                            { icon: '📈', title: 'Growth', desc: 'Maximize profits' },
                                            { icon: '🤝', title: 'Direct Sales', desc: 'Connect with buyers' },
                                            { icon: '🛡️', title: 'Protection', desc: 'Early detection' },
                                        ].map((item, i) => (
                                            <div
                                                key={item.title}
                                                className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-green-500/30 transition-all duration-300 hover:-translate-y-1"
                                            >
                                                <div className="text-2xl mb-2">{item.icon}</div>
                                                <div className="text-white font-semibold text-sm">{item.title}</div>
                                                <div className="text-gray-500 text-xs">{item.desc}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Content;
