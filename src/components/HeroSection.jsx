import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  Target, 
  Zap, 
  HelpCircle, 
  FileText, 
  Video, 
  Compass, 
  Terminal, 
  Cpu, 
  Search, 
  CheckCircle2, 
  ChevronRight,
  Activity,
  Layers,
  GraduationCap
} from 'lucide-react';

const SPOTLIGHT_CAREERS = [
  {
    id: 'ai-engineer',
    title: 'AI & Machine Learning Engineer',
    domain: 'Software & Technology',
    icon: '🤖',
    salary: '₹14 - 55 LPA',
    growth: '+42% YoY',
    matchScore: 98,
    skills: ['PyTorch', 'LLMs', 'Python', 'Neural Networks', 'MLOps'],
    topColleges: ['IIT Bombay', 'IIT Delhi', 'BITS Pilani', 'IIIT Hyderabad'],
    demandLevel: 'Ultra High Demand'
  },
  {
    id: 'fullstack-dev',
    title: 'Cloud & Fullstack Architect',
    domain: 'Software & Technology',
    icon: '⚡',
    salary: '₹12 - 45 LPA',
    growth: '+28% YoY',
    matchScore: 95,
    skills: ['React', 'Node.js', 'AWS / GCP', 'Kubernetes', 'System Design'],
    topColleges: ['IIT Madras', 'NIT Trichy', 'VIT Vellore', 'DTU Delhi'],
    demandLevel: 'High Demand'
  },
  {
    id: 'quant-finance',
    title: 'Quantitative Finance & Algo Trader',
    domain: 'Finance & Banking',
    icon: '📈',
    salary: '₹22 - 75 LPA',
    growth: '+35% YoY',
    matchScore: 96,
    skills: ['Stochastic Calculus', 'Python / C++', 'Algo Trading', 'Risk Models'],
    topColleges: ['IIM Ahmedabad', 'ISI Kolkata', 'IIT Kharagpur', 'SRCC Delhi'],
    demandLevel: 'Elite Growth'
  },
  {
    id: 'product-designer',
    title: 'AI Product & Design Lead',
    domain: 'Design & Creative',
    icon: '🎨',
    salary: '₹10 - 38 LPA',
    growth: '+24% YoY',
    matchScore: 92,
    skills: ['UX Research', 'Figma Prototyping', 'Design Systems', 'AI Workflows'],
    topColleges: ['NID Ahmedabad', 'IIT Bombay IDC', 'Srishti Institute', 'MIT Pune'],
    demandLevel: 'High Creative ROI'
  },
  {
    id: 'data-scientist',
    title: 'Data Science & Intelligence Lead',
    domain: 'Data & Analytics',
    icon: '📊',
    salary: '₹12 - 48 LPA',
    growth: '+36% YoY',
    matchScore: 94,
    skills: ['SQL & Pandas', 'Big Data Spark', 'Predictive Modeling', 'Tableau / BI'],
    topColleges: ['IIT Kanpur', 'IISc Bangalore', 'CMI Chennai', 'BITS Pilani'],
    demandLevel: 'Consistent Surge'
  }
];

