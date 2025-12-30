import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login, error: authError, clearError } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const from = location.state?.from?.pathname;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
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

        try {
            const result = await login(formData.email, formData.password);

            if (result.success) {
                if (from) {
                    navigate(from, { replace: true });
                } else if (result.user.isFarmer) {
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
                    setError(result.error || 'Login failed. Please try again.');
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
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-float-slow"></div>
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
                            Welcome back to
                            <span className="block mt-2 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                                Smart Farming
                            </span>
                        </h1>
                        <p className="text-gray-400 text-lg leading-relaxed mb-8">
                            Continue your journey with AI-powered agriculture. Access disease detection, crop recommendations, and connect with the marketplace.
                        </p>

                        {/* Features */}
                        <div className="space-y-4">
                            {[
                                { icon: '🔬', text: 'AI Disease Detection' },
                                { icon: '📊', text: 'Smart Yield Predictions' },
                                { icon: '🛒', text: 'Direct Marketplace Access' },
                            ].map((feature) => (
                                <div key={feature.text} className="flex items-center gap-3 text-gray-300">
                                    <span className="text-xl">{feature.icon}</span>
                                    <span>{feature.text}</span>
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
                                <h2 className="text-2xl font-bold text-white mb-2">Sign In</h2>
                                <p className="text-gray-400">Enter your credentials to continue</p>
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

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Email Address
                                    </label>
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

                                {/* Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <svg className={`w-5 h-5 ${fieldErrors.password ? 'text-red-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Enter your password"
                                            required
                                            disabled={loading}
                                            className={`w-full pl-12 pr-12 py-3.5 rounded-xl bg-slate-900/50 border text-white placeholder-gray-500 focus:ring-2 transition-all duration-300 disabled:opacity-50 ${
                                                fieldErrors.password
                                                    ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
                                                    : 'border-slate-600/50 focus:border-green-500/50 focus:ring-green-500/20'
                                            }`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                                        >
                                            {showPassword ? (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                    {fieldErrors.password && (
                                        <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {fieldErrors.password}
                                        </p>
                                    )}
                                </div>

                                {/* Forgot Password */}
                                <div className="flex justify-end">
                                    <Link to="/forgot-password" className="text-sm text-green-400 hover:text-green-300 transition-colors">
                                        Forgot password?
                                    </Link>
                                </div>

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
                                            Signing in...
                                        </>
                                    ) : (
                                        <>
                                            Sign In
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Divider */}
                            <div className="my-8 flex items-center gap-4">
                                <div className="flex-1 h-px bg-slate-700"></div>
                                <span className="text-sm text-gray-500">New to eFarmer?</span>
                                <div className="flex-1 h-px bg-slate-700"></div>
                            </div>

                            {/* Sign up link */}
                            <Link
                                to="/signup"
                                className="block w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-center hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                            >
                                Create an Account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
