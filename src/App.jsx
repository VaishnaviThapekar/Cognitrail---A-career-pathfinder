import React, { useState, useEffect } from 'react';
import { Lightbulb, ChevronRight, Sparkles, X, Mail, Shield, FileText, Info } from 'lucide-react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import HowItWorksSection from './components/HowItWorksSection';
import WhyChooseSection from './components/WhyChooseSection';
import CareerCard from './components/CareerCard';
import CareerDetailModal from './components/CareerDetailModal';
import AdvancedProfilePage from './components/AdvancedProfilePage';
import CareerQuiz from './components/Careerquiz';
import CareerNewsFeed from './components/CareerNewsFeed';
import CareerChatbot from './components/CareerChatbot';
import AdvancedCareerChatbot from './components/AdvancedCareerChatbot';
import ResumeUploader from './components/ResumeUploader';
import StudentProfile from './components/StudentProfile';
import InterviewSimulator from './components/InterviewSimulator';
import CareerComparison from './components/CareerComparison';
import CollegeFinder from './components/CollegeFinder';
import SkillsGapAnalyzer from './components/SkillsGapAnalyzer';
import CareerRoadmapBuilder from './components/CareerRoadmapBuilder';
import CustomScrollbar from './components/CustomScrollbar';
import AuthModal from './components/AuthModal';
import { LevelUpNotification, AchievementNotification, GamificationDashboard } from './components/GamificationComponents';
import { useGamification } from './contexts/GamificationContext';
import { useAuth } from './contexts/AuthContext';
import { CAREER_DATABASE } from './data/careerDatabase';

