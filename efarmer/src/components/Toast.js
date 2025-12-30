import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';

// Toast context
const ToastContext = createContext(null);

// Toast types and their styles
const TOAST_TYPES = {
    success: {
        gradient: 'from-green-500 to-emerald-600',
        border: 'border-green-400/30',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    error: {
        gradient: 'from-red-500 to-rose-600',
        border: 'border-red-400/30',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    warning: {
        gradient: 'from-amber-500 to-orange-600',
        border: 'border-amber-400/30',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        ),
    },
    info: {
        gradient: 'from-blue-500 to-cyan-600',
        border: 'border-blue-400/30',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
};

// Individual Toast component
const ToastItem = ({ toast, onRemove }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [progress, setProgress] = useState(100);
    const { gradient, border, icon } = TOAST_TYPES[toast.type] || TOAST_TYPES.info;
    const duration = toast.duration || 5000;

    useEffect(() => {
        // Trigger enter animation
        requestAnimationFrame(() => setIsVisible(true));

        // Progress bar animation
        const startTime = Date.now();
        const progressInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
            setProgress(remaining);
        }, 50);

        // Auto-dismiss
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => onRemove(toast.id), 400);
        }, duration);

        return () => {
            clearTimeout(timer);
            clearInterval(progressInterval);
        };
    }, [toast, duration, onRemove]);

    return (
        <div
            className={`transform transition-all duration-400 ease-out ${
                isVisible
                    ? 'translate-x-0 opacity-100 scale-100'
                    : 'translate-x-full opacity-0 scale-95'
            }`}
        >
            <div className={`relative overflow-hidden backdrop-blur-xl bg-slate-900/90 border ${border} rounded-2xl shadow-2xl shadow-black/20 min-w-[320px] max-w-md`}>
                {/* Gradient accent line */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`} />

                {/* Progress bar */}
                <div
                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${gradient} transition-all duration-100 ease-linear`}
                    style={{ width: `${progress}%` }}
                />

                <div className="p-4 flex items-start gap-3">
                    {/* Icon with gradient background */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg`}>
                        {icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-1">
                        <p className="text-sm font-medium text-white leading-relaxed">
                            {toast.message}
                        </p>
                        {toast.description && (
                            <p className="mt-1 text-xs text-gray-400">{toast.description}</p>
                        )}
                    </div>

                    {/* Close button */}
                    <button
                        onClick={() => {
                            setIsVisible(false);
                            setTimeout(() => onRemove(toast.id), 400);
                        }}
                        className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

// Toast container component
const ToastContainer = ({ toasts, removeToast }) => {
    return (
        <div className="fixed top-4 right-4 z-[9999] space-y-3 pointer-events-none">
            {toasts.map((toast) => (
                <div key={toast.id} className="pointer-events-auto">
                    <ToastItem toast={toast} onRemove={removeToast} />
                </div>
            ))}
        </div>
    );
};

// Toast Provider
export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info', options = {}) => {
        const id = Date.now() + Math.random();
        const { duration = 5000, description } = typeof options === 'object' ? options : { duration: options };
        setToasts((prev) => [...prev, { id, message, type, duration, description }]);
        return id;
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const toast = {
        success: (message, options) => addToast(message, 'success', options),
        error: (message, options) => addToast(message, 'error', options),
        warning: (message, options) => addToast(message, 'warning', options),
        info: (message, options) => addToast(message, 'info', options),
        dismiss: removeToast,
        dismissAll: () => setToasts([]),
    };

    return (
        <ToastContext.Provider value={toast}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    );
};

// Hook to use toast
export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export default ToastProvider;
