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
  Clock,
  GraduationCap,
  CheckCircle2,
  TrendingUp,
  Award,
  Layers,
  Brain,
  ShieldCheck
} from 'lucide-react';

const HERO_FEATURED_PATHWAYS = [
  {
    id: 'ai_swe',
    name: 'AI & Software Engineer',
    salary: '₹12 - 45 LPA',
    match: '98% Match',
    icon: '💻',
    colleges: 'IIT Bombay, IIIT Hyd, BITS',
    cover: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'mbbs_doc',
    name: 'Medical Specialist (MBBS/MD)',
    salary: '₹15 - 50 LPA',
    match: '96% Match',
    icon: '⚕️',
    colleges: 'AIIMS Delhi, JIPMER, KGMU',
    cover: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'fintech_ib',
    name: 'Investment Banker & Fintech',
    salary: '₹14 - 60 LPA',
    match: '95% Match',
    icon: '💼',
    colleges: 'IIM Ahmedabad, SRCC, ISB',
    cover: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80'
  }
];

const HeroSection = ({ darkMode, onStartQuiz }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activePathwayIndex, setActivePathwayIndex] = useState(0);

  const activePathway = HERO_FEATURED_PATHWAYS[activePathwayIndex];

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
      darkMode ? 'bg-[#0A1E3F]/90 border-[#003B73] shadow-2xl' : 'bg-gradient-to-b from-[#EBF3FA] to-white border-[#BACDDF] shadow-xl'
    }`}>
      {/* Background Animated Ambient Lights & Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Multi-shade glowing ambient mesh orbs */}
        <div className={`absolute -top-32 -left-32 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-40 animate-orb-1 ${
          darkMode ? 'bg-[#003B73]/50' : 'bg-[#0265A6]/20'
        }`}></div>

        <div className={`absolute -bottom-32 -right-32 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-40 animate-orb-2 ${
          darkMode ? 'bg-[#0265A6]/40' : 'bg-[#6096BA]/30'
        }`}></div>

        {/* High-tech matrix dot pattern */}
        <div 
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.07]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${darkMode ? '#ffffff' : '#003B73'} 1px, transparent 0)`,
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

      {/* Hero Content Grid (2 Columns on Desktop) */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-10 sm:py-14 z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Text & Search CTA */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Top Live Engine Status Pill */}
            <div className="flex flex-wrap items-center gap-2.5 mb-6 justify-center lg:justify-start">
              <div className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border backdrop-blur-md shadow-md ${
                darkMode 
                  ? 'bg-[#071326]/90 border-[#003B73] text-zinc-200 shadow-[#0265A6]/15' 
                  : 'bg-white/95 border-[#BACDDF] text-zinc-800 shadow-sm'
              }`}>
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0265A6] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0265A6]"></span>
                </span>
                <span className="text-[11px] font-black uppercase tracking-wider font-mono">
                  Cognitrail AI Pathfinder 2.6
                </span>
              </div>

              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border ${
                darkMode ? 'bg-[#071326]/60 border-[#003B73] text-[#6096BA]' : 'bg-[#EBF3FA] border-[#BACDDF] text-[#0265A6]'
              }`}>
                <Activity className="w-3.5 h-3.5 animate-pulse text-[#0265A6]" />
                <span>150+ Careers • 500+ Colleges</span>
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
            <p className={`text-base sm:text-lg mb-8 leading-relaxed max-w-xl ${
              darkMode ? 'text-zinc-300' : 'text-zinc-600'
            }`}>
              Eliminate career uncertainty. Unlock data-driven roadmaps, real-time salary forecasts, ATS skill gap analysis, and tailored college entrance cutoffs across 500+ top Indian institutes.
            </p>

            {/* Instant Search / Query Bar */}
            <form onSubmit={handleSearchSubmit} className="mb-8 w-full max-w-xl">
              <div className={`flex items-center gap-2 p-2 rounded-2xl border transition-all duration-300 ${
                darkMode 
                  ? 'bg-[#071326] border-[#003B73] focus-within:border-[#0265A6] focus-within:ring-2 focus-within:ring-[#0265A6]/40 focus-within:shadow-[0_0_25px_rgba(2,101,166,0.3)]' 
                  : 'bg-white border-[#BACDDF] focus-within:border-[#0265A6] focus-within:ring-2 focus-within:ring-[#0265A6]/30 focus-within:shadow-[0_8px_30px_rgba(2,101,166,0.2)] shadow-sm'
              }`}>
                <div className="pl-3 text-[#0265A6]">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Search 150+ careers, degrees, or skills (e.g. AI, MBBS, Fintech)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full bg-transparent border-none text-xs sm:text-sm focus:outline-none ${
                    darkMode ? 'text-white placeholder-zinc-400' : 'text-zinc-900 placeholder-zinc-500'
                  }`}
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 btn-interactive cursor-pointer bg-gradient-to-r from-[#003B73] via-[#0265A6] to-[#003B73] text-white hover:brightness-110 flex-shrink-0 shadow-lg shadow-[#0265A6]/30"
                >
                  <span>Search</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Keyword Pills */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mt-3">
                <span className={`text-[11px] font-bold ${darkMode ? 'text-[#6096BA]' : 'text-[#0265A6]'}`}>Trending Paths:</span>
                {['AI & Data Science', 'MBBS Doctor', 'Investment Banking', 'UI/UX Design', 'Cybersecurity'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setSearchQuery(tag);
                      scrollToDomains();
                    }}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border font-semibold transition-all hover:scale-105 cursor-pointer ${
                      darkMode 
                        ? 'bg-[#071326] border-[#003B73] text-[#6096BA] hover:text-white hover:border-[#0265A6]' 
                        : 'bg-[#EBF3FA] border-[#BACDDF] text-[#0265A6] hover:bg-[#0265A6] hover:text-white'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </form>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8">
              <button
                onClick={scrollToDomains}
                className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl font-black text-sm btn-interactive hover-lift shadow-xl cursor-pointer bg-gradient-to-r from-[#003B73] via-[#0265A6] to-[#003B73] text-white hover:brightness-110 shadow-[#0265A6]/35"
              >
                <Compass className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                <span>Explore 150+ Pathways</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>

              <button
                onClick={() => {
                  if (onStartQuiz) onStartQuiz();
                  else if (window.openQuiz) window.openQuiz();
                }}
                className={`group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-sm btn-interactive hover-lift border ${
                  darkMode
                    ? 'bg-[#071326] hover:bg-[#003B73]/60 border-[#003B73] text-[#6096BA] hover:border-[#0265A6]'
                    : 'bg-white hover:bg-[#EBF3FA] border-[#BACDDF] text-zinc-900 shadow-md hover:border-[#0265A6]'
                } cursor-pointer`}
              >
                <HelpCircle className="w-5 h-5 text-[#0265A6] transition-transform group-hover:scale-110" />
                <span>Take 5-Min AI Quiz</span>
              </button>
            </div>

            {/* Quick Tool Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs">
              <span className={`font-bold mr-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Instant Launchers:</span>
              <button
                onClick={() => window.openResume && window.openResume()}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl btn-interactive hover-lift border cursor-pointer ${
                  darkMode
                    ? 'bg-[#071326] hover:bg-[#003B73]/60 border-[#003B73] text-zinc-300'
                    : 'bg-white hover:bg-[#EBF3FA] border-[#BACDDF] text-zinc-800 shadow-xs'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-[#0265A6]" />
                <span>ATS Resume</span>
              </button>

              <button
                onClick={() => window.openInterview && window.openInterview()}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl btn-interactive hover-lift border cursor-pointer ${
                  darkMode
                    ? 'bg-[#071326] hover:bg-[#003B73]/60 border-[#003B73] text-zinc-300'
                    : 'bg-white hover:bg-[#EBF3FA] border-[#BACDDF] text-zinc-800 shadow-xs'
                }`}
              >
                <Video className="w-3.5 h-3.5 text-[#0265A6]" />
                <span>AI Interview</span>
              </button>

              <button
                onClick={() => window.openSkillGap && window.openSkillGap()}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl btn-interactive hover-lift border cursor-pointer ${
                  darkMode
                    ? 'bg-[#071326] hover:bg-[#003B73]/60 border-[#003B73] text-zinc-300'
                    : 'bg-white hover:bg-[#EBF3FA] border-[#BACDDF] text-zinc-800 shadow-xs'
                }`}
              >
                <Target className="w-3.5 h-3.5 text-[#0265A6]" />
                <span>Skills Gap</span>
              </button>

              <button
                onClick={() => window.openSalary && window.openSalary()}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl btn-interactive hover-lift border cursor-pointer ${
                  darkMode
                    ? 'bg-[#071326] hover:bg-[#003B73]/60 border-[#003B73] text-zinc-300'
                    : 'bg-white hover:bg-[#EBF3FA] border-[#BACDDF] text-zinc-800 shadow-xs'
                }`}
              >
                <DollarSign className="w-3.5 h-3.5 text-[#0265A6]" />
                <span>Salary Calc</span>
              </button>

              <button
                onClick={() => window.openExams && window.openExams()}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl btn-interactive hover-lift border cursor-pointer ${
                  darkMode
                    ? 'bg-[#071326] hover:bg-[#003B73]/60 border-[#003B73] text-zinc-300'
                    : 'bg-white hover:bg-[#EBF3FA] border-[#BACDDF] text-zinc-800 shadow-xs'
                }`}
              >
                <Clock className="w-3.5 h-3.5 text-[#0265A6]" />
                <span>Exam Timers</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Hero Card Stack & Career Finder Graphic */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            
            {/* Main Visual Showcase Container */}
            <div className="relative w-full max-w-md mx-auto group">
              
              {/* Outer Glow Backdrop */}
              <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-tr from-[#003B73] via-[#0265A6] to-[#6096BA] opacity-75 blur-xl group-hover:opacity-100 transition duration-500"></div>

              {/* Central Card */}
              <div className={`relative rounded-[30px] border overflow-hidden p-6 shadow-2xl transition-all duration-300 ${
                darkMode
                  ? 'bg-gradient-to-b from-[#071326] via-[#0A1E3F] to-[#071326] border-[#003B73]'
                  : 'bg-white border-[#BACDDF]'
              }`}>
                
                {/* Hero Header Image Showcase with Overlay Badges */}
                <div className="relative h-56 w-full rounded-2xl overflow-hidden mb-5">
                  <img
                    src={activePathway.cover}
                    alt={activePathway.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${
                    darkMode ? 'from-[#071326] via-[#071326]/50 to-transparent' : 'from-white via-white/40 to-transparent'
                  }`} />

                  {/* Top Floating Match Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-[#003B73] via-[#0265A6] to-[#003B73] text-white shadow-lg shadow-[#0265A6]/40 backdrop-blur-md">
                    <Sparkles className="w-3.5 h-3.5 text-white animate-spin" style={{ animationDuration: '4s' }} />
                    <span>{activePathway.match}</span>
                  </div>

                  {/* Top Floating Industry Tag */}
                  <div className={`absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md ${
                    darkMode ? 'bg-[#071326]/80 border-[#003B73] text-[#6096BA]' : 'bg-white/90 border-[#BACDDF] text-[#0265A6]'
                  }`}>
                    <TrendingUp className="w-3 h-3 text-[#0265A6]" />
                    <span>High Growth 2026</span>
                  </div>

                  {/* Bottom Image Overlay Title */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">{activePathway.icon}</span>
                      <h3 className="text-lg sm:text-xl font-black text-white drop-shadow-md">
                        {activePathway.name}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Key Metrics Display */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className={`p-3 rounded-2xl border ${
                    darkMode ? 'bg-[#071326] border-[#003B73]' : 'bg-[#EBF3FA] border-[#BACDDF]'
                  }`}>
                    <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-[#0265A6] mb-0.5">
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>Avg CTC Package</span>
                    </div>
                    <div className={`text-sm font-black ${darkMode ? 'text-white' : 'text-[#051C3E]'}`}>
                      {activePathway.salary}
                    </div>
                  </div>

                  <div className={`p-3 rounded-2xl border ${
                    darkMode ? 'bg-[#071326] border-[#003B73]' : 'bg-[#EBF3FA] border-[#BACDDF]'
                  }`}>
                    <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-[#0265A6] mb-0.5">
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>Premier Institutes</span>
                    </div>
                    <div className={`text-xs font-bold truncate ${darkMode ? 'text-white' : 'text-[#051C3E]'}`}>
                      {activePathway.colleges}
                    </div>
                  </div>
                </div>

                {/* Pathway Selector Switcher Tabs */}
                <div className="space-y-2">
                  <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                    darkMode ? 'text-[#6096BA]' : 'text-[#0265A6]'
                  }`}>
                    Explore AI Recommendations:
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {HERO_FEATURED_PATHWAYS.map((path, idx) => (
                      <button
                        key={path.id}
                        type="button"
                        onClick={() => setActivePathwayIndex(idx)}
                        className={`p-2 rounded-xl text-center border font-bold text-xs transition-all cursor-pointer flex flex-col items-center gap-1 ${
                          activePathwayIndex === idx
                            ? 'bg-gradient-to-r from-[#003B73] to-[#0265A6] border-[#0265A6] text-white shadow-md scale-105'
                            : darkMode
                              ? 'bg-[#071326] border-[#003B73] text-zinc-300 hover:text-white hover:border-[#0265A6]'
                              : 'bg-[#EBF3FA] border-[#BACDDF] text-[#0265A6] hover:bg-[#0265A6] hover:text-white'
                        }`}
                      >
                        <span className="text-base">{path.icon}</span>
                        <span className="truncate w-full text-[10px]">{path.name.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Floating Bottom Verified Badge */}
                <div className="mt-5 pt-4 border-t border-[#003B73]/40 dark:border-[#003B73]/60 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-[#0265A6]">
                    <ShieldCheck className="w-4 h-4" />
                    <span>NIRF & AI Salary Verified</span>
                  </div>

                  <button
                    onClick={scrollToDomains}
                    className="font-bold text-xs text-[#0265A6] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Extra Floating Badge 1: Realtime Guidance */}
              <div className={`absolute -bottom-5 -left-4 p-3.5 rounded-2xl border shadow-xl backdrop-blur-md hidden sm:flex items-center gap-3 animate-float ${
                darkMode ? 'bg-[#071326]/95 border-[#003B73] text-white' : 'bg-white/95 border-[#BACDDF] text-[#051C3E]'
              }`} style={{ animationDuration: '6s' }}>
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#003B73] to-[#0265A6] flex items-center justify-center text-white font-bold text-sm shadow-sm">
                  🎓
                </div>
                <div>
                  <div className="text-xs font-black">500+ Top Colleges</div>
                  <div className={`text-[10px] font-semibold ${darkMode ? 'text-[#6096BA]' : 'text-[#0265A6]'}`}>
                    Cutoffs, Fees & Admissions
                  </div>
                </div>
              </div>

              {/* Extra Floating Badge 2: ATS Resume Score */}
              <div className={`absolute -top-4 -right-4 p-3 rounded-2xl border shadow-xl backdrop-blur-md hidden sm:flex items-center gap-2.5 animate-float ${
                darkMode ? 'bg-[#071326]/95 border-[#003B73] text-white' : 'bg-white/95 border-[#BACDDF] text-[#051C3E]'
              }`} style={{ animationDuration: '7s', animationDelay: '1s' }}>
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0265A6] to-[#6096BA] flex items-center justify-center text-white font-bold text-xs shadow-sm">
                  ⚡
                </div>
                <div>
                  <div className="text-xs font-black text-emerald-500">96% ATS Match</div>
                  <div className={`text-[10px] font-semibold ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    AI Resume Analyzer
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Modern Minimalist Stats Bar */}
      <div className={`relative z-10 border-t ${
        darkMode
          ? 'border-[#003B73] bg-[#071326]/80 backdrop-blur-md'
          : 'border-[#BACDDF] bg-white/80 backdrop-blur-md'
      }`}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-7">
          <div className="text-center group hover-lift p-2 rounded-xl">
            <div className={`text-2xl sm:text-3xl font-black mb-1 transition-transform group-hover:scale-105 duration-200 ${
              darkMode ? 'text-white' : 'text-[#051C3E]'
            }`}>
              150+
            </div>
            <div className={`text-xs font-semibold ${
              darkMode ? 'text-[#6096BA]' : 'text-[#0265A6]'
            }`}>
              Curated Career Paths
            </div>
          </div>

          <div className="text-center group hover-lift p-2 rounded-xl">
            <div className={`text-2xl sm:text-3xl font-black mb-1 transition-transform group-hover:scale-105 duration-200 ${
              darkMode ? 'text-white' : 'text-[#051C3E]'
            }`}>
              500+
            </div>
            <div className={`text-xs font-semibold ${
              darkMode ? 'text-[#6096BA]' : 'text-[#0265A6]'
            }`}>
              Top Colleges & Universities
            </div>
          </div>

          <div className="text-center group hover-lift p-2 rounded-xl">
            <div className={`text-2xl sm:text-3xl font-black mb-1 transition-transform group-hover:scale-105 duration-200 ${
              darkMode ? 'text-white' : 'text-[#051C3E]'
            }`}>
              45,000+
            </div>
            <div className={`text-xs font-semibold ${
              darkMode ? 'text-[#6096BA]' : 'text-[#0265A6]'
            }`}>
              Students Guided
            </div>
          </div>

          <div className="text-center group hover-lift p-2 rounded-xl">
            <div className={`text-2xl sm:text-3xl font-black mb-1 transition-transform group-hover:scale-105 duration-200 ${
              darkMode ? 'text-white' : 'text-[#051C3E]'
            }`}>
              96%
            </div>
            <div className={`text-xs font-semibold ${
              darkMode ? 'text-[#6096BA]' : 'text-[#0265A6]'
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