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
import SalaryCalculatorModal from './components/SalaryCalculatorModal';
import ExamCountdownTracker from './components/ExamCountdownTracker';
import ReadinessScorecardModal from './components/ReadinessScorecardModal';
import FloatingQuickDock from './components/FloatingQuickDock';
import AlumniConnectModal from './components/AlumniConnectModal';
import ScholarshipFinderModal from './components/ScholarshipFinderModal';
import AIMockInterviewModal from './components/AIMockInterviewModal';
import CloudSyncModal from './components/CloudSyncModal';
import { LevelUpNotification, AchievementNotification, GamificationDashboard } from './components/GamificationComponents';
import { useGamification } from './contexts/GamificationContext';
import { useAuth } from './contexts/AuthContext';
import { useLanguage } from './contexts/LanguageContext';
import { CAREER_DATABASE } from './data/careerDatabase';

function App() {
  const { isAuthenticated } = useAuth();
  const { trackCareerExplored, trackCareerSaved, trackQuizComplete } = useGamification();
  const { t } = useLanguage();

  const [selectedDomain, setSelectedDomain] = useState(null);
  const [selectedSubField, setSelectedSubField] = useState(null);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem('darkMode') === 'true';
    } catch {
      return false;
    }
  });
  const [showProfile, setShowProfile] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [savedCareers, setSavedCareers] = useState(() => {
    try {
      const stored = localStorage.getItem('cognitrail_saved_careers');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
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
  const [showSalaryCalculator, setShowSalaryCalculator] = useState(false);
  const [showExamTracker, setShowExamTracker] = useState(false);
  const [showReadinessScorecard, setShowReadinessScorecard] = useState(false);
  const [showAlumniConnect, setShowAlumniConnect] = useState(false);
  const [showScholarshipFinder, setShowScholarshipFinder] = useState(false);
  const [showMockInterview, setShowMockInterview] = useState(false);
  const [showCloudSync, setShowCloudSync] = useState(false);
  const [selectedCareerForReadiness, setSelectedCareerForReadiness] = useState(null);
  const [infoModalContent, setInfoModalContent] = useState(null);
  const [activeDomainFilter, setActiveDomainFilter] = useState('all');

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('cognitrail_saved_careers', JSON.stringify(savedCareers));
    } catch (e) {
      console.warn('Could not save careers', e);
    }
  }, [savedCareers]);

  useEffect(() => {
    window.openSkillGap = (c) => {
      if (c) setSelectedCareer(c);
      setShowSkillsAnalyzer(true);
    };
    window.openQuiz = () => setShowQuiz(true);
    window.openResume = () => setShowResumeUploader(true);
    window.openInterview = () => setShowInterviewSimulator(true);
    window.openMockInterview = () => setShowMockInterview(true);
    window.openCloudSync = () => setShowCloudSync(true);
    window.openRoadmap = () => setShowRoadmapBuilder(true);
    window.openSalary = () => setShowSalaryCalculator(true);
    window.openExams = () => setShowExamTracker(true);
    window.openMentors = () => setShowAlumniConnect(true);
    window.openScholarships = () => setShowScholarshipFinder(true);
    window.openReadiness = (c) => {
      if (c) setSelectedCareerForReadiness(c);
      setShowReadinessScorecard(true);
    };
    return () => {
      delete window.openSkillGap;
      delete window.openQuiz;
      delete window.openResume;
      delete window.openInterview;
      delete window.openMockInterview;
      delete window.openCloudSync;
      delete window.openRoadmap;
      delete window.openSalary;
      delete window.openExams;
      delete window.openMentors;
      delete window.openScholarships;
      delete window.openReadiness;
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

  const getAllCareers = () => {
    const careersMap = new Map();
    if (!CAREER_DATABASE) return [];

    Object.entries(CAREER_DATABASE).forEach(([domainKey, domain]) => {
      if (domain.subFields && Array.isArray(domain.subFields)) {
        domain.subFields.forEach(subField => {
          if (subField.careers && Array.isArray(subField.careers)) {
            subField.careers.forEach(career => {
              if (career && career.name && !careersMap.has(career.name)) {
                careersMap.set(career.name, {
                  ...career,
                  domainKey,
                  domainName: domain.name,
                  subFieldName: subField.name
                });
              }
            });
          }
        });
      }
    });

    return Array.from(careersMap.values());
  };

  const getFilteredCareers = () => {
    const all = getAllCareers();
    return all.filter(c => {
      // Domain filter check
      if (activeDomainFilter !== 'all' && c.domainKey !== activeDomainFilter) {
        return false;
      }
      // Search query check
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = (c.name || '').toLowerCase().includes(q);
        const matchesDesc = (c.description || '').toLowerCase().includes(q);
        const matchesDomain = (c.domainName || '').toLowerCase().includes(q);
        const matchesSub = (c.subFieldName || '').toLowerCase().includes(q);
        const matchesSkills = (c.skills || []).some(s => s.toLowerCase().includes(q));
        const matchesEducation = (c.education || '').toLowerCase().includes(q);
        return matchesName || matchesDesc || matchesDomain || matchesSub || matchesSkills || matchesEducation;
      }
      return true;
    });
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveDomainFilter('all');
    setSelectedDomain(null);
    setSelectedSubField(null);
  };

  // Welcome Screen matching inside 5-Shade Ocean & Royal Blue UI
  if (showWelcome) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 bg-[#071326]">
        {/* Animated Multi-Shade Ambient Orbs & Mesh */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-[34rem] h-[34rem] bg-[#003B73]/40 rounded-full filter blur-3xl animate-orb-1"></div>
          <div className="absolute -bottom-32 -right-32 w-[36rem] h-[36rem] bg-[#0265A6]/30 rounded-full filter blur-3xl animate-orb-2"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-[#6096BA]/15 rounded-full filter blur-3xl animate-pulse-glow"></div>
          
          {/* High-tech matrix dot pattern */}
          <div 
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
              backgroundSize: '24px 24px'
            }}
          ></div>
        </div>

        <div className="relative z-10 text-center max-w-lg animate-fade-in-scale">
          {/* Logo Badge Icon with Glow */}
          <div className="mb-6 relative inline-block">
            <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-[#003B73] via-[#0265A6] to-[#6096BA] p-1 shadow-[0_0_40px_rgba(2,101,166,0.4)] flex items-center justify-center">
              <div className="w-full h-full bg-[#071326] rounded-[22px] flex items-center justify-center">
                <Lightbulb className="w-12 h-12 text-[#0265A6] animate-pulse" />
              </div>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl font-black mb-3 tracking-tight text-white">
            COGNITRAIL
          </h1>

          <p className="text-lg font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#003B73] via-[#0265A6] to-[#6096BA]">
            Your Intelligent Career Pathfinder
          </p>

          {/* Feature Badge Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#0A1E3F] border border-[#003B73] text-[#6096BA] shadow-sm">
              150+ Careers
            </span>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#0A1E3F] border border-[#003B73] text-[#6096BA] shadow-sm">
              500+ Top Colleges
            </span>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-[#003B73] to-[#0265A6] text-white shadow-sm">
              Precision AI
            </span>
          </div>

          {/* Glowing Animated Loading Dots */}
          <div className="flex justify-center items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#0265A6] animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#6096BA] animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#003B73] animate-bounce" style={{ animationDelay: '300ms' }}></div>
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

      {showSalaryCalculator && (
        <SalaryCalculatorModal onClose={() => setShowSalaryCalculator(false)} darkMode={darkMode} />
      )}

      {showExamTracker && (
        <ExamCountdownTracker onClose={() => setShowExamTracker(false)} darkMode={darkMode} />
      )}

      {showReadinessScorecard && (
        <ReadinessScorecardModal
          onClose={() => {
            setShowReadinessScorecard(false);
            setSelectedCareerForReadiness(null);
          }}
          darkMode={darkMode}
          initialRole={selectedCareerForReadiness?.name}
        />
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
            onOpenCloudSync={() => setShowCloudSync(true)}
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

                {/* Feature Shortcuts Grid - 5-Shade Royal Blue Theme */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 animate-fade-in">
                  {/* Career Quiz Card */}
                  <button
                    onClick={() => setShowQuiz(true)}
                    className={`group rounded-3xl p-7 border text-left flex flex-col justify-between hover-lift btn-interactive ${darkMode
                      ? 'bg-gradient-to-b from-[#0A1E3F] to-[#071326] border-[#003B73] hover:border-[#0265A6] shadow-xl'
                      : 'bg-white border-[#BACDDF] hover:border-[#0265A6] shadow-md'
                      }`}
                  >
                    <div>
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-md mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 bg-gradient-to-br from-[#003B73] via-[#0265A6] to-[#003B73] text-white">
                        🎯
                      </div>
                      <h3 className={`text-xl font-black mb-2 transition-colors ${darkMode ? 'text-white group-hover:text-[#6096BA]' : 'text-[#051C3E] group-hover:text-[#0265A6]'}`}>
                        {t('aiQuizCardTitle', 'AI Career Quiz')}
                      </h3>
                      <p className={`text-sm leading-relaxed mb-6 ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
                        {t('aiQuizCardDesc', '5-minute intelligent assessment matching your skills, interests & work style')}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 font-bold text-xs text-[#0265A6] group-hover:gap-2.5 transition-all">
                      <span>{t('startQuizCTA', 'Start Assessment')}</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </button>

                  {/* AI Career Advisor Pro Card */}
                  <button
                    onClick={() => setShowAdvancedChatbot(true)}
                    className={`group rounded-3xl p-7 border text-left flex flex-col justify-between hover-lift btn-interactive ${darkMode
                      ? 'bg-gradient-to-b from-[#0A1E3F] to-[#071326] border-[#003B73] hover:border-[#0265A6] shadow-xl'
                      : 'bg-white border-[#BACDDF] hover:border-[#0265A6] shadow-md'
                      }`}
                  >
                    <div>
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-md mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 bg-gradient-to-br from-[#003B73] via-[#0265A6] to-[#003B73] text-white">
                        ✨
                      </div>
                      <h3 className={`text-xl font-black mb-2 transition-colors ${darkMode ? 'text-white group-hover:text-[#6096BA]' : 'text-[#051C3E] group-hover:text-[#0265A6]'}`}>
                        {t('aiAdvisorCardTitle', 'AI Career Advisor Pro')}
                      </h3>
                      <p className={`text-sm leading-relaxed mb-6 ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
                        {t('aiAdvisorCardDesc', 'Interactive chat for salary negotiation, interview prep, and career transitions')}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 font-bold text-xs text-[#0265A6] group-hover:gap-2.5 transition-all">
                      <span>{t('navAdvisor', 'Launch Chat')}</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </button>

                  {/* Skills Gap Analyzer Card */}
                  <button
                    onClick={() => setShowSkillsAnalyzer(true)}
                    className={`group rounded-3xl p-7 border text-left flex flex-col justify-between hover-lift btn-interactive ${darkMode
                      ? 'bg-gradient-to-b from-[#0A1E3F] to-[#071326] border-[#003B73] hover:border-[#0265A6] shadow-xl'
                      : 'bg-white border-[#BACDDF] hover:border-[#0265A6] shadow-md'
                      }`}
                  >
                    <div>
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-md mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 bg-gradient-to-br from-[#003B73] via-[#0265A6] to-[#003B73] text-white">
                        🎯
                      </div>
                      <h3 className={`text-xl font-black mb-2 transition-colors ${darkMode ? 'text-white group-hover:text-[#6096BA]' : 'text-[#051C3E] group-hover:text-[#0265A6]'}`}>
                        {t('skillsAnalyzerCardTitle', 'Skills Gap Analyzer')}
                      </h3>
                      <p className={`text-sm leading-relaxed mb-6 ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
                        {t('skillsAnalyzerCardDesc', 'AI-powered skill analysis & tailored learning roadmap for your target job')}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 font-bold text-xs text-[#0265A6] group-hover:gap-2.5 transition-all">
                      <span>{t('navSkills', 'Analyze Skills')}</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </button>

                  {/* Career Roadmap Builder Card */}
                  <button
                    onClick={() => setShowRoadmapBuilder(true)}
                    className={`group rounded-3xl p-7 border text-left flex flex-col justify-between hover-lift btn-interactive ${darkMode
                      ? 'bg-gradient-to-b from-[#0A1E3F] to-[#071326] border-[#003B73] hover:border-[#0265A6] shadow-xl'
                      : 'bg-white border-[#BACDDF] hover:border-[#0265A6] shadow-md'
                      }`}
                  >
                    <div>
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-md mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 bg-gradient-to-br from-[#003B73] via-[#0265A6] to-[#003B73] text-white">
                        🗺️
                      </div>
                      <h3 className={`text-xl font-black mb-2 transition-colors ${darkMode ? 'text-white group-hover:text-[#6096BA]' : 'text-[#051C3E] group-hover:text-[#0265A6]'}`}>
                        {t('roadmapCardTitle', 'Roadmap Builder')}
                      </h3>
                      <p className={`text-sm leading-relaxed mb-6 ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
                        {t('roadmapCardDesc', 'Build customized stage-by-stage milestones from student to senior lead')}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 font-bold text-xs text-[#0265A6] group-hover:gap-2.5 transition-all">
                      <span>{t('navRoadmap', 'Build Roadmap')}</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </button>

                  {/* College Finder Card */}
                  <button
                    onClick={() => setShowCollegeFinder(true)}
                    className={`group rounded-3xl p-7 border text-left flex flex-col justify-between hover-lift btn-interactive ${darkMode
                      ? 'bg-gradient-to-b from-[#0A1E3F] to-[#071326] border-[#003B73] hover:border-[#0265A6] shadow-xl'
                      : 'bg-white border-[#BACDDF] hover:border-[#0265A6] shadow-md'
                      }`}
                  >
                    <div>
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-md mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 bg-gradient-to-br from-[#003B73] via-[#0265A6] to-[#003B73] text-white">
                        🏫
                      </div>
                      <h3 className={`text-xl font-black mb-2 transition-colors ${darkMode ? 'text-white group-hover:text-[#6096BA]' : 'text-[#051C3E] group-hover:text-[#0265A6]'}`}>
                        {t('collegeCardTitle', 'College Finder')}
                      </h3>
                      <p className={`text-sm leading-relaxed mb-6 ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
                        {t('collegeCardDesc', 'Explore 500+ colleges with ratings, entrance exams, and direct links')}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 font-bold text-xs text-[#0265A6] group-hover:gap-2.5 transition-all">
                      <span>{t('navColleges', 'Find Colleges')}</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </button>

                  {/* Career Comparison Card */}
                  <button
                    onClick={() => setShowComparison(true)}
                    className={`group rounded-3xl p-7 border text-left flex flex-col justify-between hover-lift btn-interactive ${darkMode
                      ? 'bg-gradient-to-b from-[#0A1E3F] to-[#071326] border-[#003B73] hover:border-[#0265A6] shadow-xl'
                      : 'bg-white border-[#BACDDF] hover:border-[#0265A6] shadow-md'
                      }`}
                  >
                    <div>
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-md mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 bg-gradient-to-br from-[#003B73] via-[#0265A6] to-[#003B73] text-white">
                        ⚖️
                      </div>
                      <h3 className={`text-xl font-black mb-2 transition-colors ${darkMode ? 'text-white group-hover:text-[#6096BA]' : 'text-[#051C3E] group-hover:text-[#0265A6]'}`}>
                        {t('compareCardTitle', 'Compare Careers')}
                      </h3>
                      <p className={`text-sm leading-relaxed mb-6 ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
                        {t('compareCardDesc', 'Side-by-side comparison of salaries, required skills, and career outlooks')}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 font-bold text-xs text-[#0265A6] group-hover:gap-2.5 transition-all">
                      <span>{t('navCompare', 'Compare Now')}</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </button>
                </div>

                <WhyChooseSection darkMode={darkMode} />

                {/* Domain & Career Discovery Section */}
                <div id="domains" className="pt-4 animate-fade-in">
                  <div className="text-center mb-8">
                    <h2 className={`text-3xl sm:text-4xl font-black ${darkMode ? 'text-white' : 'text-[#051C3E]'} mb-3`}>
                      {t('exploreDomainsHeader', 'Explore Career Pathways & Domains')}
                    </h2>
                    <p className={`text-base sm:text-lg ${darkMode ? 'text-zinc-400' : 'text-zinc-600'} max-w-2xl mx-auto`}>
                      {t('exploreDomainsSub', 'Filter by domain, search by specific job title or skill, and inspect 150+ comprehensive roadmaps.')}
                    </p>
                  </div>

                  {/* Search and Domain Filter Controls */}
                  <div className={`p-4 sm:p-6 rounded-3xl border mb-8 ${
                    darkMode ? 'bg-[#0A1E3F]/90 border-[#003B73] shadow-xl' : 'bg-white border-[#BACDDF] shadow-md'
                  }`}>
                    {/* Search Input Bar */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 mb-5">
                      <div className={`flex-1 flex items-center gap-2 px-4 py-3 rounded-2xl border w-full ${
                        darkMode ? 'bg-[#071326] border-[#003B73] text-white' : 'bg-[#EBF3FA] border-[#BACDDF] text-[#051C3E]'
                      }`}>
                        <span className="text-[#0265A6] text-sm">🔍</span>
                        <input
                          id="career-search"
                          type="text"
                          placeholder={t('searchPlaceholder', 'Search careers by name, skills, or degree...')}
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-transparent border-none text-sm focus:outline-none placeholder:text-zinc-400"
                        />
                        {searchQuery && (
                          <button
                            onClick={() => setSearchQuery('')}
                            className="p-1 rounded-lg text-zinc-400 hover:text-white"
                            title="Clear search"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      {(searchQuery || activeDomainFilter !== 'all') && (
                        <button
                          onClick={handleResetFilters}
                          className={`px-5 py-3 rounded-2xl font-bold text-xs btn-interactive border whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                            darkMode 
                              ? 'bg-[#0A1E3F] border-[#003B73] text-zinc-200 hover:bg-[#003B73]' 
                              : 'bg-[#EBF3FA] border-[#BACDDF] text-[#0265A6] hover:bg-[#BACDDF]/40'
                          }`}
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>{t('resetFilters', 'Reset All Filters')}</span>
                        </button>
                      )}
                    </div>

                    {/* Domain Filter Chips */}
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                      {[
                        { id: 'all', label: 'All Domains (150+)', icon: '🌐' },
                        { id: 'science', label: 'Science & Medical', icon: '🔬' },
                        { id: 'engineering', label: 'Engineering & AI', icon: '💻' },
                        { id: 'commerce', label: 'Commerce & Finance', icon: '💼' },
                        { id: 'arts', label: 'Arts & Design', icon: '🎨' },
                        { id: 'law', label: 'Law & Governance', icon: '⚖️' },
                        { id: 'government', label: 'Civil & Govt', icon: '🏛️' },
                        { id: 'education', label: 'Education', icon: '📚' },
                        { id: 'sports', label: 'Sports & Fitness', icon: '⚽' }
                      ].map((chip) => (
                        <button
                          key={chip.id}
                          onClick={() => setActiveDomainFilter(chip.id)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 btn-interactive cursor-pointer ${
                            activeDomainFilter === chip.id
                              ? 'bg-gradient-to-r from-[#003B73] to-[#0265A6] text-white shadow-md scale-105'
                              : darkMode
                                ? 'bg-[#071326] border border-[#003B73] text-zinc-300 hover:text-white hover:border-[#0265A6]'
                                : 'bg-[#EBF3FA] border border-[#BACDDF] text-[#0265A6] hover:bg-[#0265A6] hover:text-white'
                          }`}
                        >
                          <span>{chip.icon}</span>
                          <span>{chip.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Active Filters Result Count */}
                  {(searchQuery || activeDomainFilter !== 'all') ? (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-bold ${darkMode ? 'text-zinc-200' : 'text-[#051C3E]'}`}>
                            Search & Filter Results
                          </span>
                          <span className={`text-xs px-2.5 py-0.5 rounded-full font-mono font-bold border ${
                            darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-[#6096BA]' : 'bg-[#EBF3FA] border-[#BACDDF] text-[#0265A6]'
                          }`}>
                            {getFilteredCareers().length} Matching
                          </span>
                        </div>

                        <button
                          onClick={handleResetFilters}
                          className="text-xs font-semibold text-[#0265A6] hover:underline cursor-pointer"
                        >
                          Clear Filters
                        </button>
                      </div>

                      {/* Filtered Careers Grid or No Results */}
                      {getFilteredCareers().length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                          {getFilteredCareers().map((career, idx) => (
                            <CareerCard
                              key={career.name || idx}
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
                      ) : (
                        /* Useful No Results State */
                        <div className={`p-10 rounded-3xl border text-center my-8 animate-fade-in ${
                          darkMode ? 'bg-[#0A1E3F] border-[#003B73]' : 'bg-white border-[#BACDDF] shadow-sm'
                        }`}>
                          <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-3xl mb-4 border ${
                            darkMode ? 'bg-[#071326] border-[#003B73]' : 'bg-[#EBF3FA] border-[#BACDDF]'
                          }`}>
                            🔍
                          </div>
                          <h3 className={`text-xl font-black mb-2 ${darkMode ? 'text-white' : 'text-[#051C3E]'}`}>
                            No Careers Found Matching "{searchQuery}"
                          </h3>
                          <p className={`text-sm mb-6 max-w-md mx-auto ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
                            We couldn't find any direct matches in the selected filter. Try searching for broader terms or explore trending fields below.
                          </p>

                          {/* Quick Keyword Suggestions */}
                          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                            <span className={`text-xs font-semibold ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Try searching:</span>
                            {['Software Engineer', 'MBBS Doctor', 'Data Scientist', 'Investment Banker', 'Product Designer', 'Lawyer'].map((sug) => (
                              <button
                                key={sug}
                                onClick={() => {
                                  setSearchQuery(sug);
                                  setActiveDomainFilter('all');
                                }}
                                className={`text-xs px-3 py-1 rounded-xl border font-bold transition-all hover:scale-105 cursor-pointer ${
                                  darkMode 
                                    ? 'bg-[#071326] border-[#003B73] text-[#6096BA] hover:text-white hover:border-[#0265A6]' 
                                    : 'bg-[#EBF3FA] border-[#BACDDF] text-[#0265A6] hover:bg-[#0265A6] hover:text-white'
                                }`}
                              >
                                {sug}
                              </button>
                            ))}
                          </div>

                          <button
                            onClick={handleResetFilters}
                            className="px-6 py-3 rounded-2xl font-bold text-sm btn-interactive cursor-pointer bg-gradient-to-r from-[#003B73] via-[#0265A6] to-[#003B73] text-white hover:brightness-110 shadow-md"
                          >
                            Reset All Filters & View 150+ Careers
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Default Domain Browser Cards with High-Res Covers */
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {Object.entries(CAREER_DATABASE).map(([key, domain]) => {
                        const domainCovers = {
                          science: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80',
                          engineering: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80',
                          commerce: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
                          arts: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80',
                          law: 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?auto=format&fit=crop&w=600&q=80',
                          government: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80',
                          education: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80',
                          sports: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=80'
                        };
                        const bgImg = domainCovers[key] || domainCovers.engineering;

                        return (
                          <button
                            key={key}
                            onClick={() => setSelectedDomain(key)}
                            className={`group relative rounded-3xl border text-left overflow-hidden hover-lift btn-interactive cursor-pointer h-72 flex flex-col justify-end ${
                              darkMode
                                ? 'bg-[#0A1E3F] border-[#003B73] hover:border-[#0265A6] shadow-xl'
                                : 'bg-white border-[#BACDDF] hover:border-[#0265A6] shadow-md'
                            }`}
                          >
                            {/* Background Cover Image with Gradient Overlay */}
                            <img
                              src={bgImg}
                              alt={domain.name}
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-30 group-hover:opacity-40"
                            />
                            <div className={`absolute inset-0 bg-gradient-to-t ${
                              darkMode
                                ? 'from-[#071326] via-[#0A1E3F]/90 to-transparent'
                                : 'from-white via-white/90 to-transparent'
                            }`} />

                            <div className="relative z-10 p-7">
                              <div className={`mb-4 inline-flex items-center justify-center w-14 h-14 rounded-2xl border shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ${
                                darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-white' : 'bg-white border-[#BACDDF] text-[#051C3E]'
                              }`}>
                                <span className="text-3xl">{domain.icon}</span>
                              </div>

                              <h3 className={`text-2xl font-black mb-1.5 transition-colors ${
                                darkMode ? 'text-white group-hover:text-[#6096BA]' : 'text-[#051C3E] group-hover:text-[#0265A6]'
                              }`}>
                                {domain.name}
                              </h3>

                              <p className={`text-xs font-semibold mb-4 ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
                                {domain.subFields.length} specialized fields • 25+ career tracks
                              </p>

                              <div className="flex items-center gap-1.5 font-bold text-xs text-[#0265A6] group-hover:gap-2.5 transition-all">
                                <span>Explore Specializations</span>
                                <ChevronRight className="w-4 h-4" />
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ) : !selectedSubField ? (
              // SubField Selection
              <div>
                <div className="mb-6">
                  <button
                    onClick={() => setSelectedDomain(null)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border btn-interactive cursor-pointer ${
                      darkMode ? 'bg-zinc-900 border-zinc-700 text-white hover:bg-zinc-800' : 'bg-zinc-100 border-zinc-300 text-black hover:bg-zinc-200'
                    }`}
                  >
                    ← Back to All Domains
                  </button>
                </div>

                <div className="text-center mb-10">
                  <h2 className={`text-3xl sm:text-4xl font-black ${darkMode ? 'text-white' : 'text-[#051C3E]'} mb-3`}>
                    {CAREER_DATABASE[selectedDomain]?.name || 'Domain Details'}
                  </h2>
                  <p className={`text-base sm:text-lg ${darkMode ? 'text-zinc-400' : 'text-zinc-600'} mb-6`}>
                    Select a specialization field or launch domain-specific tools below:
                  </p>

                  {/* Domain Tools Action Bar */}
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={() => setShowSalaryCalculator(true)}
                      className="px-4 py-2.5 rounded-xl font-bold text-xs btn-interactive flex items-center gap-2 cursor-pointer bg-gradient-to-r from-[#003B73] to-[#0265A6] text-white shadow-md hover:brightness-110"
                    >
                      <span>📊 Salary Calculator</span>
                    </button>

                    <button
                      onClick={() => setShowExamTracker(true)}
                      className={`px-4 py-2.5 rounded-xl font-bold text-xs btn-interactive flex items-center gap-2 cursor-pointer border ${
                        darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-[#6096BA] hover:text-white' : 'bg-white border-[#BACDDF] text-[#0265A6] hover:bg-[#0265A6] hover:text-white'
                      }`}
                    >
                      <span>⏳ Entrance Exams & Dates</span>
                    </button>

                    <button
                      onClick={() => setShowRoadmapBuilder(true)}
                      className={`px-4 py-2.5 rounded-xl font-bold text-xs btn-interactive flex items-center gap-2 cursor-pointer border ${
                        darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-[#6096BA] hover:text-white' : 'bg-white border-[#BACDDF] text-[#0265A6] hover:bg-[#0265A6] hover:text-white'
                      }`}
                    >
                      <span>🗺️ Skill Roadmaps</span>
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {CAREER_DATABASE[selectedDomain]?.subFields?.map((subField) => (
                    <button
                      key={subField.id}
                      onClick={() => setSelectedSubField(subField)}
                      className={`group rounded-3xl p-8 border transition-all duration-300 text-left hover-lift btn-interactive cursor-pointer ${
                        darkMode
                          ? 'bg-[#121215] border-zinc-800 hover:border-zinc-600 shadow-xl'
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
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border btn-interactive cursor-pointer ${
                      darkMode ? 'bg-zinc-900 border-zinc-700 text-white hover:bg-zinc-800' : 'bg-zinc-100 border-zinc-300 text-black hover:bg-zinc-200'
                    }`}
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {selectedSubField.careers.map((career, idx) => (
                    <CareerCard
                      key={career.name || idx}
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
              onSelectCareer={(c) => {
                setSelectedCareer(c);
                trackCareerExplored();
              }}
              savedCareers={savedCareers}
              setSavedCareers={(careers) => {
                const isAdding = careers.length > savedCareers.length;
                if (isAdding) trackCareerSaved();
                setSavedCareers(careers);
              }}
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
          onComplete={() => {
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

      {/* Alumni Connect Modal */}
      {showAlumniConnect && (
        <AlumniConnectModal
          onClose={() => setShowAlumniConnect(false)}
          darkMode={darkMode}
        />
      )}

      {/* Scholarship Finder Modal */}
      {showScholarshipFinder && (
        <ScholarshipFinderModal
          onClose={() => setShowScholarshipFinder(false)}
          darkMode={darkMode}
        />
      )}

      {/* AI Mock Interview Modal */}
      {showMockInterview && (
        <AIMockInterviewModal
          onClose={() => setShowMockInterview(false)}
          darkMode={darkMode}
        />
      )}

      {/* Cloud Sync Modal */}
      {showCloudSync && (
        <CloudSyncModal
          onClose={() => setShowCloudSync(false)}
          darkMode={darkMode}
        />
      )}

      {/* Floating Quick Action Speed Dial Dock */}
      <FloatingQuickDock
        onOpenQuiz={() => setShowQuiz(true)}
        onOpenSkills={() => setShowSkillsAnalyzer(true)}
        onOpenRoadmap={() => setShowRoadmapBuilder(true)}
        onOpenCollegeFinder={() => setShowCollegeFinder(true)}
        onOpenAIAdvisor={() => setShowAdvancedChatbot(true)}
        onOpenSalary={() => setShowSalaryCalculator(true)}
        onOpenExams={() => setShowExamTracker(true)}
        onOpenMentors={() => setShowAlumniConnect(true)}
        onOpenScholarships={() => setShowScholarshipFinder(true)}
        onOpenMockInterview={() => setShowMockInterview(true)}
        onOpenCloudSync={() => setShowCloudSync(true)}
      />
    </div>
  );
}

export default App;