function App() {
  const { isAuthenticated, user } = useAuth();
  const { trackCareerExplored, trackCareerSaved, trackQuizComplete } = useGamification();

  const [selectedDomain, setSelectedDomain] = useState(null);
  const [selectedSubField, setSelectedSubField] = useState(null);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [savedCareers, setSavedCareers] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showNews, setShowNews] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showAdvancedChatbot, setShowAdvancedChatbot] = useState(false);
  const [showGamification, setShowGamification] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [showCollegeFinder, setShowCollegeFinder] = useState(false);
  const [showSkillsAnalyzer, setShowSkillsAnalyzer] = useState(false);
  const [showRoadmapBuilder, setShowRoadmapBuilder] = useState(false);
  const [showResumeUploader, setShowResumeUploader] = useState(false);
  const [showStudentProfile, setShowStudentProfile] = useState(false);
  const [showInterviewSimulator, setShowInterviewSimulator] = useState(false);
  const [infoModalContent, setInfoModalContent] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    window.openSkillGap = (c) => {
      if (c) setSelectedCareer(c);
      setShowSkillsAnalyzer(true);
    };
    window.openQuiz = () => setShowQuiz(true);
    window.openResume = () => setShowResumeUploader(true);
    window.openInterview = () => setShowInterviewSimulator(true);
    window.openRoadmap = () => setShowRoadmapBuilder(true);
    return () => {
      delete window.openSkillGap;
      delete window.openQuiz;
      delete window.openResume;
      delete window.openInterview;
      delete window.openRoadmap;
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleGoHome = () => {
    setSelectedDomain(null);
    setSelectedSubField(null);
    setSelectedCareer(null);
    setShowProfile(false);
    setShowQuiz(false);
    setShowNews(false);
    setShowComparison(false);
    setShowCollegeFinder(false);
    setShowSkillsAnalyzer(false);
    setShowRoadmapBuilder(false);
    setShowResumeUploader(false);
    setShowStudentProfile(false);
    setShowInterviewSimulator(false);
    setInfoModalContent(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredDomains = Object.entries(CAREER_DATABASE).filter(([key, domain]) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      domain.name.toLowerCase().includes(query) ||
      domain.subFields.some(sf =>
        sf.name.toLowerCase().includes(query) ||
        sf.description.toLowerCase().includes(query) ||
        sf.careers.some(c => c.name.toLowerCase().includes(query))
      )
    );
  });

  const getAllCareers = () => {
    const careers = [];
    Object.values(CAREER_DATABASE).forEach(domain => {
      domain.subFields.forEach(subField => {
        careers.push(...subField.careers);
      });
    });
    return careers;
  };

  // Welcome Screen in sleek Black & White
  if (showWelcome) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 bg-[#09090b]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-zinc-700/15 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-zinc-600/15 rounded-full filter blur-3xl animate-pulse"></div>
        </div>

        <div className="relative z-10 text-center max-w-lg">
          <div className="mb-6 relative inline-block">
            <div className="w-24 h-24 mx-auto rounded-3xl bg-zinc-800 border border-zinc-700 p-1 shadow-2xl flex items-center justify-center">
              <div className="w-full h-full bg-black rounded-[22px] flex items-center justify-center">
                <Lightbulb className="w-12 h-12 text-white animate-pulse" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black mb-3 tracking-tight text-white">
            COGNITRAIL
          </h1>

          <p className="text-lg text-zinc-400 font-light mb-6">
            Your Intelligent Career Pathfinder
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-zinc-900 border border-zinc-700 text-zinc-300">
              150+ Careers
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-zinc-900 border border-zinc-700 text-zinc-300">
              500+ Top Colleges
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-zinc-900 border border-zinc-700 text-zinc-300">
              AI Powered
            </span>
          </div>

          <div className="flex justify-center items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white animate-bounce"></div>
            <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce delay-150"></div>
            <div className="w-2 h-2 rounded-full bg-zinc-600 animate-bounce delay-300"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'bg-[#09090b] text-zinc-100' : 'bg-[#fafafa] text-black'}`}>
      <CustomScrollbar darkMode={darkMode} />

      {/* Advanced Profile Page */}
      {showProfile && isAuthenticated && (
        <AdvancedProfilePage
          darkMode={darkMode}
          onClose={() => setShowProfile(false)}
        />
      )}

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          darkMode={darkMode}
          initialMode="signin"
        />
      )}

      {showResumeUploader && (
        <ResumeUploader onClose={() => setShowResumeUploader(false)} darkMode={darkMode} />
      )}

      {showStudentProfile && (
        <StudentProfile onClose={() => setShowStudentProfile(false)} darkMode={darkMode} />
      )}

      {showInterviewSimulator && (
        <InterviewSimulator onClose={() => setShowInterviewSimulator(false)} darkMode={darkMode} />
      )}

      {!showProfile && (
        <>
          {/* Header */}
          <Header
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onHomeClick={handleGoHome}
            onOpenQuiz={() => setShowQuiz(true)}
            onOpenRoadmap={() => setShowRoadmapBuilder(true)}
            onOpenSkills={() => setShowSkillsAnalyzer(true)}
            onOpenNews={() => setShowNews(true)}
            onOpenAdvisor={() => setShowAdvancedChatbot(true)}
            setShowProfile={setShowProfile}
            setShowGamification={setShowGamification}
            setShowComparison={setShowComparison}
            setShowCollegeFinder={setShowCollegeFinder}
          />

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-32">
            {!selectedDomain ? (
              // Home Page
              <div>
                <HeroSection
                  darkMode={darkMode}
                  onStartQuiz={() => setShowQuiz(true)}
                />

                {/* How Cognitrail Works */}
                <HowItWorksSection
                  darkMode={darkMode}
                  onStartQuiz={() => setShowQuiz(true)}
                  onExploreDomains={() => {
                    const el = document.getElementById('domains');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  onOpenSkills={() => setShowSkillsAnalyzer(true)}
                  onOpenRoadmap={() => setShowRoadmapBuilder(true)}
                />

                {/* Feature Shortcuts Grid - Monochrome */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 animate-fade-in">
                  {/* Career Quiz Card */}
                  <button
                    onClick={() => setShowQuiz(true)}
                    className={`group rounded-3xl p-7 border text-left flex flex-col justify-between hover-lift btn-interactive ${darkMode
                      ? 'bg-[#121215] border-zinc-800 hover:border-zinc-600'
                      : 'bg-white border-zinc-200 hover:border-zinc-400 shadow-md'
                      }`}
                  >
                    <div>
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-md mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 ${darkMode ? 'bg-zinc-900 border border-zinc-700 text-white' : 'bg-black text-white'}`}>
                        🎯
                      </div>
                      <h3 className={`text-xl font-black mb-2 transition-colors ${darkMode ? 'text-white group-hover:text-zinc-300' : 'text-black group-hover:text-zinc-700'}`}>
                        AI Career Quiz
                      </h3>
                      <p className={`text-sm leading-relaxed mb-6 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        5-minute intelligent assessment matching your skills, interests & work style
                      </p>
                    </div>
                    <div className={`flex items-center gap-1.5 font-bold text-xs ${darkMode ? 'text-zinc-300' : 'text-black'} group-hover:gap-2.5 transition-all`}>
                      <span>Start Assessment</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </button>

                  {/* AI Career Advisor Pro Card */}
                  <button
                    onClick={() => setShowAdvancedChatbot(true)}
                    className={`group rounded-3xl p-7 border text-left flex flex-col justify-between hover-lift btn-interactive ${darkMode
                      ? 'bg-[#121215] border-zinc-800 hover:border-zinc-600'
                      : 'bg-white border-zinc-200 hover:border-zinc-400 shadow-md'
                      }`}
                  >
                    <div>
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-md mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 ${darkMode ? 'bg-zinc-900 border border-zinc-700 text-white' : 'bg-black text-white'}`}>
                        ✨
                      </div>
                      <h3 className={`text-xl font-black mb-2 transition-colors ${darkMode ? 'text-white group-hover:text-zinc-300' : 'text-black group-hover:text-zinc-700'}`}>
                        AI Career Advisor Pro
                      </h3>
                      <p className={`text-sm leading-relaxed mb-6 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        Interactive chat for salary negotiation, interview prep, and career transitions
                      </p>
                    </div>
                    <div className={`flex items-center gap-1.5 font-bold text-xs ${darkMode ? 'text-zinc-300' : 'text-black'} group-hover:gap-2.5 transition-all`}>
                      <span>Launch Chat</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </button>

                  {/* Skills Gap Analyzer Card */}
                  <button
                    onClick={() => setShowSkillsAnalyzer(true)}
                    className={`group rounded-3xl p-7 border text-left flex flex-col justify-between hover-lift btn-interactive ${darkMode
                      ? 'bg-[#121215] border-zinc-800 hover:border-zinc-600'
                      : 'bg-white border-zinc-200 hover:border-zinc-400 shadow-md'
                      }`}
                  >
                    <div>
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-md mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 ${darkMode ? 'bg-zinc-900 border border-zinc-700 text-white' : 'bg-black text-white'}`}>
                        🎯
                      </div>
                      <h3 className={`text-xl font-black mb-2 transition-colors ${darkMode ? 'text-white group-hover:text-zinc-300' : 'text-black group-hover:text-zinc-700'}`}>
                        Skills Gap Analyzer
                      </h3>
                      <p className={`text-sm leading-relaxed mb-6 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        AI-powered skill analysis & tailored learning roadmap for your target job
                      </p>
                    </div>
                    <div className={`flex items-center gap-1.5 font-bold text-xs ${darkMode ? 'text-zinc-300' : 'text-black'} group-hover:gap-2.5 transition-all`}>
                      <span>Analyze Skills</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </button>

                  {/* Career Roadmap Builder Card */}
                  <button
                    onClick={() => setShowRoadmapBuilder(true)}
                    className={`group rounded-3xl p-7 border text-left flex flex-col justify-between hover-lift btn-interactive ${darkMode
                      ? 'bg-[#121215] border-zinc-800 hover:border-zinc-600'
                      : 'bg-white border-zinc-200 hover:border-zinc-400 shadow-md'
                      }`}
                  >
                    <div>
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-md mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 ${darkMode ? 'bg-zinc-900 border border-zinc-700 text-white' : 'bg-black text-white'}`}>
                        🗺️
                      </div>
                      <h3 className={`text-xl font-black mb-2 transition-colors ${darkMode ? 'text-white group-hover:text-zinc-300' : 'text-black group-hover:text-zinc-700'}`}>
                        Roadmap Builder
                      </h3>
                      <p className={`text-sm leading-relaxed mb-6 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        Build customized stage-by-stage milestones from student to senior lead
                      </p>
                    </div>
                    <div className={`flex items-center gap-1.5 font-bold text-xs ${darkMode ? 'text-zinc-300' : 'text-black'} group-hover:gap-2.5 transition-all`}>
                      <span>Build Roadmap</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </button>

                  {/* College Finder Card */}
                  <button
                    onClick={() => setShowCollegeFinder(true)}
                    className={`group rounded-3xl p-7 border text-left flex flex-col justify-between hover-lift btn-interactive ${darkMode
                      ? 'bg-[#121215] border-zinc-800 hover:border-zinc-600'
                      : 'bg-white border-zinc-200 hover:border-zinc-400 shadow-md'
                      }`}
                  >
                    <div>
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-md mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 ${darkMode ? 'bg-zinc-900 border border-zinc-700 text-white' : 'bg-black text-white'}`}>
                        🏫
                      </div>
                      <h3 className={`text-xl font-black mb-2 transition-colors ${darkMode ? 'text-white group-hover:text-zinc-300' : 'text-black group-hover:text-zinc-700'}`}>
                        College Finder
                      </h3>
                      <p className={`text-sm leading-relaxed mb-6 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        Explore 500+ colleges with ratings, entrance exams, and direct links
                      </p>
                    </div>
                    <div className={`flex items-center gap-1.5 font-bold text-xs ${darkMode ? 'text-zinc-300' : 'text-black'} group-hover:gap-2.5 transition-all`}>
                      <span>Find Colleges</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </button>

                  {/* Career Comparison Card */}
                  <button
                    onClick={() => setShowComparison(true)}
                    className={`group rounded-3xl p-7 border text-left flex flex-col justify-between hover-lift btn-interactive ${darkMode
                      ? 'bg-[#121215] border-zinc-800 hover:border-zinc-600'
                      : 'bg-white border-zinc-200 hover:border-zinc-400 shadow-md'
                      }`}
                  >
                    <div>
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-md mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 ${darkMode ? 'bg-zinc-900 border border-zinc-700 text-white' : 'bg-black text-white'}`}>
                        ⚖️
                      </div>
                      <h3 className={`text-xl font-black mb-2 transition-colors ${darkMode ? 'text-white group-hover:text-zinc-300' : 'text-black group-hover:text-zinc-700'}`}>
                        Compare Careers
                      </h3>
                      <p className={`text-sm leading-relaxed mb-6 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        Side-by-side comparison of salaries, required skills, and career outlooks
                      </p>
                    </div>
                    <div className={`flex items-center gap-1.5 font-bold text-xs ${darkMode ? 'text-zinc-300' : 'text-black'} group-hover:gap-2.5 transition-all`}>
                      <span>Compare Now</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </button>
                </div>

                <WhyChooseSection darkMode={darkMode} />

                {/* Domain Selection Section */}
                <div id="domains" className="pt-4 animate-fade-in">
                  <div className="text-center mb-12">
                    <h2 className={`text-3xl sm:text-4xl font-black ${darkMode ? 'text-white' : 'text-black'} mb-3`}>
                      Explore Career Domains
                    </h2>
                    <p className={`text-base sm:text-lg ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      Select an area of interest to discover specialized paths and salary data
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDomains.map(([key, domain]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedDomain(key)}
                        className={`group relative rounded-3xl p-8 border text-left overflow-hidden hover-lift btn-interactive ${darkMode
                          ? 'bg-[#121215] border-zinc-800 hover:border-zinc-600'
                          : 'bg-white border-zinc-200 hover:border-zinc-400 shadow-md'
                          }`}
                      >
                        <div className="relative z-10">
                          <div className={`mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl border shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ${darkMode
                            ? 'bg-zinc-900 border-zinc-700 text-white'
                            : 'bg-zinc-100 border-zinc-300 text-black'
                            }`}>
                            <span className="text-4xl">{domain.icon}</span>
                          </div>

                          <h3 className={`text-2xl font-black mb-2 transition-colors ${darkMode ? 'text-white group-hover:text-zinc-300' : 'text-black group-hover:text-zinc-700'}`}>
                            {domain.name}
                          </h3>

                          <p className={`text-xs font-semibold mb-6 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                            {domain.subFields.length} specialized fields • 25+ career tracks
                          </p>

                          <div className={`flex items-center gap-1.5 font-bold text-sm ${darkMode ? 'text-zinc-300' : 'text-black'} group-hover:gap-2.5 transition-all`}>
                            <span>Explore Fields</span>
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : !selectedSubField ? (
              // SubField Selection
              <div>
                <div className="mb-6">
                  <button
                    onClick={() => setSelectedDomain(null)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white hover:opacity-80 transition-all"
                  >
                    ← Back to All Domains
                  </button>
                </div>

                <div className="text-center mb-12">
                  <h2 className={`text-3xl sm:text-4xl font-black ${darkMode ? 'text-white' : 'text-black'} mb-3`}>
                    {CAREER_DATABASE[selectedDomain].name}
                  </h2>
                  <p className={`text-base sm:text-lg ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    Select a specialization field to view career pathways
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {CAREER_DATABASE[selectedDomain].subFields.map((subField) => (
                    <button
                      key={subField.id}
                      onClick={() => setSelectedSubField(subField)}
                      className={`group rounded-3xl p-8 border transition-all duration-300 text-left hover:shadow-2xl hover:-translate-y-1 ${darkMode
                        ? 'bg-[#121215] border-zinc-800 hover:border-zinc-600'
                        : 'bg-white border-zinc-200 hover:border-zinc-400 shadow-md'
                        }`}
                    >
                      <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-black'} transition-colors`}>
                        {subField.name}
                      </h3>
                      <p className={`text-sm mb-6 leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        {subField.description}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800 text-xs font-bold">
                        <span className={darkMode ? 'text-zinc-400' : 'text-zinc-500'}>
                          {subField.careers.length} career options
                        </span>
                        <div className={`flex items-center gap-1 ${darkMode ? 'text-white' : 'text-black'} group-hover:gap-2 transition-all`}>
                          <span>View Careers</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              // Career Listing View
              <div>
                <div className="mb-6 flex items-center gap-4">
                  <button
                    onClick={() => setSelectedSubField(null)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white hover:opacity-80 transition-all"
                  >
                    ← Back to Specializations
                  </button>
                </div>

                <div className="text-center mb-12">
                  <h2 className={`text-3xl sm:text-4xl font-black ${darkMode ? 'text-white' : 'text-black'} mb-3`}>
                    {selectedSubField.name}
                  </h2>
                  <p className={`text-base sm:text-lg ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    {selectedSubField.description}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {selectedSubField.careers.map((career, idx) => (
                    <CareerCard
                      key={idx}
                      career={career}
                      onSelect={(c) => {
                        setSelectedCareer(c);
                        trackCareerExplored();
                      }}
                      darkMode={darkMode}
                      savedCareers={savedCareers}
                      setSavedCareers={(careers) => {
                        const isAdding = careers.length > savedCareers.length;
                        if (isAdding) trackCareerSaved();
                        setSavedCareers(careers);
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </main>

          {/* Career Detail Modal */}
          {selectedCareer && (
            <CareerDetailModal
              career={selectedCareer}
              onClose={() => setSelectedCareer(null)}
              darkMode={darkMode}
            />
          )}

          {/* Footer */}
          <footer className={`border-t mt-20 ${darkMode ? 'bg-[#09090b] border-zinc-800 text-zinc-400' : 'bg-white border-zinc-200 text-zinc-600'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>💡</div>
                    <span className={`text-lg font-black tracking-tight ${darkMode ? 'text-white' : 'text-black'}`}>COGNITRAIL</span>
                  </div>
                  <p className="text-xs leading-relaxed">
                    Think Smart. Choose Right. Grow Ahead. AI-driven career guidance for next-gen students.
                  </p>
                </div>

                <div>
                  <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 ${darkMode ? 'text-white' : 'text-black'}`}>
                    Quick Links
                  </h4>
                  <ul className="space-y-2 text-xs">
                    <li>
                      <button
                        onClick={() => setInfoModalContent({
                          title: 'About Cognitrail',
                          icon: Info,
                          content: 'Cognitrail is an intelligent career navigation platform designed to bridge the gap between student aspirations and real-world career success. With real-time salary insights, 500+ college listings, AI assessment quizzes, roadmap builders, and skills gap analysis, Cognitrail equips every student with clear, actionable pathways.'
                        })}
                        className="hover:text-black dark:hover:text-white transition-colors"
                      >
                        About Us
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setInfoModalContent({
                          title: 'Contact Support',
                          icon: Mail,
                          content: 'Have questions, suggestions, or feedback? Reach our academic counseling and technical support team anytime at support@cognitrail.ai or through our AI Advisor Pro assistant.'
                        })}
                        className="hover:text-black dark:hover:text-white transition-colors"
                      >
                        Contact & Support
                      </button>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 ${darkMode ? 'text-white' : 'text-black'}`}>
                    Resources
                  </h4>
                  <ul className="space-y-2 text-xs">
                    <li>
                      <button
                        onClick={() => setInfoModalContent({
                          title: 'Career Exploration Guide',
                          icon: FileText,
                          content: 'Our 2026 Comprehensive Career Guide covers high-growth industries including Artificial Intelligence, Clean Energy, Biomedical Engineering, Fintech, Corporate Law, and Creative Design with required entrance exams and degrees.'
                        })}
                        className="hover:text-black dark:hover:text-white transition-colors"
                      >
                        Career Guide
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setShowNews(true)}
                        className="hover:text-black dark:hover:text-white transition-colors"
                      >
                        Exams & News Feed
                      </button>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 ${darkMode ? 'text-white' : 'text-black'}`}>
                    Trust & Legal
                  </h4>
                  <ul className="space-y-2 text-xs">
                    <li>
                      <button
                        onClick={() => setInfoModalContent({
                          title: 'Privacy Policy',
                          icon: Shield,
                          content: 'Cognitrail values your privacy. Quiz responses and profile data are stored securely to generate personalized recommendations and are never sold to third-party advertisers.'
                        })}
                        className="hover:text-black dark:hover:text-white transition-colors"
                      >
                        Privacy Policy
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setInfoModalContent({
                          title: 'Terms of Service',
                          icon: FileText,
                          content: 'All recommendations and guides on Cognitrail are intended for informational and educational guidance purposes. Students are advised to verify official college admissions and entrance exam notifications independently.'
                        })}
                        className="hover:text-black dark:hover:text-white transition-colors"
                      >
                        Terms of Service
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 text-center text-xs">
                <p>© 2026 COGNITRAIL • 150+ Career Paths • 500+ Top Colleges • AI Powered Guidance</p>
              </div>
            </div>
          </footer>
        </>
      )}

      {/* Career Quiz Modal */}
      {showQuiz && (
        <CareerQuiz
          onClose={() => setShowQuiz(false)}
          darkMode={darkMode}
          onComplete={(res) => {
            trackQuizComplete();
          }}
          onSelectCareer={(career) => {
            setSelectedCareer(career);
          }}
        />
      )}

      {/* Career News Modal */}
      {showNews && (
        <div className={`fixed inset-0 z-50 overflow-y-auto ${darkMode ? 'bg-[#09090b]' : 'bg-zinc-50'}`}>
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-black'}`}>
                Career News & Exam Updates
              </h2>
              <button
                onClick={() => setShowNews(false)}
                className={`p-2.5 rounded-xl transition-colors ${darkMode ? 'bg-zinc-800 text-zinc-300 hover:text-white' : 'bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200'}`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <CareerNewsFeed darkMode={darkMode} />
          </div>
        </div>
      )}

      {/* Career Chatbot */}
      {showChatbot && (
        <CareerChatbot
          darkMode={darkMode}
          onClose={() => setShowChatbot(false)}
        />
      )}

      {/* Advanced AI Career Advisor */}
      {showAdvancedChatbot && (
        <AdvancedCareerChatbot
          darkMode={darkMode}
          onClose={() => setShowAdvancedChatbot(false)}
        />
      )}

      {/* Floating Advanced AI Button */}
      {!showAdvancedChatbot && !showChatbot && (
        <button
          onClick={() => setShowAdvancedChatbot(true)}
          className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center animate-float btn-interactive hover:scale-110 cursor-pointer group border ${darkMode
            ? 'bg-white text-black border-zinc-300 shadow-white/10 hover:shadow-white/20'
            : 'bg-black text-white border-zinc-700 shadow-black/30 hover:shadow-black/40'
            }`}
          title="Open AI Career Advisor Pro"
        >
          <Sparkles className="w-6 h-6 transform group-hover:rotate-45 transition-transform duration-300" />
        </button>
      )}

      {/* Gamification Notifications */}
      <LevelUpNotification darkMode={darkMode} />
      <AchievementNotification darkMode={darkMode} />

      {/* Gamification Dashboard */}
      {showGamification && (
        <GamificationDashboard
          darkMode={darkMode}
          onClose={() => setShowGamification(false)}
        />
      )}

      {/* Career Comparison Modal */}
      {showComparison && (
        <CareerComparison
          onClose={() => setShowComparison(false)}
          darkMode={darkMode}
          allCareers={getAllCareers()}
        />
      )}

      {/* College Finder Modal */}
      {showCollegeFinder && (
        <CollegeFinder
          onClose={() => setShowCollegeFinder(false)}
          darkMode={darkMode}
        />
      )}

      {/* Skills Gap Analyzer Modal */}
      {showSkillsAnalyzer && (
        <SkillsGapAnalyzer
          onClose={() => setShowSkillsAnalyzer(false)}
          darkMode={darkMode}
        />
      )}

      {/* Career Roadmap Builder Modal */}
      {showRoadmapBuilder && (
        <CareerRoadmapBuilder
          onClose={() => setShowRoadmapBuilder(false)}
          darkMode={darkMode}
        />
      )}

      {/* Informational Modal for Footer Links */}
      {infoModalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`max-w-lg w-full rounded-3xl p-6 sm:p-8 border shadow-2xl ${darkMode ? 'bg-[#121215] border-zinc-800 text-zinc-200' : 'bg-white border-zinc-300 text-black'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className={`p-2 rounded-xl ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                  <infoModalContent.icon className="w-5 h-5" />
                </div>
                <h3 className={`text-xl font-black ${darkMode ? 'text-white' : 'text-black'}`}>
                  {infoModalContent.title}
                </h3>
              </div>
              <button
                onClick={() => setInfoModalContent(null)}
                className="p-2 rounded-xl text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm leading-relaxed mb-6 text-zinc-600 dark:text-zinc-300">
              {infoModalContent.content}
            </p>
            <button
              onClick={() => setInfoModalContent(null)}
              className={`w-full py-3 rounded-xl font-bold transition-all text-sm ${darkMode ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'}`}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;