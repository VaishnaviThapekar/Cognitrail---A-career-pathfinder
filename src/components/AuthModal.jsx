import React, { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function AuthModal({ isOpen, onClose, darkMode, initialMode = 'signin' }) {
    const { signIn, signUp } = useAuth();
    const [mode, setMode] = useState(initialMode); // 'signin' or 'signup'
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    // Validation errors
    const [validationErrors, setValidationErrors] = useState({});

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear validation error for this field
        if (validationErrors[name]) {
            setValidationErrors(prev => ({ ...prev, [name]: '' }));
        }
        setError('');
    };

    const validateForm = () => {
        const errors = {};

        if (mode === 'signup' && !formData.name.trim()) {
            errors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Invalid email format';
        }

        if (!formData.password) {
            errors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        if (mode === 'signup') {
            if (!formData.confirmPassword) {
                errors.confirmPassword = 'Please confirm your password';
            } else if (formData.password !== formData.confirmPassword) {
                errors.confirmPassword = 'Passwords do not match';
            }
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) return;

        setLoading(true);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        if (mode === 'signin') {
            const result = signIn(formData.email, formData.password);
            if (result.success) {
                onClose();
                // Reset form
                setFormData({ name: '', email: '', password: '', confirmPassword: '' });
            } else {
                setError(result.error);
            }
        } else {
            const result = signUp({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });

            if (result.success) {
                onClose();
                setFormData({ name: '', email: '', password: '', confirmPassword: '' });
            } else {
                setError('An account with this email already exists');
            }
        }

        setLoading(false);
    };

    const switchMode = () => {
        setMode(mode === 'signin' ? 'signup' : 'signin');
        setError('');
        setValidationErrors({});
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div
                className={`relative w-full max-w-md rounded-2xl shadow-2xl overflow-hidden transform transition-all ${darkMode ? 'bg-[#1a1f2e]' : 'bg-white'
                    }`}
            >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 animate-gradient"></div>

                {/* Close button */}
                <button
                    onClick={onClose}
                    className={`absolute top-4 right-4 p-2 rounded-xl transition-all z-10 ${darkMode
                        ? 'hover:bg-[#272757] text-gray-400 hover:text-white'
                        : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                        }`}
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="relative p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${darkMode
                            ? 'bg-gradient-to-br from-[#272757] to-[#505081]'
                            : 'bg-gradient-to-br from-indigo-500 to-purple-600'
                            }`}>
                            <Sparkles className="w-8 h-8 text-white" />
                        </div>

                        <h2 className={`text-3xl font-black mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {mode === 'signin' ? 'Welcome Back!' : 'Join COGNITRIAL'}
                        </h2>

                        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {mode === 'signin'
                                ? 'Sign in to continue your career journey'
                                : 'Start your personalized career exploration'}
                        </p>
                    </div>

                    {/* Error message */}
                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                            <p className="text-red-500 text-sm text-center">{error}</p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name field (signup only) */}
                        {mode === 'signup' && (
                            <div>
                                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'
                                        }`} />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Enter your full name"
                                        className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all outline-none ${validationErrors.name
                                            ? 'border-red-500 focus:border-red-600'
                                            : darkMode
                                                ? 'bg-[#272757] border-[#505081] text-white placeholder-gray-500 focus:border-indigo-500'
                                                : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-indigo-500'
                                            }`}
                                    />
                                </div>
                                {validationErrors.name && (
                                    <p className="mt-1 text-sm text-red-500">{validationErrors.name}</p>
                                )}
                            </div>
                        )}

                        {/* Email field */}
                        <div>
                            <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'
                                    }`} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="your.email@example.com"
                                    className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all outline-none ${validationErrors.email
                                        ? 'border-red-500 focus:border-red-600'
                                        : darkMode
                                            ? 'bg-[#272757] border-[#505081] text-white placeholder-gray-500 focus:border-indigo-500'
                                            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-indigo-500'
                                        }`}
                                />
                            </div>
                            {validationErrors.email && (
                                <p className="mt-1 text-sm text-red-500">{validationErrors.email}</p>
                            )}
                        </div>

                        {/* Password field */}
                        <div>
                            <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Password
                            </label>
                            <div className="relative">
                                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'
                                    }`} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Enter your password"
                                    className={`w-full pl-12 pr-12 py-3 rounded-xl border-2 transition-all outline-none ${validationErrors.password
                                        ? 'border-red-500 focus:border-red-600'
                                        : darkMode
                                            ? 'bg-[#272757] border-[#505081] text-white placeholder-gray-500 focus:border-indigo-500'
                                            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-indigo-500'
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className={`absolute right-4 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                                        }`}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {validationErrors.password && (
                                <p className="mt-1 text-sm text-red-500">{validationErrors.password}</p>
                            )}
                        </div>

                        {/* Confirm Password (signup only) */}
                        {mode === 'signup' && (
                            <div>
                                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <CheckCircle2 className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'
                                        }`} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        placeholder="Confirm your password"
                                        className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all outline-none ${validationErrors.confirmPassword
                                            ? 'border-red-500 focus:border-red-600'
                                            : darkMode
                                                ? 'bg-[#272757] border-[#505081] text-white placeholder-gray-500 focus:border-indigo-500'
                                                : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-indigo-500'
                                            }`}
                                    />
                                </div>
                                {validationErrors.confirmPassword && (
                                    <p className="mt-1 text-sm text-red-500">{validationErrors.confirmPassword}</p>
                                )}
                            </div>
                        )}

                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 rounded-xl font-bold text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] ${loading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                                }`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    {mode === 'signin' ? 'Signing In...' : 'Creating Account...'}
                                </span>
                            ) : (
                                mode === 'signin' ? 'Sign In' : 'Create Account'
                            )}
                        </button>
                    </form>

                    {/* Switch mode */}
                    <div className="mt-6 text-center">
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
                            <button
                                onClick={switchMode}
                                className={`font-bold ${darkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'
                                    }`}
                            >
                                {mode === 'signin' ? 'Sign Up' : 'Sign In'}
                            </button>
                        </p>
                    </div>

                    {/* Social signin (optional - for future) */}
                    {mode === 'signin' && (
                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className={`w-full border-t ${darkMode ? 'border-[#272757]' : 'border-gray-200'}`}></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className={`px-4 ${darkMode ? 'bg-[#1a1f2e] text-gray-500' : 'bg-white text-gray-500'}`}>
                                        Demo Account
                                    </span>
                                </div>
                            </div>

                            <p className={`mt-4 text-xs text-center ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                Email: demo@cognitrial.com | Password: demo123
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}