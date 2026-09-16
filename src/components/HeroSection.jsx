import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Target, 
  HelpCircle, 
  FileText, 
  Video, 
  Compass, 
  Search, 
  Activity,
  DollarSign,
  Clock
} from 'lucide-react';

const HeroSection = ({ darkMode, onStartQuiz }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const scrollToDomains = () => {
    const domainsSection = document.getElementById('domains');
    if (domainsSection) {
      domainsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const searchInput = document.querySelector('input[type="text"]#career-search') || document.querySelector('input[placeholder*="Search"]');
      if (searchInput) {
        searchInput.value = searchQuery;
        searchInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
      scrollToDomains();
    } else {
      scrollToDomains();
    }
  };

  return (
    <div className={`relative rounded-3xl overflow-hidden mb-16 transition-colors duration-300 border ${
      darkMode ? 'bg-[#0d0d10] border-zinc-800/80 shadow-2xl' : 'bg-[#fafafa] border-zinc-200/80 shadow-xl'
    }`}>
      {/* Background Animated Ambient Lights & Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Multi-shade glowing ambient mesh orbs */}
        <div className={`absolute -top-32 -left-32 w-[34rem] h-[34rem] rounded-full blur-3xl opacity-40 animate-orb-1 ${
          darkMode ? 'bg-[#003B73]/40' : 'bg-[#0265A6]/25'
        }`}></div>

        <div className={`absolute -bottom-32 -right-32 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-40 animate-orb-2 ${
          darkMode ? 'bg-[#0265A6]/30' : 'bg-[#6096BA]/30'
        }`}></div>

        {/* High-tech matrix dot pattern */}
        <div 
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.07]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${darkMode ? '#ffffff' : '#000000'} 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        ></div>

        {/* Diagonal ambient shine */}
        <div className={`absolute inset-0 bg-gradient-to-tr ${
          darkMode 
            ? 'from-transparent via-[#0A1E3F]/30 to-[#0265A6]/10' 
            : 'from-transparent via-[#EBF3FA]/60 to-[#6096BA]/10'
        }`}></div>
      </div>

      {/* Main Content Layout */}
      <div className="relative max-w-4xl mx-auto flex flex-col items-center text-center p-6 sm:p-10 lg:p-14 z-10">
        
        {/* Main Content Column */}
        <div className="w-full flex flex-col items-center text-center">
          {/* Top Live Engine Status Pill */}
          <div className="flex flex-wrap items-center gap-2.5 mb-6 justify-center">
            <div className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border backdrop-blur-md shadow-md ${
              darkMode 
                ? 'bg-[#0A1E3F]/90 border-[#003B73] text-zinc-200 shadow-[#0265A6]/15' 
                : 'bg-white/95 border-[#BACDDF] text-zinc-800 shadow-sm'
            }`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0265A6] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0265A6]"></span>
              </span>
              <span className="text-[11px] font-black uppercase tracking-wider font-mono">
                Cognitrail AI Engine 2.6
              </span>
            </div>

            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border ${
              darkMode ? 'bg-[#0A1E3F]/60 border-[#003B73] text-[#6096BA]' : 'bg-[#EBF3FA] border-[#BACDDF] text-[#0265A6]'
            }`}>
              <Activity className="w-3 h-3 animate-pulse text-[#0265A6]" />
              <span>150+ Career Streams Live</span>
            </div>
          </div>

          {/* Hero Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-[1.1] tracking-tight">
            <span className={darkMode ? 'text-white' : 'text-[#051C3E]'}>
              Architect Your Future.
            </span>
            <br />
            <span className="inline-block mt-2 px-4 sm:px-5 py-1.5 rounded-2xl bg-gradient-to-r from-[#003B73] via-[#0265A6] to-[#6096BA] text-white font-black shadow-lg shadow-[#0265A6]/30">
              With Precision AI.
            </span>
          </h1>

          {/* Value Prop Description */}
          <p className={`text-base sm:text-lg mb-8 leading-relaxed max-w-2xl mx-auto ${
            darkMode ? 'text-zinc-300' : 'text-zinc-600'
          }`}>
            Eliminate career uncertainty. Unlock data-driven roadmaps, salary forecasts, ATS skill gap analysis, and tailored college recommendations across India's top programs.
          </p>

          {/* Instant Search / Query Bar */}
          <form onSubmit={handleSearchSubmit} className="mb-8 w-full max-w-xl mx-auto">
            <div className={`flex items-center gap-2 p-2 rounded-2xl border transition-all duration-300 ${
              darkMode 
                ? 'bg-[#0A1E3F] border-[#003B73] focus-within:border-[#0265A6] focus-within:ring-2 focus-within:ring-[#0265A6]/40 focus-within:shadow-[0_0_25px_rgba(2,101,166,0.3)]' 
                : 'bg-[#EBF3FA] border-[#BACDDF] focus-within:border-[#0265A6] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0265A6]/30 focus-within:shadow-[0_8px_30px_rgba(2,101,166,0.2)]'
            }`}>
              <div className="pl-3 text-[#0265A6]">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Explore by career, skill, or degree (e.g. AI, MBBS, Fintech)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full bg-transparent border-none text-xs sm:text-sm focus:outline-none placeholder-blue-600/60 ${
                  darkMode ? 'text-white' : 'text-zinc-900'
                }`}
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 btn-interactive cursor-pointer bg-gradient-to-r from-[#003B73] via-[#0265A6] to-[#003B73] text-white hover:brightness-110 flex-shrink-0 shadow-lg shadow-[#0265A6]/30"
              >
                <span>Find</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Keyword Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
              <span className={`text-[11px] font-semibold ${darkMode ? 'text-[#6096BA]' : 'text-[#0265A6]'}`}>Trending:</span>
              {['AI & Robotics', 'Fullstack Dev', 'Investment Banking', 'UI/UX Design', 'Biotech'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setSearchQuery(tag);
                    scrollToDomains();
                  }}
                  className={`text-[11px] px-2.5 py-0.5 rounded-lg border font-medium transition-all hover:scale-105 ${
                    darkMode 
                      ? 'bg-[#0A1E3F] border-[#003B73] text-[#6096BA] hover:text-white hover:border-[#0265A6] hover:bg-gradient-to-r hover:from-[#003B73] hover:to-[#0265A6]' 
                      : 'bg-[#ECFDF5] border-[#BACDDF] text-[#0265A6] hover:text-white hover:border-[#0265A6] hover:bg-gradient-to-r hover:from-[#0265A6] hover:to-[#003B73]'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </form>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <button
              onClick={scrollToDomains}
              className="group relative inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-2xl font-black text-sm btn-interactive hover-lift shadow-xl cursor-pointer bg-gradient-to-r from-[#003B73] via-[#0265A6] to-[#003B73] text-white hover:brightness-110 shadow-[#0265A6]/35"
            >
              <Compass className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
              <span>Browse 150+ Paths</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>

            <button
              onClick={() => {
                if (onStartQuiz) onStartQuiz();
                else if (window.openQuiz) window.openQuiz();
              }}
              className={`group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-sm btn-interactive hover-lift border ${
                darkMode
                  ? 'bg-[#0A1E3F] hover:bg-[#0A1E3F]/80 border-[#003B73] text-[#6096BA] hover:border-[#0265A6]'
                  : 'bg-white hover:bg-[#EBF3FA] border-[#BACDDF] text-zinc-900 shadow-md hover:border-[#0265A6]'
              } cursor-pointer`}
            >
              <HelpCircle className="w-5 h-5 text-[#0265A6] transition-transform group-hover:scale-110" />
              <span>Take AI Career Quiz</span>
            </button>
          </div>

          {/* Quick Tool Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className={`font-semibold mr-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Direct Tools:</span>
            <button
              onClick={() => window.openResume && window.openResume()}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl btn-interactive hover-lift border ${
                darkMode
                  ? 'bg-[#0A1E3F] hover:bg-[#0A1E3F]/80 border-[#003B73] text-zinc-300'
                  : 'bg-white hover:bg-[#EBF3FA] border-zinc-200 text-zinc-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-[#0265A6]" />
              <span>ATS Resume</span>
            </button>

            <button
              onClick={() => window.openInterview && window.openInterview()}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl btn-interactive hover-lift border ${
                darkMode
                  ? 'bg-[#0A1E3F] hover:bg-[#0A1E3F]/80 border-[#003B73] text-zinc-300'
                  : 'bg-white hover:bg-[#EBF3FA] border-zinc-200 text-zinc-800'
              }`}
            >
              <Video className="w-3.5 h-3.5 text-[#0265A6]" />
              <span>AI Interview</span>
            </button>

            <button
              onClick={() => window.openSkillGap && window.openSkillGap()}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl btn-interactive hover-lift border ${
                darkMode
                  ? 'bg-[#0A1E3F] hover:bg-[#0A1E3F]/80 border-[#003B73] text-zinc-300'
                  : 'bg-white hover:bg-[#EBF3FA] border-zinc-200 text-zinc-800'
              }`}
            >
              <Target className="w-3.5 h-3.5 text-[#0265A6]" />
              <span>Skills Gap</span>
            </button>

            <button
              onClick={() => window.openSalary && window.openSalary()}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl btn-interactive hover-lift border ${
                darkMode
                  ? 'bg-[#0A1E3F] hover:bg-[#0A1E3F]/80 border-[#003B73] text-zinc-300'
                  : 'bg-white hover:bg-[#EBF3FA] border-zinc-200 text-zinc-800'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5 text-[#0265A6]" />
              <span>Salary Calc</span>
            </button>

            <button
              onClick={() => window.openExams && window.openExams()}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl btn-interactive hover-lift border ${
                darkMode
                  ? 'bg-[#0A1E3F] hover:bg-[#0A1E3F]/80 border-[#003B73] text-zinc-300'
                  : 'bg-white hover:bg-[#EBF3FA] border-zinc-200 text-zinc-800'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-[#0265A6]" />
              <span>Exam Timers</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modern Minimalist Stats Bar */}
      <div className={`relative z-10 border-t ${
        darkMode
          ? 'border-zinc-800/80 bg-black/40 backdrop-blur-md'
          : 'border-zinc-200/80 bg-zinc-50/70 backdrop-blur-md'
      }`}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-7">
          <div className="text-center group hover-lift p-2 rounded-xl">
            <div className={`text-2xl sm:text-3xl font-black mb-1 transition-transform group-hover:scale-105 duration-200 ${
              darkMode ? 'text-white' : 'text-black'
            }`}>
              150+
            </div>
            <div className={`text-xs font-semibold ${
              darkMode ? 'text-zinc-400' : 'text-zinc-600'
            }`}>
              Curated Career Paths
            </div>
          </div>

          <div className="text-center group hover-lift p-2 rounded-xl">
            <div className={`text-2xl sm:text-3xl font-black mb-1 transition-transform group-hover:scale-105 duration-200 ${
              darkMode ? 'text-white' : 'text-black'
            }`}>
              500+
            </div>
            <div className={`text-xs font-semibold ${
              darkMode ? 'text-zinc-400' : 'text-zinc-600'
            }`}>
              Top Colleges & Universities
            </div>
          </div>

          <div className="text-center group hover-lift p-2 rounded-xl">
            <div className={`text-2xl sm:text-3xl font-black mb-1 transition-transform group-hover:scale-105 duration-200 ${
              darkMode ? 'text-white' : 'text-black'
            }`}>
              45,000+
            </div>
            <div className={`text-xs font-semibold ${
              darkMode ? 'text-zinc-400' : 'text-zinc-600'
            }`}>
              Students Guided
            </div>
          </div>

          <div className="text-center group hover-lift p-2 rounded-xl">
            <div className={`text-2xl sm:text-3xl font-black mb-1 transition-transform group-hover:scale-105 duration-200 ${
              darkMode ? 'text-white' : 'text-black'
            }`}>
              96%
            </div>
            <div className={`text-xs font-semibold ${
              darkMode ? 'text-zinc-400' : 'text-zinc-600'
            }`}>
              Career Clarity Index
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;