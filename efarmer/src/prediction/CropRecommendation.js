import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { Navbar } from '../base/Navbar';
import Footer from '../base/Footer';

// Crop data with icons and colors
const cropData = {
    rice: { icon: '🌾', color: 'from-amber-500 to-yellow-600', name: 'Rice' },
    maize: { icon: '🌽', color: 'from-yellow-500 to-orange-500', name: 'Maize' },
    chickpea: { icon: '🫘', color: 'from-amber-600 to-amber-700', name: 'Chickpea' },
    kidneybeans: { icon: '🫘', color: 'from-red-500 to-red-600', name: 'Kidney Beans' },
    pigeonpeas: { icon: '🫛', color: 'from-green-600 to-green-700', name: 'Pigeon Peas' },
    mothbeans: { icon: '🫘', color: 'from-amber-500 to-amber-600', name: 'Moth Beans' },
    mungbean: { icon: '🫛', color: 'from-green-500 to-green-600', name: 'Mung Bean' },
    blackgram: { icon: '🫘', color: 'from-gray-700 to-gray-800', name: 'Black Gram' },
    lentil: { icon: '🫘', color: 'from-orange-500 to-orange-600', name: 'Lentil' },
    pomegranate: { icon: '🍎', color: 'from-red-500 to-pink-500', name: 'Pomegranate' },
    banana: { icon: '🍌', color: 'from-yellow-400 to-yellow-500', name: 'Banana' },
    mango: { icon: '🥭', color: 'from-orange-400 to-yellow-500', name: 'Mango' },
    grapes: { icon: '🍇', color: 'from-purple-500 to-purple-600', name: 'Grapes' },
    watermelon: { icon: '🍉', color: 'from-green-500 to-red-400', name: 'Watermelon' },
    muskmelon: { icon: '🍈', color: 'from-yellow-400 to-green-400', name: 'Muskmelon' },
    apple: { icon: '🍎', color: 'from-red-400 to-red-500', name: 'Apple' },
    orange: { icon: '🍊', color: 'from-orange-400 to-orange-500', name: 'Orange' },
    papaya: { icon: '🍈', color: 'from-orange-400 to-yellow-400', name: 'Papaya' },
    coconut: { icon: '🥥', color: 'from-amber-600 to-amber-700', name: 'Coconut' },
    cotton: { icon: '☁️', color: 'from-gray-200 to-gray-300', name: 'Cotton' },
    jute: { icon: '🌿', color: 'from-green-600 to-green-700', name: 'Jute' },
    coffee: { icon: '☕', color: 'from-amber-700 to-amber-800', name: 'Coffee' },
};

const inputFields = [
    { name: 'N', label: 'Nitrogen (N)', placeholder: 'e.g., 90', icon: '🧪', unit: 'kg/ha', info: 'Nitrogen content in soil' },
    { name: 'P', label: 'Phosphorus (P)', placeholder: 'e.g., 42', icon: '⚗️', unit: 'kg/ha', info: 'Phosphorus content in soil' },
    { name: 'K', label: 'Potassium (K)', placeholder: 'e.g., 43', icon: '🔬', unit: 'kg/ha', info: 'Potassium content in soil' },
    { name: 'temperature', label: 'Temperature', placeholder: 'e.g., 25', icon: '🌡️', unit: '°C', info: 'Average temperature' },
    { name: 'humidity', label: 'Humidity', placeholder: 'e.g., 80', icon: '💧', unit: '%', info: 'Relative humidity' },
    { name: 'ph', label: 'Soil pH', placeholder: 'e.g., 6.5', icon: '📊', unit: 'pH', info: 'Soil pH level (0-14)' },
    { name: 'rainfall', label: 'Rainfall', placeholder: 'e.g., 200', icon: '🌧️', unit: 'mm', info: 'Annual rainfall' },
];