const HeroSection = ({ darkMode, onStartQuiz }) => {
  const [activeCareerIndex, setActiveCareerIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto cycle careers every 4.5 seconds if not hovered
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveCareerIndex((prev) => (prev + 1) % SPOTLIGHT_CAREERS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const activeCareer = SPOTLIGHT_CAREERS[activeCareerIndex];

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
        {/* Subtle moving orbs */}
        <div className={`absolute -top-32 -left-32 w-[34rem] h-[34rem] rounded-full blur-3xl opacity-30 animate-orb-1 ${
          darkMode ? 'bg-zinc-600/30' : 'bg-zinc-300/60'
        }`}></div>

        <div className={`absolute -bottom-32 -right-32 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-30 animate-orb-2 ${
          darkMode ? 'bg-zinc-700/25' : 'bg-zinc-300/50'
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
            ? 'from-transparent via-zinc-900/10 to-white/[0.02]' 
            : 'from-transparent via-zinc-200/20 to-black/[0.01]'
        }`}></div>
      </div>

      {/* Main Grid Content */}
      <div className="relative grid lg:grid-cols-12 gap-10 items-center p-6 sm:p-10 lg:p-14 z-10">
        
        {/* Left Column: Heading, Subtitle, Search Prompt, CTAs */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          
          {/* Top Live Engine Status Pill */}
          <div className="flex items-center gap-3 mb-6">
            <div className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border backdrop-blur-md shadow-sm ${
              darkMode 
                ? 'bg-zinc-900/90 border-zinc-700/80 text-zinc-200' 
                : 'bg-white/90 border-zinc-300 text-zinc-800'
            }`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span className="text-[11px] font-black uppercase tracking-wider font-mono">
                Cognitrail AI Engine 2.6
              </span>
            </div>

            <div className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border ${
              darkMode ? 'bg-zinc-900/60 border-zinc-800 text-zinc-400' : 'bg-zinc-100 border-zinc-200 text-zinc-600'
            }`}>
              <Activity className="w-3 h-3 animate-pulse" />
              <span>150+ Career Streams Live</span>
            </div>
          </div>

          {/* Hero Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-5 leading-[1.08] tracking-tight">
            <span className={darkMode ? 'text-white' : 'text-black'}>
              Architect Your Future.
            </span>
            <br />
            <span className={`bg-clip-text text-transparent ${
              darkMode 
                ? 'bg-gradient-to-r from-white via-zinc-200 to-zinc-500' 
                : 'bg-gradient-to-r from-black via-zinc-800 to-zinc-600'
            }`}>
              With Precision AI.
            </span>
          </h1>

          {/* Value Prop Description */}
          <p className={`text-base sm:text-lg mb-7 leading-relaxed max-w-xl ${
            darkMode ? 'text-zinc-300' : 'text-zinc-700'
          }`}>
            Eliminate career uncertainty. Unlock data-driven roadmaps, salary forecasts, ATS skill gap analysis, and tailored college recommendations across India's top programs.
          </p>

          {/* Instant Search / Query Bar */}
          <form onSubmit={handleSearchSubmit} className="mb-7 max-w-xl">
            <div className={`flex items-center gap-2 p-1.5 rounded-2xl border transition-all duration-300 ${
              darkMode 
                ? 'bg-[#16161a] border-zinc-700/80 focus-within:border-white focus-within:shadow-[0_0_20px_rgba(255,255,255,0.08)]' 
                : 'bg-white border-zinc-300 focus-within:border-black focus-within:shadow-lg'
            }`}>
              <div className="pl-3 text-zinc-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Explore by career, skill, or degree (e.g. AI, MBBS, Fintech)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full bg-transparent border-none text-xs sm:text-sm focus:outline-none placeholder-zinc-500 ${
                  darkMode ? 'text-white' : 'text-black'
                }`}
              />
              <button
                type="submit"
                className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 btn-interactive cursor-pointer ${
                  darkMode ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'
                }`}
              >
                <span>Find</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Keyword Pills */}
            <div className="flex flex-wrap items-center gap-2 mt-2.5">
              <span className={`text-[11px] font-semibold ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>Trending:</span>
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
                      ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600' 
                      : 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-black hover:border-zinc-400'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </form>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <button
              onClick={scrollToDomains}
              className={`group relative inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-2xl font-black text-sm sm:text-base btn-interactive hover-lift shadow-xl cursor-pointer ${
                darkMode
                  ? 'bg-white text-black hover:bg-zinc-200 shadow-white/10'
                  : 'bg-black text-white hover:bg-zinc-800 shadow-black/20'
              }`}
            >
              <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
              <span>Browse 150+ Paths</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>

            <button
              onClick={() => {
                if (onStartQuiz) onStartQuiz();
                else if (window.openQuiz) window.openQuiz();
              }}
              className={`group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-sm sm:text-base btn-interactive hover-lift border ${
                darkMode
                  ? 'bg-[#16161a] hover:bg-zinc-800 border-zinc-700 text-zinc-200 hover:text-white'
                  : 'bg-white hover:bg-zinc-100 border-zinc-300 text-black shadow-md'
              } cursor-pointer`}
            >
              <HelpCircle className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>Take AI Career Quiz</span>
            </button>
          </div>

          {/* Quick Tool Pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className={`font-semibold mr-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Direct Tools:</span>
            <button
              onClick={() => window.openResume && window.openResume()}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl btn-interactive hover-lift border ${
                darkMode
                  ? 'bg-zinc-900/80 hover:bg-zinc-800 border-zinc-800 text-zinc-300 hover:text-white'
                  : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-200 text-zinc-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>ATS Resume Scanner</span>
            </button>

            <button
              onClick={() => window.openInterview && window.openInterview()}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl btn-interactive hover-lift border ${
                darkMode
                  ? 'bg-zinc-900/80 hover:bg-zinc-800 border-zinc-800 text-zinc-300 hover:text-white'
                  : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-200 text-zinc-800'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>AI Interview Prep</span>
            </button>

            <button
              onClick={() => window.openSkillGap && window.openSkillGap()}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl btn-interactive hover-lift border ${
                darkMode
                  ? 'bg-zinc-900/80 hover:bg-zinc-800 border-zinc-800 text-zinc-300 hover:text-white'
                  : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-200 text-zinc-800'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>Skills Gap Check</span>
            </button>
          </div>
        </div>

        {/* Right Column: High-End AI Career Match Command Console */}
        <div 
          className="lg:col-span-5 relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Main Terminal/Console Box */}
          <div className={`relative rounded-2xl border overflow-hidden backdrop-blur-xl shadow-2xl transition-all duration-300 ${
            darkMode 
              ? 'bg-[#121215]/95 border-zinc-700/80 shadow-black/80' 
              : 'bg-white/95 border-zinc-300 shadow-xl'
          }`}>
            
            {/* Animated Laser Scanning Beam */}
            <div className="absolute inset-x-0 h-12 bg-gradient-to-b from-white/0 via-white/[0.08] to-white/0 pointer-events-none animate-beam-scan z-20"></div>

            {/* Console Window Header */}
            <div className={`flex items-center justify-between px-4 py-3 border-b ${
              darkMode ? 'bg-black/50 border-zinc-800 text-zinc-400' : 'bg-zinc-100 border-zinc-200 text-zinc-600'
            }`}>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-600 dark:bg-zinc-700"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-500 dark:bg-zinc-600"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-400 dark:bg-zinc-500"></span>
                </div>
                <span className="text-[11px] font-mono font-semibold ml-2">
                  live_scanner.ai
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-white text-black dark:bg-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700">
                  <Activity className="w-2.5 h-2.5 animate-pulse" />
                  REAL-TIME
                </span>
              </div>
            </div>

            {/* Career Selector Tabs */}
            <div className={`flex items-center gap-1 p-2 border-b overflow-x-auto no-scrollbar ${
              darkMode ? 'bg-zinc-900/40 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
            }`}>
              {SPOTLIGHT_CAREERS.map((career, idx) => (
                <button
                  key={career.id}
                  onClick={() => setActiveCareerIndex(idx)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    activeCareerIndex === idx
                      ? darkMode 
                        ? 'bg-white text-black shadow-sm' 
                        : 'bg-black text-white shadow-sm'
                      : darkMode 
                        ? 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60' 
                        : 'text-zinc-600 hover:text-black hover:bg-zinc-200/60'
                  }`}
                >
                  <span>{career.icon}</span>
                  <span>{career.title.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* Active Career Card Showcase Content */}
            <div className="p-5 animate-fade-in key={activeCareer.id}">
              
              {/* Role Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                    darkMode ? 'bg-zinc-900 text-zinc-400 border-zinc-800' : 'bg-zinc-100 text-zinc-600 border-zinc-200'
                  }`}>
                    {activeCareer.domain}
                  </span>
                  <h3 className={`text-lg font-black mt-1.5 ${darkMode ? 'text-white' : 'text-black'}`}>
                    {activeCareer.title}
                  </h3>
                </div>

                {/* Circular Match Gauge */}
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center border shadow-sm ${
                    darkMode ? 'bg-black border-zinc-700 text-white' : 'bg-white border-zinc-300 text-black'
                  }`}>
                    <span className="text-xs font-black">{activeCareer.matchScore}%</span>
                    <span className="text-[8px] uppercase tracking-wider font-semibold text-zinc-400">Match</span>
                  </div>
                </div>
              </div>

              {/* Real-Time Metrics Matrix */}
              <div className="grid grid-cols-2 gap-2.5 mb-4">
                <div className={`p-3 rounded-xl border ${
                  darkMode ? 'bg-zinc-900/70 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                }`}>
                  <div className="text-[10px] uppercase font-bold text-zinc-400 mb-0.5">Est. Annual Package</div>
                  <div className={`text-sm font-black ${darkMode ? 'text-white' : 'text-black'}`}>
                    {activeCareer.salary}
                  </div>
                </div>

                <div className={`p-3 rounded-xl border ${
                  darkMode ? 'bg-zinc-900/70 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                }`}>
                  <div className="text-[10px] uppercase font-bold text-zinc-400 mb-0.5">Industry Trajectory</div>
                  <div className={`text-sm font-black flex items-center gap-1 ${darkMode ? 'text-white' : 'text-black'}`}>
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{activeCareer.growth}</span>
                  </div>
                </div>
              </div>

              {/* In-Demand Core Skills */}
              <div className="mb-4">
                <div className="text-[11px] font-bold text-zinc-400 mb-2 flex items-center justify-between">
                  <span>High-Impact Skills & Tools:</span>
                  <span className="text-[10px] font-mono text-zinc-500">Auto-Verified</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeCareer.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border ${
                        darkMode 
                          ? 'bg-zinc-900/90 border-zinc-800 text-zinc-200' 
                          : 'bg-zinc-100 border-zinc-200 text-zinc-800'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Target Academic Institutions */}
              <div className={`p-3 rounded-xl border mb-4 ${
                darkMode ? 'bg-black/40 border-zinc-800/80' : 'bg-zinc-50/80 border-zinc-200'
              }`}>
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Top Feeder Universities</span>
                </div>
                <div className="text-xs font-semibold text-zinc-300 dark:text-zinc-400 flex flex-wrap gap-1.5">
                  {activeCareer.topColleges.join(' • ')}
                </div>
              </div>

              {/* Direct Explorer CTA within Console */}
              <div className="flex items-center gap-2">
                <button
                  onClick={scrollToDomains}
                  className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 btn-interactive cursor-pointer ${
                    darkMode 
                      ? 'bg-white text-black hover:bg-zinc-200' 
                      : 'bg-black text-white hover:bg-zinc-800'
                  }`}
                >
                  <span>Explore Complete {activeCareer.title.split(' ')[0]} Roadmap</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bottom Scanner Progress Ticker */}
            <div className={`px-4 py-2 border-t flex items-center justify-between text-[10px] font-mono ${
              darkMode ? 'bg-black/60 border-zinc-800 text-zinc-500' : 'bg-zinc-100 border-zinc-200 text-zinc-500'
            }`}>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>MATCHING ACCURACY: 99.2%</span>
              </div>
              <span>TAB {activeCareerIndex + 1} OF {SPOTLIGHT_CAREERS.length}</span>
            </div>
          </div>

          {/* Floating Floating Metric Chips around the Console */}
          <div className={`absolute -top-3 -right-3 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border backdrop-blur-md shadow-lg animate-float-delay-1 z-30 ${
            darkMode ? 'bg-zinc-900/90 border-zinc-700 text-white' : 'bg-white/90 border-zinc-300 text-black'
          }`}>
            <Sparkles className="w-3.5 h-3.5 text-zinc-400 animate-spin-slow" />
            <span className="text-xs font-bold">98.4% Fit Accuracy</span>
          </div>

          <div className={`absolute -bottom-3 -left-3 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border backdrop-blur-md shadow-lg animate-float-delay-3 z-30 ${
            darkMode ? 'bg-zinc-900/90 border-zinc-700 text-white' : 'bg-white/90 border-zinc-300 text-black'
          }`}>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs font-bold">12,500+ Verified Programs</span>
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