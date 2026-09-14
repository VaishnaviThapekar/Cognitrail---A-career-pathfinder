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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
            <div
                className={`relative w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border transition-all duration-300 ${
                    darkMode 
                        ? 'bg-[#121215] border-zinc-800 text-white' 
                        : 'bg-white border-zinc-200 text-black'
                }`}
            >
                {/* Subtle monochrome ambient light */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

                {/* Close button */}
                <button
                    onClick={onClose}
                    className={`absolute top-4 right-4 p-2 rounded-xl transition-all z-10 btn-interactive ${
                        darkMode
                            ? 'hover:bg-zinc-800 text-zinc-400 hover:text-white'
                            : 'hover:bg-zinc-100 text-zinc-600 hover:text-black'
                    }`}
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="relative p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 border transition-transform hover:scale-105 ${
                            darkMode
                                ? 'bg-zinc-900 border-zinc-800 text-white shadow-inner'
                                : 'bg-zinc-100 border-zinc-200 text-black'
                        }`}>
                            <Sparkles className="w-7 h-7" />
                        </div>

                        <h2 className="text-2xl font-black tracking-tight mb-2">
                            {mode === 'signin' ? 'Welcome Back' : 'Join Cognitrail'}
                        </h2>

                        <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                            {mode === 'signin'
                                ? 'Sign in to continue your personalized career journey'
                                : 'Create your account to unlock AI roadmaps and tools'}
                        </p>
                    </div>

                    {/* Error message */}
                    {error && (
                        <div className={`mb-6 p-4 rounded-xl border text-sm text-center ${
                            darkMode ? 'bg-zinc-900 border-red-500/40 text-red-400' : 'bg-red-50 border-red-200 text-red-600'
                        }`}>
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name field (signup only) */}
                        {mode === 'signup' && (
                            <div>
                                <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`} />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Enter your full name"
                                        className={`w-full pl-11 pr-4 py-3 rounded-xl border transition-all text-sm outline-none ${
                                            validationErrors.name
                                                ? 'border-red-500 focus:border-red-600'
                                                : darkMode
                                                    ? 'bg-zinc-900/90 border-zinc-800 text-white placeholder-zinc-500 focus:border-zinc-400'
                                                    : 'bg-zinc-50 border-zinc-200 text-black placeholder-zinc-400 focus:border-black'
                                        }`}
                                    />
                                </div>
                                {validationErrors.name && (
                                    <p className="mt-1 text-xs text-red-500">{validationErrors.name}</p>
                                )}
                            </div>
                        )}

                        {/* Email field */}
                        <div>
                            <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="your.email@example.com"
                                    className={`w-full pl-11 pr-4 py-3 rounded-xl border transition-all text-sm outline-none ${
                                        validationErrors.email
                                            ? 'border-red-500 focus:border-red-600'
                                            : darkMode
                                                ? 'bg-zinc-900/90 border-zinc-800 text-white placeholder-zinc-500 focus:border-zinc-400'
                                                : 'bg-zinc-50 border-zinc-200 text-black placeholder-zinc-400 focus:border-black'
                                    }`}
                                />
                            </div>
                            {validationErrors.email && (
                                <p className="mt-1 text-xs text-red-500">{validationErrors.email}</p>
                            )}
                        </div>

                        {/* Password field */}
                        <div>
                            <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                Password
                            </label>
                            <div className="relative">
                                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Enter your password"
                                    className={`w-full pl-11 pr-11 py-3 rounded-xl border transition-all text-sm outline-none ${
                                        validationErrors.password
                                            ? 'border-red-500 focus:border-red-600'
                                            : darkMode
                                                ? 'bg-zinc-900/90 border-zinc-800 text-white placeholder-zinc-500 focus:border-zinc-400'
                                                : 'bg-zinc-50 border-zinc-200 text-black placeholder-zinc-400 focus:border-black'
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className={`absolute right-4 top-1/2 -translate-y-1/2 ${
                                        darkMode ? 'text-zinc-500 hover:text-zinc-300' : 'text-zinc-400 hover:text-zinc-700'
                                    }`}
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {validationErrors.password && (
                                <p className="mt-1 text-xs text-red-500">{validationErrors.password}</p>
                            )}
                        </div>

                        {/* Confirm Password (signup only) */}
                        {mode === 'signup' && (
                            <div>
                                <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <CheckCircle2 className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        placeholder="Confirm your password"
                                        className={`w-full pl-11 pr-4 py-3 rounded-xl border transition-all text-sm outline-none ${
                                            validationErrors.confirmPassword
                                                ? 'border-red-500 focus:border-red-600'
                                                : darkMode
                                                    ? 'bg-zinc-900/90 border-zinc-800 text-white placeholder-zinc-500 focus:border-zinc-400'
                                                    : 'bg-zinc-50 border-zinc-200 text-black placeholder-zinc-400 focus:border-black'
                                        }`}
                                    />
                                </div>
                                {validationErrors.confirmPassword && (
                                    <p className="mt-1 text-xs text-red-500">{validationErrors.confirmPassword}</p>
                                )}
                            </div>
                        )}

                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3.5 rounded-xl font-bold transition-all text-sm btn-interactive ${
                                loading
                                    ? 'bg-zinc-400 text-white cursor-not-allowed'
                                    : darkMode
                                        ? 'bg-white text-black hover:bg-zinc-200 shadow-md'
                                        : 'bg-black text-white hover:bg-zinc-800 shadow-md'
                            }`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                    {mode === 'signin' ? 'Signing In...' : 'Creating Account...'}
                                </span>
                            ) : (
                                mode === 'signin' ? 'Sign In' : 'Create Account'
                            )}
                        </button>
                    </form>

                    {/* Switch mode */}
                    <div className="mt-6 text-center">
                        <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                            {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
                            <button
                                onClick={switchMode}
                                className={`font-bold underline-offset-4 hover:underline ml-1 ${
                                    darkMode ? 'text-white' : 'text-black'
                                }`}
                            >
                                {mode === 'signin' ? 'Sign Up' : 'Sign In'}
                            </button>
                        </p>
                    </div>

                    {/* Social signin / demo */}
                    {mode === 'signin' && (
                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className={`w-full border-t ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}></div>
                                </div>
                                <div className="relative flex justify-center text-xs">
                                    <span className={`px-3 uppercase tracking-wider font-semibold ${
                                        darkMode ? 'bg-[#121215] text-zinc-500' : 'bg-white text-zinc-400'
                                    }`}>
                                        Demo Account
                                    </span>
                                </div>
                            </div>

                            <p className={`mt-3 text-xs text-center font-mono ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
                                Email: <span className="font-semibold text-zinc-300">demo@cognitrial.com</span> | Password: <span className="font-semibold text-zinc-300">demo123</span>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}