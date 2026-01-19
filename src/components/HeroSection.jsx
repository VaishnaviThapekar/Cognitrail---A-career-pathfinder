import React from 'react';
import { Sparkles, ArrowRight, TrendingUp, Target, Zap } from 'lucide-react';

const HeroSection = ({ darkMode }) => {
  const scrollToDomains = () => {
    const domainsSection = document.getElementById('domains');
    if (domainsSection) domainsSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`relative rounded-3xl overflow-hidden mb-16 transition-colors duration-500 ${darkMode ? 'bg-[#1a1d2e]' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50'
      }`}>
      {/* Main Content Container */}
      <div className="relative grid md:grid-cols-2 gap-8 items-center p-12 md:p-16 lg:p-20">
        {/* Left Side - Text Content */}
        <div className="relative z-10">
          {/* Small Label */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 backdrop-blur-sm transition-colors duration-300 ${darkMode
            ? 'bg-gradient-to-r from-[#272757]/30 to-[#0F0E47]/30 border border-[#8686AC]/30'
            : 'bg-white/90 border border-indigo-200 shadow-lg'
            }`}>
            <Sparkles className={`w-4 h-4 ${darkMode ? 'text-[#8686AC]' : 'text-indigo-600'}`} />
            <span className={`text-sm font-semibold uppercase tracking-wide ${darkMode ? 'text-[#8686AC]' : 'text-indigo-700'
              }`}>
              Your Career Hub
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            <span className={darkMode ? 'text-white' : 'text-gray-900'}>
              Discover.
            </span>
            <br />
            <span className={darkMode ? 'text-white' : 'text-gray-900'}>
              Plan.
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#272757] via-[#505081] to-[#8686AC] animate-gradient-x">
              Achieve.
            </span>
          </h1>

          {/* Description */}
          <p className={`text-lg md:text-xl mb-8 leading-relaxed max-w-xl ${darkMode ? 'text-gray-400' : 'text-gray-700'
            }`}>
            Transform your career aspirations into achievements with our comprehensive pathfinder.
            <span className={`font-semibold ${darkMode ? 'text-white' : 'text-[#0F0E47]'}`}> Explore 150+ careers</span>, get insights on education, colleges, and salaries.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-3 mb-10">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${darkMode
              ? 'bg-[#272757]/20 border border-[#505081]/30'
              : 'bg-indigo-50 border border-indigo-200 shadow-sm'
              }`}>
              <TrendingUp className={`w-4 h-4 ${darkMode ? 'text-[#8686AC]' : 'text-indigo-600'}`} />
              <span className={`text-sm font-medium ${darkMode ? 'text-[#8686AC]' : 'text-indigo-700'}`}>Real-time Insights</span>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${darkMode
              ? 'bg-[#0F0E47]/20 border border-[#272757]/30'
              : 'bg-blue-50 border border-blue-200 shadow-sm'
              }`}>
              <Target className={`w-4 h-4 ${darkMode ? 'text-[#505081]' : 'text-blue-600'}`} />
              <span className={`text-sm font-medium ${darkMode ? 'text-[#8686AC]' : 'text-blue-700'}`}>Career Matching</span>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${darkMode
              ? 'bg-[#505081]/20 border border-[#8686AC]/30'
              : 'bg-slate-50 border border-slate-200 shadow-sm'
              }`}>
              <Zap className={`w-4 h-4 ${darkMode ? 'text-[#8686AC]' : 'text-slate-600'}`} />
              <span className={`text-sm font-medium ${darkMode ? 'text-[#8686AC]' : 'text-slate-700'}`}>Smart Guidance</span>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={scrollToDomains}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#272757] to-[#0F0E47] hover:from-[#505081] hover:to-[#272757] text-white font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#272757]/50 overflow-hidden"
          >
            {/* Animated shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

            {/* Sparkle particles on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute top-2 left-4 w-1 h-1 bg-white rounded-full animate-sparkle-1"></div>
              <div className="absolute top-4 right-8 w-1 h-1 bg-white rounded-full animate-sparkle-2"></div>
              <div className="absolute bottom-3 left-12 w-1 h-1 bg-white rounded-full animate-sparkle-3"></div>
              <div className="absolute bottom-2 right-6 w-1 h-1 bg-white rounded-full animate-sparkle-4"></div>
            </div>

            <Sparkles className="w-5 h-5 group-hover:rotate-180 group-hover:scale-125 transition-all duration-500" />
            <span className="relative z-10">Explore Careers Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
          </button>
        </div>

        {/* Right Side - Career Illustration */}
        <div className="relative hidden md:flex items-center justify-center min-h-[500px]">
          {/* Glow Background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-96 h-96 rounded-full blur-3xl animate-pulse-slow transition-opacity duration-500 ${darkMode
              ? 'bg-gradient-to-r from-[#272757]/30 via-[#505081]/30 to-[#8686AC]/30'
              : 'bg-gradient-to-r from-indigo-300/40 via-blue-300/40 to-slate-300/40'
              }`}></div>
          </div>

          {/* Career Icons */}
          <div className="relative z-10">
            {/* Graduation Cap */}
            <div className="text-[12rem] leading-none filter drop-shadow-2xl cursor-pointer hover:scale-110 transition-transform duration-500">
              🎓
            </div>

            {/* Success Star */}
            <div className="absolute top-0 right-0 text-6xl animate-bounce-slow">
              ⭐
            </div>

            {/* Floating Career Icons */}
            <div className={`absolute -top-12 -left-16 w-20 h-20 rounded-2xl bg-gradient-to-br from-[#505081] to-[#272757] flex items-center justify-center animate-float shadow-xl backdrop-blur-sm ${darkMode ? 'shadow-[#505081]/50 border border-[#8686AC]/30' : 'shadow-indigo-500/30 border border-indigo-200'
              }`}>
              <span className="text-4xl">🔬</span>
            </div>

            <div className={`absolute -top-8 -right-20 w-24 h-24 rounded-2xl bg-gradient-to-br from-[#272757] to-[#0F0E47] flex items-center justify-center animate-float animation-delay-1000 shadow-xl backdrop-blur-sm ${darkMode ? 'shadow-[#272757]/50 border border-[#505081]/30' : 'shadow-blue-500/30 border border-blue-200'
              }`}>
              <span className="text-5xl">💻</span>
            </div>

            <div className={`absolute top-20 -right-24 w-20 h-20 rounded-2xl bg-gradient-to-br from-[#8686AC] to-[#505081] flex items-center justify-center animate-float animation-delay-2000 shadow-xl backdrop-blur-sm ${darkMode ? 'shadow-[#8686AC]/50 border border-[#8686AC]/30' : 'shadow-slate-500/30 border border-slate-200'
              }`}>
              <span className="text-4xl">💼</span>
            </div>

            <div className={`absolute top-32 -left-12 w-20 h-20 rounded-2xl bg-gradient-to-br from-[#0F0E47] to-[#272757] flex items-center justify-center animate-float animation-delay-3000 shadow-xl backdrop-blur-sm ${darkMode ? 'shadow-[#0F0E47]/50 border border-[#272757]/30' : 'shadow-indigo-500/30 border border-indigo-200'
              }`}>
              <span className="text-4xl">🎨</span>
            </div>

            <div className={`absolute -bottom-8 -left-16 w-20 h-20 rounded-2xl bg-gradient-to-br from-[#505081] to-[#8686AC] flex items-center justify-center animate-float animation-delay-1500 shadow-xl backdrop-blur-sm ${darkMode ? 'shadow-[#505081]/50 border border-[#8686AC]/30' : 'shadow-blue-500/30 border border-blue-200'
              }`}>
              <span className="text-4xl">⚕️</span>
            </div>

            <div className={`absolute -bottom-12 right-8 w-20 h-20 rounded-2xl bg-gradient-to-br from-[#8686AC] to-[#505081] flex items-center justify-center animate-float animation-delay-2500 shadow-xl backdrop-blur-sm ${darkMode ? 'shadow-[#8686AC]/50 border border-[#8686AC]/30' : 'shadow-slate-500/30 border border-slate-200'
              }`}>
              <span className="text-4xl">⚖️</span>
            </div>

            {/* Orbital Paths */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ transform: 'scale(1.5)' }}>
              <circle cx="50%" cy="50%" r="120" fill="none"
                stroke={darkMode ? "url(#g1d)" : "url(#g1l)"}
                strokeWidth="2" strokeDasharray="10 5"
                className="animate-spin-slow" style={{ transformOrigin: 'center' }} />
              <circle cx="50%" cy="50%" r="160" fill="none"
                stroke={darkMode ? "url(#g2d)" : "url(#g2l)"}
                strokeWidth="2" strokeDasharray="10 5"
                className="animate-spin-reverse" style={{ transformOrigin: 'center' }} />
              <defs>
                <linearGradient id="g1d" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#272757" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#8686AC" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="g2d" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#505081" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#0F0E47" stopOpacity="0.3" />
                </linearGradient>
                <linearGradient id="g1l" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="rgb(79, 70, 229)" stopOpacity="0.3" />
                </linearGradient>
                <linearGradient id="g2l" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="rgb(100, 116, 139)" stopOpacity="0.25" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Grid Pattern */}
          <div className={`absolute inset-0 transition-opacity duration-500 ${darkMode ? 'opacity-20' : 'opacity-10'}`}>
            <div className="absolute inset-0" style={{
              backgroundImage: darkMode
                ? 'linear-gradient(rgba(39, 39, 87, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(39, 39, 87, 0.15) 1px, transparent 1px)'
                : 'linear-gradient(rgba(99, 102, 241, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.08) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}></div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className={`relative z-10 transition-colors duration-500 ${darkMode
        ? 'border-t border-[#272757] bg-black/50 backdrop-blur-sm'
        : 'border-t border-indigo-200 bg-white/60 backdrop-blur-sm'
        }`}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8">
          <div className="text-center group cursor-pointer relative overflow-hidden">
            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#8686AC]/0 via-[#8686AC]/20 to-[#8686AC]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

            {/* Sparkle on hover */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Sparkles className="w-4 h-4 text-[#8686AC] animate-pulse" />
            </div>

            <div className="relative text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#8686AC] to-[#505081] mb-2 group-hover:scale-110 transition-transform duration-300">150+</div>
            <div className={`relative text-sm font-medium transition-colors ${darkMode ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-600 group-hover:text-gray-800'}`}>Career Paths</div>
          </div>

          <div className="text-center group cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#505081]/0 via-[#505081]/20 to-[#505081]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animation-delay-100">
              <Sparkles className="w-4 h-4 text-[#505081] animate-pulse" />
            </div>

            <div className="relative text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#505081] to-[#272757] mb-2 group-hover:scale-110 transition-transform duration-300">500+</div>
            <div className={`relative text-sm font-medium transition-colors ${darkMode ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-600 group-hover:text-gray-800'}`}>Top Colleges</div>
          </div>

          <div className="text-center group cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#272757]/0 via-[#272757]/20 to-[#272757]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animation-delay-200">
              <Sparkles className="w-4 h-4 text-[#272757] animate-pulse" />
            </div>

            <div className="relative text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#272757] to-[#0F0E47] mb-2 group-hover:scale-110 transition-transform duration-300">45K+</div>
            <div className={`relative text-sm font-medium transition-colors ${darkMode ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-600 group-hover:text-gray-800'}`}>Students Guided</div>
          </div>

          <div className="text-center group cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#0F0E47]/0 via-[#0F0E47]/20 to-[#0F0E47]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animation-delay-300">
              <Sparkles className="w-4 h-4 text-[#8686AC] animate-pulse" />
            </div>

            <div className="relative text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#0F0E47] to-[#8686AC] mb-2 group-hover:scale-110 transition-transform duration-300">94%</div>
            <div className={`relative text-sm font-medium transition-colors ${darkMode ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-600 group-hover:text-gray-800'}`}>Success Rate</div>
          </div>
        </div>
      </div>

      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl animate-blob transition-opacity duration-500 ${darkMode ? 'bg-[#272757]/10' : 'bg-indigo-300/20'
          }`}></div>
        <div className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl animate-blob animation-delay-2000 transition-opacity duration-500 ${darkMode ? 'bg-[#505081]/10' : 'bg-blue-300/20'
          }`}></div>
        <div className={`absolute top-40 right-20 w-80 h-80 rounded-full blur-3xl animate-blob animation-delay-4000 transition-opacity duration-500 ${darkMode ? 'bg-[#8686AC]/10' : 'bg-slate-300/20'
          }`}></div>
      </div>

      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(5deg); } }
        @keyframes blob { 0%, 100% { transform: translate(0, 0) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } }
        @keyframes gradient-x { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes pulse-slow { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.6; } }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-10px) scale(1.1); } }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        
        @keyframes sparkle-1 {
          0%, 100% { opacity: 0; transform: translate(0, 0) scale(0); }
          50% { opacity: 1; transform: translate(-10px, -10px) scale(1); }
        }
        @keyframes sparkle-2 {
          0%, 100% { opacity: 0; transform: translate(0, 0) scale(0); }
          50% { opacity: 1; transform: translate(10px, -5px) scale(1.2); }
        }
        @keyframes sparkle-3 {
          0%, 100% { opacity: 0; transform: translate(0, 0) scale(0); }
          50% { opacity: 1; transform: translate(-5px, 10px) scale(0.8); }
        }
        @keyframes sparkle-4 {
          0%, 100% { opacity: 0; transform: translate(0, 0) scale(0); }
          50% { opacity: 1; transform: translate(8px, 8px) scale(1.1); }
        }
        
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-blob { animation: blob 7s ease-in-out infinite; }
        .animate-gradient-x { background-size: 200% auto; animation: gradient-x 3s linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-spin-reverse { animation: spin-reverse 15s linear infinite; }
        
        .animate-sparkle-1 { animation: sparkle-1 2s ease-in-out infinite; }
        .animate-sparkle-2 { animation: sparkle-2 2.2s ease-in-out infinite; }
        .animate-sparkle-3 { animation: sparkle-3 2.4s ease-in-out infinite; }
        .animate-sparkle-4 { animation: sparkle-4 2.6s ease-in-out infinite; }
        
        .animation-delay-100 { animation-delay: 0.1s; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-1500 { animation-delay: 1.5s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-2500 { animation-delay: 2.5s; }
        .animation-delay-3000 { animation-delay: 3s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
};

export default HeroSection;