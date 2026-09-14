import React from 'react';
import { Sparkles, ArrowRight, TrendingUp, Target, Zap, HelpCircle, FileText, Video, Compass } from 'lucide-react';

const HeroSection = ({ darkMode, onStartQuiz }) => {
  const scrollToDomains = () => {
    const domainsSection = document.getElementById('domains');
    if (domainsSection) {
      domainsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`relative rounded-3xl overflow-hidden mb-16 transition-colors duration-300 border ${darkMode ? 'bg-[#131824] border-slate-800 shadow-2xl' : 'bg-gradient-to-br from-indigo-50/70 via-white to-blue-50/70 border-indigo-100 shadow-xl'
      }`}>
      {/* Background Decorative Gradient Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl transition-opacity duration-500 ${darkMode ? 'bg-indigo-600/15' : 'bg-indigo-400/20'}`}></div>
        <div className={`absolute -bottom-24 -right-24 w-96 h-96 rounded-full blur-3xl transition-opacity duration-500 ${darkMode ? 'bg-purple-600/15' : 'bg-blue-400/20'}`}></div>
      </div>

      {/* Main Content Container */}
      <div className="relative grid lg:grid-cols-12 gap-8 items-center p-8 sm:p-12 lg:p-16">
        {/* Left Side - Text Content */}
        <div className="relative z-10 lg:col-span-7">
          {/* Small Label Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border backdrop-blur-md transition-colors ${darkMode
            ? 'bg-indigo-950/60 border-indigo-500/40 text-indigo-300 shadow-lg shadow-indigo-950/50'
            : 'bg-white border-indigo-200 text-indigo-700 shadow-sm'
            }`}>
            <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Smart AI Career Navigator • 2026 Edition
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-[1.1] tracking-tight">
            <span className={darkMode ? 'text-white' : 'text-slate-900'}>
              Discover. Plan.
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              Achieve Your Dream Career.
            </span>
          </h1>

          {/* Clear Value Description */}
          <p className={`text-base sm:text-lg mb-8 leading-relaxed max-w-xl ${darkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
            Transform career confusion into clarity. Get AI-powered assessments, explore <span className={`font-bold ${darkMode ? 'text-white' : 'text-indigo-900'}`}>150+ career paths</span>, compare <span className={`font-bold ${darkMode ? 'text-white' : 'text-indigo-900'}`}>500+ top colleges</span>, bridge skill gaps, and practice mock interviews.
          </p>

          {/* Feature Highlights */}
          <div className="flex flex-wrap gap-2.5 mb-8">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${darkMode
              ? 'bg-slate-800/80 border-slate-700 text-slate-200'
              : 'bg-white border-slate-200 text-slate-700 shadow-sm'
              }`}>
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
              <span>Real-Time Salaries</span>
            </div>
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${darkMode
              ? 'bg-slate-800/80 border-slate-700 text-slate-200'
              : 'bg-white border-slate-200 text-slate-700 shadow-sm'
              }`}>
              <Target className="w-3.5 h-3.5 text-indigo-500" />
              <span>AI Fit Scoring</span>
            </div>
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${darkMode
              ? 'bg-slate-800/80 border-slate-700 text-slate-200'
              : 'bg-white border-slate-200 text-slate-700 shadow-sm'
              }`}>
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Step-by-Step Roadmaps</span>
            </div>
          </div>

          {/* Primary & Secondary Discovery CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            {/* Primary Main Career Discovery CTA */}
            <button
              onClick={scrollToDomains}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-size-200 hover:bg-right transition-all duration-500 text-white font-black text-base sm:text-lg shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] cursor-pointer"
            >
              <Compass className="w-5 h-5 group-hover:rotate-45 transition-transform" />
              <span>Explore 150+ Career Paths</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </button>

            {/* Secondary Quiz CTA */}
            <button
              onClick={() => {
                if (onStartQuiz) onStartQuiz();
                else if (window.openQuiz) window.openQuiz();
              }}
              className={`inline-flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-base transition-all border ${darkMode
                ? 'bg-[#1a1f2e] hover:bg-[#252c40] border-slate-700 text-slate-200 hover:text-white'
                : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-800 shadow-md'
                } hover:scale-[1.02] cursor-pointer`}
            >
              <HelpCircle className="w-5 h-5 text-indigo-500" />
              <span>Take AI Career Quiz</span>
            </button>
          </div>

          {/* Quick Tool Access Pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className={`font-semibold mr-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Quick Tools:</span>
            <button
              onClick={() => window.openResume && window.openResume()}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all border ${darkMode
                ? 'bg-slate-800/70 hover:bg-slate-700 border-slate-700 text-slate-300 hover:text-white'
                : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                }`}
            >
              <FileText className="w-3.5 h-3.5 text-emerald-500" />
              <span>Resume Reviewer</span>
            </button>

            <button
              onClick={() => window.openInterview && window.openInterview()}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all border ${darkMode
                ? 'bg-slate-800/70 hover:bg-slate-700 border-slate-700 text-slate-300 hover:text-white'
                : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                }`}
            >
              <Video className="w-3.5 h-3.5 text-pink-500" />
              <span>Mock Interview</span>
            </button>

            <button
              onClick={() => window.openSkillGap && window.openSkillGap()}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all border ${darkMode
                ? 'bg-slate-800/70 hover:bg-slate-700 border-slate-700 text-slate-300 hover:text-white'
                : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                }`}
            >
              <Target className="w-3.5 h-3.5 text-indigo-500" />
              <span>Skills Gap Check</span>
            </button>
          </div>
        </div>

        {/* Right Side - Interactive Career Showcase Grid */}
        <div className="relative lg:col-span-5 flex flex-col items-center justify-center">
          <div className="w-full max-w-sm grid grid-cols-2 gap-3.5 relative z-10">
            {/* Career Floating Card 1 */}
            <div className={`p-4 rounded-2xl border transition-all duration-300 hover:scale-105 ${darkMode ? 'bg-[#161b26]/90 border-slate-800 shadow-xl' : 'bg-white/90 border-indigo-100 shadow-xl'}`}>
              <span className="text-3xl mb-2 block">💻</span>
              <div className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>Software & AI</div>
              <div className="text-xs text-indigo-500 font-semibold mt-0.5">₹8 - 45 LPA</div>
            </div>

            {/* Career Floating Card 2 */}
            <div className={`p-4 rounded-2xl border transition-all duration-300 hover:scale-105 translate-y-3 ${darkMode ? 'bg-[#161b26]/90 border-slate-800 shadow-xl' : 'bg-white/90 border-indigo-100 shadow-xl'}`}>
              <span className="text-3xl mb-2 block">⚕️</span>
              <div className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>Medicine & Health</div>
              <div className="text-xs text-emerald-500 font-semibold mt-0.5">High Demand</div>
            </div>

            {/* Career Floating Card 3 */}
            <div className={`p-4 rounded-2xl border transition-all duration-300 hover:scale-105 ${darkMode ? 'bg-[#161b26]/90 border-slate-800 shadow-xl' : 'bg-white/90 border-indigo-100 shadow-xl'}`}>
              <span className="text-3xl mb-2 block">💼</span>
              <div className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>Finance & Mgmt</div>
              <div className="text-xs text-amber-500 font-semibold mt-0.5">Top Colleges</div>
            </div>

            {/* Career Floating Card 4 */}
            <div className={`p-4 rounded-2xl border transition-all duration-300 hover:scale-105 translate-y-3 ${darkMode ? 'bg-[#161b26]/90 border-slate-800 shadow-xl' : 'bg-white/90 border-indigo-100 shadow-xl'}`}>
              <span className="text-3xl mb-2 block">🎨</span>
              <div className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>Design & Media</div>
              <div className="text-xs text-purple-500 font-semibold mt-0.5">Creative Careers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className={`relative z-10 border-t ${darkMode
        ? 'border-slate-800 bg-slate-950/60 backdrop-blur-md'
        : 'border-indigo-100 bg-white/70 backdrop-blur-md'
        }`}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-blue-500 mb-1">
              150+
            </div>
            <div className={`text-xs sm:text-sm font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Curated Career Paths
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 mb-1">
              500+
            </div>
            <div className={`text-xs sm:text-sm font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Top Colleges & Universities
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-500 mb-1">
              45,000+
            </div>
            <div className={`text-xs sm:text-sm font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Students Guided
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-500 mb-1">
              96%
            </div>
            <div className={`text-xs sm:text-sm font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Clarity & Satisfaction
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;