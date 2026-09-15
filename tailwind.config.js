/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                mint: {
                    DEFAULT: '#10B981',
                    hover: '#059669',
                    light: '#ECFDF5',
                    dark: '#047857',
                    deep: '#064E3B',
                },
                emeraldPalette: {
                    1: '#ECFDF5',
                    2: '#10B981',
                    3: '#059669',
                    4: '#047857',
                    5: '#064E3B',
                },
            },
            animation: {
                'fade-in': 'fadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'fade-in-scale': 'fadeInScale 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'float': 'floatSlow 4s ease-in-out infinite',
                'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
                'slide-down': 'slideDown 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'slide-up': 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            },
            keyframes: {
                fadeIn: {
                    'from': { opacity: '0', transform: 'translateY(10px)' },
                    'to': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInScale: {
                    'from': { opacity: '0', transform: 'scale(0.96) translateY(6px)' },
                    'to': { opacity: '1', transform: 'scale(1) translateY(0)' },
                },
                floatSlow: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-6px)' },
                },
                pulseGlow: {
                    '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
                    '50%': { opacity: '0.8', transform: 'scale(1.05)' },
                },
                slideDown: {
                    'from': { opacity: '0', transform: 'translateY(-12px)' },
                    'to': { opacity: '1', transform: 'translateY(0)' },
                },
                slideUp: {
                    'from': { opacity: '0', transform: 'translateY(16px)' },
                    'to': { opacity: '1', transform: 'translateY(0)' },
                },
            }
        },
    },
    plugins: [],
}