function CropRecommendation() {
    const [formData, setFormData] = useState({
        N: '',
        P: '',
        K: '',
        temperature: '',
        humidity: '',
        ph: '',
        rainfall: ''
    });
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = useCallback((event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError(null);
    }, []);

    const validateForm = useCallback(() => {
        for (const field of inputFields) {
            if (!formData[field.name]) {
                return `Please enter ${field.label}`;
            }
            const value = parseFloat(formData[field.name]);
            if (isNaN(value)) {
                return `${field.label} must be a number`;
            }
        }
        return null;
    }, [formData]);

    const handleRecommend = async () => {
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:8000/api/recommend_crop/', formData, {
                headers: { 'Content-Type': 'application/json' }
            });
            // Backend returns { success: true, data: { predicted_crop: "..." } }
            setPrediction(response.data.data.predicted_crop);
        } catch (err) {
            console.error('Error fetching crop recommendation:', err);
            setError('Failed to get recommendation. Please check if the server is running.');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setFormData({
            N: '',
            P: '',
            K: '',
            temperature: '',
            humidity: '',
            ph: '',
            rainfall: ''
        });
        setPrediction(null);
        setError(null);
    };

    const getCropInfo = (cropName) => {
        const key = cropName?.toLowerCase().replace(/\s+/g, '');
        return cropData[key] || { icon: '🌱', color: 'from-green-500 to-emerald-600', name: cropName };
    };

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
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-6">
                            AI-Powered Recommendations
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Smart Crop
                            <span className="block mt-2 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                                Recommendation
                            </span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Enter your soil and climate data to get personalized crop recommendations powered by machine learning.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
                        {/* Input Form */}
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl blur-lg opacity-20"></div>
                            <div className="relative p-8 rounded-3xl bg-slate-800/80 backdrop-blur-xl border border-slate-700/50">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-xl">
                                        📊
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white">Input Parameters</h2>
                                        <p className="text-sm text-gray-400">Enter soil and climate data</p>
                                    </div>
                                </div>

                                {/* Error message */}
                                {error && (
                                    <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3">
                                        <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p className="text-red-400 text-sm">{error}</p>
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-4">
                                    {inputFields.map((field) => (
                                        <div key={field.name} className={field.name === 'rainfall' ? 'col-span-2' : ''}>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                <span className="mr-2">{field.icon}</span>
                                                {field.label}
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    name={field.name}
                                                    placeholder={field.placeholder}
                                                    value={formData[field.name]}
                                                    onChange={handleInputChange}
                                                    disabled={loading}
                                                    className="w-full px-4 py-3 pr-16 rounded-xl bg-slate-900/50 border border-slate-600/50 text-white placeholder-gray-500 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 disabled:opacity-50"
                                                />
                                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                                                    {field.unit}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-4 mt-8">
                                    <button
                                        onClick={handleRecommend}
                                        disabled={loading}
                                        className="flex-1 py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                                    >
                                        {loading ? (
                                            <>
                                                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Analyzing...
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                                </svg>
                                                Get Recommendation
                                            </>
                                        )}
                                    </button>
                                    <button
                                        onClick={handleReset}
                                        disabled={loading}
                                        className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 hover:border-white/20 transition-all duration-300 disabled:opacity-50"
                                    >
                                        Reset
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Results Section */}
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-3xl blur-lg opacity-20"></div>
                            <div className="relative p-8 rounded-3xl bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 min-h-[500px] flex flex-col">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white text-xl">
                                        🌱
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white">Recommendation</h2>
                                        <p className="text-sm text-gray-400">AI-powered crop suggestion</p>
                                    </div>
                                </div>

                                {prediction ? (
                                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                                        {/* Crop Result */}
                                        <div className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${getCropInfo(prediction).color} flex items-center justify-center text-6xl shadow-2xl mb-6`}>
                                            {getCropInfo(prediction).icon}
                                        </div>
                                        <h3 className="text-3xl font-bold text-white mb-2">
                                            {getCropInfo(prediction).name || prediction}
                                        </h3>
                                        <p className="text-gray-400 mb-8">
                                            Recommended based on your soil and climate conditions
                                        </p>

                                        {/* Confidence Badge */}
                                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
                                            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-green-400 font-medium">ML Prediction</span>
                                        </div>

                                        {/* Tips */}
                                        <div className="mt-8 p-4 rounded-xl bg-slate-900/50 border border-slate-700/50 w-full text-left">
                                            <h4 className="text-sm font-medium text-white mb-2">Growing Tips</h4>
                                            <ul className="text-sm text-gray-400 space-y-1">
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-400">•</span>
                                                    Ensure proper irrigation based on crop requirements
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-400">•</span>
                                                    Monitor soil nutrients regularly
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-400">•</span>
                                                    Watch for common diseases and pests
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                                        <div className="w-24 h-24 rounded-full bg-slate-700/50 flex items-center justify-center text-4xl mb-6">
                                            🌾
                                        </div>
                                        <h3 className="text-xl font-semibold text-white mb-2">No Recommendation Yet</h3>
                                        <p className="text-gray-400 max-w-sm">
                                            Enter your soil parameters and climate data to get a personalized crop recommendation.
                                        </p>

                                        {/* Feature highlights */}
                                        <div className="mt-8 grid grid-cols-2 gap-4 w-full">
                                            {[
                                                { icon: '🤖', text: 'ML Powered' },
                                                { icon: '📊', text: 'Data Driven' },
                                                { icon: '🎯', text: 'Accurate' },
                                                { icon: '⚡', text: 'Instant' },
                                            ].map((item) => (
                                                <div key={item.text} className="p-3 rounded-xl bg-slate-900/50 border border-slate-700/50 flex items-center gap-2">
                                                    <span className="text-xl">{item.icon}</span>
                                                    <span className="text-sm text-gray-400">{item.text}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Info Section */}
            <section className="py-20 bg-slate-950">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Our ML model analyzes your input data and suggests the most suitable crop for your conditions.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {[
                            { step: '1', icon: '📝', title: 'Input Data', desc: 'Enter soil nutrients, temperature, humidity, pH, and rainfall data' },
                            { step: '2', icon: '🤖', title: 'AI Analysis', desc: 'Our ML model processes your data against trained patterns' },
                            { step: '3', icon: '🌱', title: 'Get Result', desc: 'Receive personalized crop recommendation instantly' },
                        ].map((item, index) => (
                            <div key={item.step} className="relative group">
                                {index < 2 && (
                                    <div className="hidden md:block absolute top-1/2 left-full w-full h-px bg-gradient-to-r from-green-500/50 to-transparent -translate-y-1/2 z-0"></div>
                                )}
                                <div className="relative p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-green-500/30 transition-all duration-300 text-center group-hover:-translate-y-2">
                                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-3xl mb-4 shadow-lg shadow-green-500/20">
                                        {item.icon}
                                    </div>
                                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">
                                        {item.step}
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                                    <p className="text-gray-400 text-sm">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default CropRecommendation;
