import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
    const navigate = useNavigate();
    const { signup, error: authError, clearError } = useAuth();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        isFarmer: true,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        if (type === 'radio') {
            setFormData(prev => ({
                ...prev,
                [name]: value === 'true',
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value,
            }));
        }

        // Clear field-specific error when user starts typing
        if (fieldErrors[name]) {
            setFieldErrors(prev => ({ ...prev, [name]: null }));
        }
        if (error) setError('');
        if (authError) clearError();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setFieldErrors({});

        if (formData.password !== formData.confirmPassword) {
            setFieldErrors({ confirmPassword: 'Passwords do not match' });
            setLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setFieldErrors({ password: 'Password must be at least 6 characters' });
            setLoading(false);
            return;
        }

        try {
            const { confirmPassword, ...signupData } = formData;
            const result = await signup(signupData);

            if (result.success) {
                if (result.user.isFarmer) {
                    navigate('/ecommerce', { replace: true });
                } else {
                    navigate('/consumer', { replace: true });
                }
            } else {
                // Parse field-specific errors
                if (result.fieldErrors && Array.isArray(result.fieldErrors)) {
                    const errors = {};
                    result.fieldErrors.forEach(err => {
                        errors[err.field] = err.message;
                    });
                    setFieldErrors(errors);
                } else {
                    setError(result.error || 'Registration failed. Please try again.');
                }
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden px-4 py-20">
            {/* Animated background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-slate-900 to-slate-900"></div>
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-float-slow"></div>
            </div>

            <div className="relative z-10 w-full max-w-5xl">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    {/* Left side - Branding */}
                    <div className="hidden lg:block p-8">
                        <Link to="/" className="inline-flex items-center gap-3 mb-8 group">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                            </div>
                            <span className="text-3xl font-bold">
                                <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">e</span>
                                <span className="text-white">Farmer</span>
                            </span>
                        </Link>

                        <h1 className="text-4xl font-bold text-white mb-4">
                            Join the Future of
                            <span className="block mt-2 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                                Smart Agriculture
                            </span>
                        </h1>
                        <p className="text-gray-400 text-lg leading-relaxed mb-8">
                            Create your account and unlock powerful AI tools for crop management, disease detection, and direct marketplace access.
                        </p>

                        {/* Benefits */}
                        <div className="space-y-4">
                            {[
                                { icon: '✨', text: '100% Free to Use' },
                                { icon: '🔒', text: 'Secure & Private' },
                                { icon: '🚀', text: 'Instant Access' },
                            ].map((benefit) => (
                                <div key={benefit.text} className="flex items-center gap-3 text-gray-300">
                                    <span className="text-xl">{benefit.icon}</span>
                                    <span>{benefit.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right side - Form */}
                    <div className="relative">
                        {/* Glow effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl blur-lg opacity-20"></div>

                        <div className="relative p-8 lg:p-10 rounded-3xl bg-slate-800/80 backdrop-blur-xl border border-slate-700/50">
                            {/* Mobile logo */}
                            <div className="lg:hidden text-center mb-8">
                                <Link to="/" className="inline-flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                        </svg>
                                    </div>
                                    <span className="text-2xl font-bold text-white">eFarmer</span>
                                </Link>
                            </div>

                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
                                <p className="text-gray-400">Fill in your details to get started</p>
                            </div>

                            {/* Role Selection */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-300 mb-3">I am a</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <label className={`relative flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                                        formData.isFarmer
                                            ? 'border-green-500 bg-green-500/10'
                                            : 'border-slate-600/50 hover:border-slate-500'
                                    }`}>
                                        <input
                                            type="radio"
                                            name="isFarmer"
                                            value="true"
                                            checked={formData.isFarmer === true}
                                            onChange={handleChange}
                                            className="sr-only"
                                            disabled={loading}
                                        />
                                        <span className="text-2xl">🌾</span>
                                        <span className={`font-medium ${formData.isFarmer ? 'text-green-400' : 'text-gray-300'}`}>
                                            Farmer
                                        </span>
                                        {formData.isFarmer && (
                                            <svg className="absolute top-2 right-2 w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </label>
                                    <label className={`relative flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                                        !formData.isFarmer
                                            ? 'border-green-500 bg-green-500/10'
                                            : 'border-slate-600/50 hover:border-slate-500'
                                    }`}>
                                        <input
                                            type="radio"
                                            name="isFarmer"
                                            value="false"
                                            checked={formData.isFarmer === false}
                                            onChange={handleChange}
                                            className="sr-only"
                                            disabled={loading}
                                        />
                                        <span className="text-2xl">🛒</span>
                                        <span className={`font-medium ${!formData.isFarmer ? 'text-green-400' : 'text-gray-300'}`}>
                                            Customer
                                        </span>
                                        {!formData.isFarmer && (
                                            <svg className="absolute top-2 right-2 w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </label>
                                </div>
                            </div>

                            {/* Error message */}
                            {(error || authError) && (
                                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <p className="text-red-400 text-sm">{error || authError}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <svg className={`w-5 h-5 ${fieldErrors.username ? 'text-red-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            required
                                            disabled={loading}
                                            className={`w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-900/50 border text-white placeholder-gray-500 focus:ring-2 transition-all duration-300 disabled:opacity-50 ${
                                                fieldErrors.username
                                                    ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
                                                    : 'border-slate-600/50 focus:border-green-500/50 focus:ring-green-500/20'
                                            }`}
                                        />
                                    </div>
                                    {fieldErrors.username && (
                                        <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {fieldErrors.username}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <svg className={`w-5 h-5 ${fieldErrors.email ? 'text-red-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                            </svg>
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@example.com"
                                            required
                                            disabled={loading}
                                            className={`w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-900/50 border text-white placeholder-gray-500 focus:ring-2 transition-all duration-300 disabled:opacity-50 ${
                                                fieldErrors.email
                                                    ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
                                                    : 'border-slate-600/50 focus:border-green-500/50 focus:ring-green-500/20'
                                            }`}
                                        />
                                    </div>
                                    {fieldErrors.email && (
                                        <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {fieldErrors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <svg className={`w-5 h-5 ${fieldErrors.phone ? 'text-red-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+91 12345 67890"
                                            required
                                            disabled={loading}
                                            className={`w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-900/50 border text-white placeholder-gray-500 focus:ring-2 transition-all duration-300 disabled:opacity-50 ${
                                                fieldErrors.phone
                                                    ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
                                                    : 'border-slate-600/50 focus:border-green-500/50 focus:ring-green-500/20'
                                            }`}
                                        />
                                    </div>
                                    {fieldErrors.phone && (
                                        <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {fieldErrors.phone}
                                        </p>
                                    )}
                                </div>

                                {/* Password */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="Min 6 characters"
                                                required
                                                disabled={loading}
                                                className={`w-full px-4 py-3.5 rounded-xl bg-slate-900/50 border text-white placeholder-gray-500 focus:ring-2 transition-all duration-300 disabled:opacity-50 ${
                                                    fieldErrors.password
                                                        ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
                                                        : 'border-slate-600/50 focus:border-green-500/50 focus:ring-green-500/20'
                                                }`}
                                            />
                                        </div>
                                        {fieldErrors.password && (
                                            <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="truncate">{fieldErrors.password}</span>
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Confirm</label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                placeholder="Confirm password"
                                                required
                                                disabled={loading}
                                                className={`w-full px-4 py-3.5 rounded-xl bg-slate-900/50 border text-white placeholder-gray-500 focus:ring-2 transition-all duration-300 disabled:opacity-50 ${
                                                    fieldErrors.confirmPassword
                                                        ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
                                                        : 'border-slate-600/50 focus:border-green-500/50 focus:ring-green-500/20'
                                                }`}
                                            />
                                        </div>
                                        {fieldErrors.confirmPassword && (
                                            <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="truncate">{fieldErrors.confirmPassword}</span>
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Show password toggle */}
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={showPassword}
                                        onChange={(e) => setShowPassword(e.target.checked)}
                                        className="w-4 h-4 rounded border-slate-600 bg-slate-900 text-green-500 focus:ring-green-500/20"
                                    />
                                    <span className="text-sm text-gray-400">Show passwords</span>
                                </label>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Creating account...
                                        </>
                                    ) : (
                                        <>
                                            Create Account
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Login link */}
                            <p className="mt-6 text-center text-gray-400">
                                Already have an account?{' '}
                                <Link to="/login" className="text-green-400 hover:text-green-300 font-medium transition-colors">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
