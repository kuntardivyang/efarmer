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

        // Clear errors when user types
        if (error) setError('');
        if (authError) clearError();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        // Validate password strength
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            setLoading(false);
            return;
        }

        try {
            const { confirmPassword, ...signupData } = formData;
            const result = await signup(signupData);

            if (result.success) {
                // Redirect based on role
                if (result.user.isFarmer) {
                    navigate('/ecommerce', { replace: true });
                } else {
                    navigate('/consumer', { replace: true });
                }
            } else {
                setError(result.error || 'Registration failed. Please try again.');
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
                            "url('https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?q=80&w=1887&auto=format&fit=crop')",
                    }}
                ></div>

                {/* Right side form */}
                <div className="w-full p-8 lg:w-1/2">
                    <Link to="/">
                        <h2 className="text-2xl font-semibold text-center" style={{ color: '#274135' }}>
                            eFarmer
                        </h2>
                    </Link>
                    <p className="text-xl text-gray-600 text-center mt-2">Create your account</p>

                    {/* Error message */}
                    {(error || authError) && (
                        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error || authError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="mt-6">
                        {/* Role selection */}
                        <div className="flex justify-center space-x-8 mb-4">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="isFarmer"
                                    value="true"
                                    checked={formData.isFarmer === true}
                                    onChange={handleChange}
                                    className="form-radio h-4 w-4 text-green-600"
                                    disabled={loading}
                                />
                                <span className="ml-2 text-gray-700 font-medium">I'm a Farmer</span>
                            </label>
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="isFarmer"
                                    value="false"
                                    checked={formData.isFarmer === false}
                                    onChange={handleChange}
                                    className="form-radio h-4 w-4 text-green-600"
                                    disabled={loading}
                                />
                                <span className="ml-2 text-gray-700 font-medium">I'm a Customer</span>
                            </label>
                        </div>

                        <div className="mt-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Full Name
                            </label>
                            <input
                                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                required
                                disabled={loading}
                            />
                        </div>

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
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Phone Number
                            </label>
                            <input
                                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter your phone number"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="mt-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Password
                            </label>
                            <input
                                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Create a password (min 6 characters)"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="mt-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Confirm Password
                            </label>
                            <input
                                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
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
                                        Creating account...
                                    </span>
                                ) : (
                                    'Sign Up'
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

                    {/* Link to login */}
                    <div className="text-center mt-6">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="font-semibold hover:underline"
                                style={{ color: '#274135' }}
                            >
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
