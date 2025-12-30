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

    // Get the redirect path from location state, or default based on role
    const from = location.state?.from?.pathname;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
        // Clear errors when user types
        if (error) setError('');
        if (authError) clearError();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const result = await login(formData.email, formData.password);

            if (result.success) {
                // Redirect to the page they tried to visit or based on role
                if (from) {
                    navigate(from, { replace: true });
                } else if (result.user.isFarmer) {
                    navigate('/ecommerce', { replace: true });
                } else {
                    navigate('/consumer', { replace: true });
                }
            } else {
                setError(result.error || 'Login failed. Please try again.');
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-100 py-16">
            <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl relative">
                {/* Close button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 z-10"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem' }}
                >
                    &times;
                </button>

                {/* Left side image */}
                <div
                    className="hidden lg:block lg:w-1/2 bg-cover"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1770&auto=format&fit=crop')",
                    }}
                ></div>

                {/* Right side form */}
                <div className="w-full p-8 lg:w-1/2">
                    <Link to="/">
                        <h2 className="text-2xl font-semibold text-center" style={{ color: '#274135' }}>
                            eFarmer
                        </h2>
                    </Link>
                    <p className="text-xl text-gray-600 text-center mt-2">Welcome back!</p>

                    {/* Error message */}
                    {(error || authError) && (
                        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error || authError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="mt-6">
                        <div className="mt-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Email Address
                            </label>
                            <input
                                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="mt-4">
                            <div className="flex justify-between">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Password
                                </label>
                                <button
                                    type="button"
                                    className="text-xs text-gray-500 hover:text-gray-700"
                                >
                                    Forgot Password?
                                </button>
                            </div>
                            <input
                                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="mt-8">
                            <button
                                type="submit"
                                className="font-bold py-2 px-4 w-full rounded hover:opacity-90 transition disabled:opacity-50"
                                style={{ backgroundColor: '#274135', color: 'white' }}
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Logging in...
                                    </span>
                                ) : (
                                    'Login'
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Divider */}
                    <div className="mt-6 flex items-center justify-between">
                        <span className="border-b w-1/5 md:w-1/4"></span>
                        <span className="text-xs text-gray-500 uppercase">or</span>
                        <span className="border-b w-1/5 md:w-1/4"></span>
                    </div>

                    {/* Link to signup */}
                    <div className="text-center mt-6">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <Link
                                to="/signup"
                                className="font-semibold hover:underline"
                                style={{ color: '#274135' }}
                            >
                                Sign up here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
