import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { Navbar } from '../base/Navbar';
import Footer from '../base/Footer';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';

const UploadComponent = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [confidence, setConfidence] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const navigate = useNavigate();

    const handleFileSelect = useCallback((file) => {
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
            setPrediction(null);
            setConfidence(null);
            setError(null);
        } else {
            setError('Please select a valid image file');
        }
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        handleFileSelect(file);
    }, [handleFileSelect]);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        handleFileSelect(file);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError('Please select an image first');
            return;
        }

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await axios.post(API_ENDPOINTS.ML.PREDICT_DISEASE, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data.success) {
                setPrediction(response.data.data.predicted_class);
                setConfidence(response.data.data.confidence);
            } else {
                setError('Failed to analyze image. Please try again.');
            }
        } catch (err) {
            console.error('Error uploading file:', err);
            setError('Failed to analyze image. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setSelectedFile(null);
        setPreview(null);
        setPrediction(null);
        setConfidence(null);
        setError(null);
    };

    const getResultInfo = () => {
        switch (prediction) {
            case 'Healthy':
                return {
                    color: 'from-green-500 to-emerald-500',
                    bgColor: 'bg-green-500/10',
                    borderColor: 'border-green-500/30',
                    textColor: 'text-green-400',
                    icon: (
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ),
                    message: 'Great news! Your plant appears to be healthy.',
                    action: null,
                };
            case 'Rust':
                return {
                    color: 'from-orange-500 to-red-500',
                    bgColor: 'bg-orange-500/10',
                    borderColor: 'border-orange-500/30',
                    textColor: 'text-orange-400',
                    icon: (
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    ),
                    message: 'Rust disease detected. Immediate action recommended.',
                    action: '/rsolution',
                };
            case 'Powdery':
                return {
                    color: 'from-purple-500 to-pink-500',
                    bgColor: 'bg-purple-500/10',
                    borderColor: 'border-purple-500/30',
                    textColor: 'text-purple-400',
                    icon: (
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    ),
                    message: 'Powdery mildew detected. Treatment options available.',
                    action: '/psolution',
                };
            default:
                return null;
        }
    };

    const resultInfo = prediction ? getResultInfo() : null;

    return (
        <div className="min-h-screen bg-slate-900">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-24 pb-12 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 gradient-mesh opacity-50"></div>
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"></div>
                </div>

                <div className="relative container mx-auto px-6">
                    {/* Header */}
                    <div className="text-center mb-12 animate-fade-in-up">
                        <span className="inline-block px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-6">
                            AI-Powered Analysis
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Plant Disease
                            <span className="gradient-text"> Detection</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Upload a photo of your plant leaf and our AI will instantly identify any diseases with 99% accuracy.
                        </p>
                    </div>

                    {/* Main Content */}
                    <div className="max-w-4xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Upload Section */}
                            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                                <div className="glass-card p-6 h-full">
                                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Upload Image
                                    </h2>

                                    {/* Drop Zone */}
                                    <div
                                        onDrop={handleDrop}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer ${
                                            isDragging
                                                ? 'border-green-500 bg-green-500/10'
                                                : preview
                                                ? 'border-green-500/30 bg-slate-800/50'
                                                : 'border-slate-600 hover:border-green-500/50 hover:bg-slate-800/30'
                                        }`}
                                    >
                                        <input
                                            type="file"
                                            onChange={handleFileChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            accept="image/*"
                                        />

                                        {preview ? (
                                            <div className="relative">
                                                <img
                                                    src={preview}
                                                    alt="Preview"
                                                    className="max-h-64 mx-auto rounded-xl object-contain"
                                                />
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleReset();
                                                    }}
                                                    className="absolute top-2 right-2 p-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                <div className="w-16 h-16 mx-auto rounded-full bg-green-500/10 flex items-center justify-center">
                                                    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium">Drag & drop your image here</p>
                                                    <p className="text-gray-500 text-sm mt-1">or click to browse</p>
                                                </div>
                                                <p className="text-gray-600 text-xs">Supports: JPG, PNG, WEBP (max 10MB)</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Error Message */}
                                    {error && (
                                        <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center gap-3">
                                            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>{error}</span>
                                        </div>
                                    )}

                                    {/* Analyze Button */}
                                    <button
                                        onClick={handleUpload}
                                        disabled={!selectedFile || loading}
                                        className={`w-full mt-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                                            selectedFile && !loading
                                                ? 'btn-premium'
                                                : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                                        }`}
                                    >
                                        {loading ? (
                                            <>
                                                <div className="loader-spinner w-5 h-5 border-2"></div>
                                                <span>Analyzing...</span>
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                </svg>
                                                <span>Analyze Image</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Results Section */}
                            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                                <div className="glass-card p-6 h-full">
                                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                        </svg>
                                        Analysis Results
                                    </h2>

                                    {prediction && resultInfo ? (
                                        <div className="animate-scale-in">
                                            {/* Result Card */}
                                            <div className={`p-6 rounded-2xl ${resultInfo.bgColor} border ${resultInfo.borderColor} mb-6`}>
                                                <div className="flex items-start gap-4">
                                                    <div className={resultInfo.textColor}>
                                                        {resultInfo.icon}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className={`text-2xl font-bold ${resultInfo.textColor} mb-2`}>
                                                            {prediction}
                                                        </h3>
                                                        <p className="text-gray-400 mb-4">
                                                            {resultInfo.message}
                                                        </p>

                                                        {/* Confidence Bar */}
                                                        {confidence && (
                                                            <div>
                                                                <div className="flex justify-between text-sm mb-2">
                                                                    <span className="text-gray-500">Confidence</span>
                                                                    <span className={resultInfo.textColor}>
                                                                        {(confidence * 100).toFixed(1)}%
                                                                    </span>
                                                                </div>
                                                                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                                                    <div
                                                                        className={`h-full bg-gradient-to-r ${resultInfo.color} rounded-full transition-all duration-1000`}
                                                                        style={{ width: `${confidence * 100}%` }}
                                                                    ></div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-3">
                                                {resultInfo.action && (
                                                    <button
                                                        onClick={() => navigate(resultInfo.action)}
                                                        className="flex-1 btn-premium py-3"
                                                    >
                                                        View Treatment
                                                    </button>
                                                )}
                                                <button
                                                    onClick={handleReset}
                                                    className="flex-1 py-3 rounded-xl bg-slate-700 text-white font-semibold hover:bg-slate-600 transition-colors"
                                                >
                                                    Analyze Another
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="h-64 flex flex-col items-center justify-center text-center">
                                            <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mb-4">
                                                <svg className="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                                </svg>
                                            </div>
                                            <p className="text-gray-500 mb-2">No results yet</p>
                                            <p className="text-gray-600 text-sm">Upload an image to get started</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Tips Section */}
                        <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                            <h3 className="text-lg font-semibold text-white mb-4">Tips for Best Results</h3>
                            <div className="grid sm:grid-cols-3 gap-4">
                                {[
                                    { icon: '📸', title: 'Clear Photo', desc: 'Ensure good lighting and focus on the affected area' },
                                    { icon: '🍃', title: 'Single Leaf', desc: 'Capture one leaf at a time for accurate detection' },
                                    { icon: '🔍', title: 'Close Up', desc: 'Get close enough to show disease symptoms clearly' },
                                ].map((tip) => (
                                    <div key={tip.title} className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                                        <div className="text-2xl mb-2">{tip.icon}</div>
                                        <h4 className="text-white font-medium mb-1">{tip.title}</h4>
                                        <p className="text-gray-500 text-sm">{tip.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default UploadComponent;
