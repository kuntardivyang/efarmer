import React, { useState } from 'react';
import { Navbar } from '../base/Navbar';
import Footer from '../base/Footer';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error' | null

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (status) setStatus(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            await emailjs.send('service_MealDash', 'template_l0bpxnq', formData, 'ktkpzx4rjtTSmrmgC');
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (err) {
            console.log('FAILED...', err);
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    const contactInfo = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            label: 'Email',
            value: 'support@efarmer.com',
            color: 'from-green-500 to-emerald-600',
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            ),
            label: 'Phone',
            value: '+91 9978617480',
            color: 'from-blue-500 to-cyan-600',
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            label: 'Working Hours',
            value: '9:00 AM - 9:00 PM, Mon-Sun',
            color: 'from-purple-500 to-pink-600',
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            label: 'Address',
            value: '1234 Foodie Lane, Cityville, CA 91020',
            color: 'from-orange-500 to-red-600',
        },
    ];

    const faqs = [
        {
            q: 'How does disease detection work?',
            a: 'Simply upload a photo of your plant leaf, and our AI will analyze it instantly to detect any diseases with 99% accuracy.',
        },
        {
            q: 'Is eFarmer free to use?',
            a: 'Yes! eFarmer is completely free for all farmers and customers. We believe in accessible technology for everyone.',
        },
        {
            q: 'How do I sell my products?',
            a: 'Sign up as a farmer, list your products with photos and prices, and start selling directly to customers - no middlemen involved.',
        },
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
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="inline-block px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-6">
                            Get In Touch
                        </span>
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            Contact
                            <span className="gradient-text"> Us</span>
                        </h1>
                        <p className="text-xl text-gray-400 leading-relaxed">
                            Have questions? We'd love to hear from you. Send us a message
                            and we'll respond as soon as possible.
                        </p>
                    </div>

                    {/* Contact Info Cards */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {contactInfo.map((info, index) => (
                            <div
                                key={info.label}
                                className="group relative rounded-2xl bg-slate-800/50 border border-slate-700/50 p-6 hover:border-green-500/30 transition-all duration-500 hover:-translate-y-2"
                            >
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    {info.icon}
                                </div>
                                <p className="text-gray-400 text-sm mb-1">{info.label}</p>
                                <p className="text-white font-medium">{info.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Main Content */}
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl blur-lg opacity-20"></div>
                            <div className="relative p-8 rounded-3xl bg-slate-800/80 backdrop-blur-xl border border-slate-700/50">
                                <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>

                                {/* Success Message */}
                                {status === 'success' && (
                                    <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                                            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-green-400">Message Sent!</p>
                                            <p className="text-sm text-green-400/70">We'll get back to you soon.</p>
                                        </div>
                                    </div>
                                )}

                                {/* Error Message */}
                                {status === 'error' && (
                                    <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                                            <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-red-400">Failed to send</p>
                                            <p className="text-sm text-red-400/70">Please try again later.</p>
                                        </div>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                                                placeholder="John Doe"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Your Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                                                placeholder="john@example.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                                            placeholder="How can we help?"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Your Message</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows="5"
                                            className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 resize-none"
                                            placeholder="Tell us more about your inquiry..."
                                            required
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading || status === 'success'}
                                        className="w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Message
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                </svg>
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* FAQ Section */}
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
                            <div className="space-y-4">
                                {faqs.map((faq, index) => (
                                    <div
                                        key={index}
                                        className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-green-500/30 transition-all duration-300"
                                    >
                                        <h3 className="text-lg font-semibold text-white mb-2 flex items-start gap-3">
                                            <span className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400 text-sm flex-shrink-0">
                                                Q
                                            </span>
                                            {faq.q}
                                        </h3>
                                        <p className="text-gray-400 ml-11">{faq.a}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Support Card */}
                            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1">Need More Help?</h3>
                                        <p className="text-gray-400 text-sm mb-3">
                                            Our support team is available 24/7 to assist you with any questions.
                                        </p>
                                        <a
                                            href="mailto:support@efarmer.com"
                                            className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors text-sm font-medium"
                                        >
                                            support@efarmer.com
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </a>
                                    </div>
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

export default Contact;
