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
    <div className={`relative rounded-3xl overflow-hidden mb-16 transition-colors duration-300 border ${darkMode ? 'bg-[#121215] border-zinc-800 shadow-2xl' : 'bg-white border-zinc-200 shadow-xl'
      }`}>
      {/* Background Decorative Monochrome Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl transition-opacity duration-500 ${darkMode ? 'bg-zinc-700/10' : 'bg-zinc-300/30'}`}></div>
        <div className={`absolute -bottom-24 -right-24 w-96 h-96 rounded-full blur-3xl transition-opacity duration-500 ${darkMode ? 'bg-zinc-600/10' : 'bg-zinc-200/40'}`}></div>
      </div>

      {/* Main Content Container */}
      <div className="relative grid lg:grid-cols-12 gap-8 items-center p-8 sm:p-12 lg:p-16 animate-fade-in">
        {/* Left Side - Text Content */}
        <div className="relative z-10 lg:col-span-7">
          {/* Small Label Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border backdrop-blur-md animate-float ${darkMode
            ? 'bg-zinc-900/90 border-zinc-700 text-zinc-300 shadow-md'
            : 'bg-zinc-100 border-zinc-300 text-zinc-800 shadow-sm'
            }`}>
            <Sparkles className="w-4 h-4 text-zinc-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Smart AI Career Navigator • 2026 Edition
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-[1.1] tracking-tight">
            <span className={darkMode ? 'text-white' : 'text-black'}>
              Discover. Plan.
            </span>
            <br />
            <span className={`bg-clip-text text-transparent ${darkMode ? 'bg-gradient-to-r from-white via-zinc-300 to-zinc-500' : 'bg-gradient-to-r from-black via-zinc-800 to-zinc-600'}`}>
              Achieve Your Dream Career.
            </span>
          </h1>

          {/* Clear Value Description */}
          <p className={`text-base sm:text-lg mb-8 leading-relaxed max-w-xl ${darkMode ? 'text-zinc-300' : 'text-zinc-700'
            }`}>
            Transform career confusion into clarity. Get AI-powered assessments, explore <span className={`font-bold ${darkMode ? 'text-white' : 'text-black'}`}>150+ career paths</span>, compare <span className={`font-bold ${darkMode ? 'text-white' : 'text-black'}`}>500+ top colleges</span>, bridge skill gaps, and practice mock interviews.
          </p>

          {/* Feature Highlights */}
          <div className="flex flex-wrap gap-2.5 mb-8">
            <div className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border hover-lift ${darkMode
              ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-600'
              : 'bg-zinc-50 border-zinc-200 text-zinc-800 shadow-sm hover:border-zinc-400'
              }`}>
              <TrendingUp className="w-3.5 h-3.5 text-zinc-400" />
              <span>Real-Time Salaries</span>
            </div>
            <div className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border hover-lift ${darkMode
              ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-600'
              : 'bg-zinc-50 border-zinc-200 text-zinc-800 shadow-sm hover:border-zinc-400'
              }`}>
              <Target className="w-3.5 h-3.5 text-zinc-400" />
              <span>AI Fit Scoring</span>
            </div>
            <div className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border hover-lift ${darkMode
              ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-600'
              : 'bg-zinc-50 border-zinc-200 text-zinc-800 shadow-sm hover:border-zinc-400'
              }`}>
              <Zap className="w-3.5 h-3.5 text-zinc-400" />
              <span>Step-by-Step Roadmaps</span>
            </div>
          </div>

          {/* Primary & Secondary Discovery CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            {/* Primary Main Career Discovery CTA */}
            <button
              onClick={scrollToDomains}
              className={`group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-base sm:text-lg btn-interactive hover-lift shadow-xl cursor-pointer ${darkMode
                ? 'bg-white text-black hover:bg-zinc-200 shadow-white/10 hover:shadow-white/20'
                : 'bg-black text-white hover:bg-zinc-800 shadow-black/20 hover:shadow-black/30'
                }`}
            >
              <Compass className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
              <span>Explore 150+ Career Paths</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </button>

            {/* Secondary Quiz CTA */}
            <button
              onClick={() => {
                if (onStartQuiz) onStartQuiz();
                else if (window.openQuiz) window.openQuiz();
              }}
              className={`inline-flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-base btn-interactive hover-lift border ${darkMode
                ? 'bg-[#18181b] hover:bg-zinc-800 border-zinc-700 text-zinc-200 hover:text-white'
                : 'bg-white hover:bg-zinc-100 border-zinc-300 text-black shadow-md'
                } cursor-pointer`}
            >
              <HelpCircle className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
              <span>Take AI Career Quiz</span>
            </button>
          </div>

          {/* Quick Tool Access Pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className={`font-semibold mr-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Quick Tools:</span>
            <button
              onClick={() => window.openResume && window.openResume()}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl btn-interactive hover-lift border ${darkMode
                ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-300 hover:text-white'
                : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-200 text-zinc-800'
                }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume Reviewer</span>
            </button>

            <button
              onClick={() => window.openInterview && window.openInterview()}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl btn-interactive hover-lift border ${darkMode
                ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-300 hover:text-white'
                : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-200 text-zinc-800'
                }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Mock Interview</span>
            </button>

            <button
              onClick={() => window.openSkillGap && window.openSkillGap()}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl btn-interactive hover-lift border ${darkMode
                ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-300 hover:text-white'
                : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-200 text-zinc-800'
                }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>Skills Gap Check</span>
            </button>
          </div>
        </div>

        {/* Right Side - Interactive Career Showcase Grid in Monochrome */}
        <div className="relative lg:col-span-5 flex flex-col items-center justify-center">
          <div className="w-full max-w-sm grid grid-cols-2 gap-3.5 relative z-10">
            {/* Career Floating Card 1 */}
            <div className={`p-4 rounded-2xl border hover-lift ${darkMode ? 'bg-[#18181b] border-zinc-800 shadow-xl hover:border-zinc-600' : 'bg-white border-zinc-200 shadow-xl hover:border-zinc-400'}`}>
              <span className="text-3xl mb-2 block transition-transform hover:scale-125 duration-200">💻</span>
              <div className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-black'}`}>Software & AI</div>
              <div className="text-xs text-zinc-500 font-semibold mt-0.5">₹8 - 45 LPA</div>
            </div>

            {/* Career Floating Card 2 */}
            <div className={`p-4 rounded-2xl border hover-lift translate-y-3 ${darkMode ? 'bg-[#18181b] border-zinc-800 shadow-xl hover:border-zinc-600' : 'bg-white border-zinc-200 shadow-xl hover:border-zinc-400'}`}>
              <span className="text-3xl mb-2 block transition-transform hover:scale-125 duration-200">⚕️</span>
              <div className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-black'}`}>Medicine & Health</div>
              <div className="text-xs text-zinc-500 font-semibold mt-0.5">High Demand</div>
            </div>

            {/* Career Floating Card 3 */}
            <div className={`p-4 rounded-2xl border hover-lift ${darkMode ? 'bg-[#18181b] border-zinc-800 shadow-xl hover:border-zinc-600' : 'bg-white border-zinc-200 shadow-xl hover:border-zinc-400'}`}>
              <span className="text-3xl mb-2 block transition-transform hover:scale-125 duration-200">💼</span>
              <div className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-black'}`}>Finance & Mgmt</div>
              <div className="text-xs text-zinc-500 font-semibold mt-0.5">Top Colleges</div>
            </div>

            {/* Career Floating Card 4 */}
            <div className={`p-4 rounded-2xl border hover-lift translate-y-3 ${darkMode ? 'bg-[#18181b] border-zinc-800 shadow-xl hover:border-zinc-600' : 'bg-white border-zinc-200 shadow-xl hover:border-zinc-400'}`}>
              <span className="text-3xl mb-2 block transition-transform hover:scale-125 duration-200">🎨</span>
              <div className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-black'}`}>Design & Media</div>
              <div className="text-xs text-zinc-500 font-semibold mt-0.5">Creative Careers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className={`relative z-10 border-t ${darkMode
        ? 'border-zinc-800 bg-black/40 backdrop-blur-md'
        : 'border-zinc-200 bg-zinc-50/70 backdrop-blur-md'
        }`}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8">
          <div className="text-center group hover-lift p-2 rounded-xl">
            <div className={`text-3xl sm:text-4xl font-black mb-1 transition-transform group-hover:scale-110 duration-200 ${darkMode ? 'text-white' : 'text-black'}`}>
              150+
            </div>
            <div className={`text-xs sm:text-sm font-semibold ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Curated Career Paths
            </div>
          </div>

          <div className="text-center group hover-lift p-2 rounded-xl">
            <div className={`text-3xl sm:text-4xl font-black mb-1 transition-transform group-hover:scale-110 duration-200 ${darkMode ? 'text-white' : 'text-black'}`}>
              500+
            </div>
            <div className={`text-xs sm:text-sm font-semibold ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Top Colleges & Universities
            </div>
          </div>

          <div className="text-center group hover-lift p-2 rounded-xl">
            <div className={`text-3xl sm:text-4xl font-black mb-1 transition-transform group-hover:scale-110 duration-200 ${darkMode ? 'text-white' : 'text-black'}`}>
              45,000+
            </div>
            <div className={`text-xs sm:text-sm font-semibold ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Students Guided
            </div>
          </div>

          <div className="text-center group hover-lift p-2 rounded-xl">
            <div className={`text-3xl sm:text-4xl font-black mb-1 transition-transform group-hover:scale-110 duration-200 ${darkMode ? 'text-white' : 'text-black'}`}>
              96%
            </div>
            <div className={`text-xs sm:text-sm font-semibold ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Clarity & Satisfaction
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;