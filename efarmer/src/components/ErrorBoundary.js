import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });

        // Log error to console (in production, send to error tracking service)
        console.error('Error caught by boundary:', error, errorInfo);
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-slate-900 overflow-hidden relative px-4">
                    {/* Animated background */}
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-slate-900 to-slate-900"></div>
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                    </div>

                    <div className="relative z-10 max-w-lg w-full">
                        {/* Error card */}
                        <div className="relative">
                            {/* Glow effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl blur-lg opacity-30"></div>

                            <div className="relative p-8 lg:p-12 rounded-3xl bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 text-center">
                                {/* Error icon */}
                                <div className="mb-8">
                                    <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-2xl shadow-red-500/20">
                                        <svg
                                            className="w-12 h-12 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                            />
                                        </svg>
                                    </div>
                                </div>

                                {/* Error text */}
                                <h1 className="text-3xl font-bold text-white mb-4">
                                    Oops! Something went wrong
                                </h1>
                                <p className="text-gray-400 mb-8 leading-relaxed">
                                    We're sorry, but something unexpected happened. Please try refreshing the page or go back to the home page.
                                </p>

                                {/* Action buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <button
                                        onClick={this.handleReload}
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transform hover:-translate-y-0.5 transition-all duration-300"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        Refresh Page
                                    </button>
                                    <Link
                                        to="/"
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 hover:border-white/20 transform hover:-translate-y-0.5 transition-all duration-300"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                        Go Home
                                    </Link>
                                </div>

                                {/* Development error details */}
                                {process.env.NODE_ENV === 'development' && this.state.error && (
                                    <div className="mt-8 text-left">
                                        <details className="group">
                                            <summary className="cursor-pointer text-sm font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                                                <svg className="w-4 h-4 transform group-open:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                </svg>
                                                Error Details (Development Only)
                                            </summary>
                                            <div className="mt-4 p-4 rounded-xl bg-slate-900/50 border border-slate-700/50">
                                                <pre className="text-xs text-red-400 overflow-auto whitespace-pre-wrap">
                                                    {this.state.error.toString()}
                                                    {this.state.errorInfo?.componentStack}
                                                </pre>
                                            </div>
                                        </details>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Help text */}
                        <p className="mt-8 text-center text-gray-500 text-sm">
                            If this problem persists, please{' '}
                            <Link to="/contact" className="text-green-400 hover:text-green-300 transition-colors">
                                contact support
                            </Link>
                        </p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
