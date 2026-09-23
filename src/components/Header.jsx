import React, { useState, useRef, useEffect } from 'react';
import {
  Search, Moon, Sun, User, Scale, School, LogIn, Menu, X,
  Compass, HelpCircle, Map, Newspaper, Bot, Target, Globe, Cloud,
  Calculator, GitCompare, BookOpen, ChevronDown
} from 'lucide-react';
import { useGamification } from '../contexts/GamificationContext';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import AuthModal from './AuthModal';

const Header = ({
  darkMode,
  toggleDarkMode,
  searchQuery,
  setSearchQuery,
  onHomeClick,
  onOpenQuiz,
  onOpenRoadmap,
  onOpenSkills,
  onOpenNews,
  onOpenAdvisor,
  setShowProfile,
  setShowGamification,
  setShowComparison,
  setShowCollegeFinder,
  onOpenCloudSync,
  onOpenPredictor,
  onOpenDecisionMatrix,
  onOpenFreeCourses
}) => {
  const { level, points } = useGamification();
  const { user, isAuthenticated } = useAuth();
  const { lang, toggleLanguage, t } = useLanguage();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setToolsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header className={`sticky top-0 z-40 transition-colors duration-200 border-b backdrop-blur-md ${
        darkMode ? 'bg-[#071326]/95 border-[#003B73] text-white' : 'bg-white/95 border-zinc-200 text-black'
      } shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            
            {/* Logo */}
            <div
              onClick={() => {
                if (onHomeClick) onHomeClick();
                closeMobileMenu();
              }}
              className="flex items-center gap-2.5 cursor-pointer select-none group flex-shrink-0"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xl shadow-md transition-all duration-300 group-hover:scale-110 bg-gradient-to-tr from-[#003B73] via-[#0265A6] to-[#6096BA] text-white shadow-[#0265A6]/30">
                💡
              </div>
              <div>
                <h1 className={`text-xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-[#051C3E]'}`}>
                  {t('brandName', 'COGNITRAIL')}
                </h1>
                <p className={`text-[10px] font-bold uppercase tracking-wider ${darkMode ? 'text-[#6096BA]' : 'text-[#0265A6]'}`}>
                  {t('brandTagline', 'Career Pathfinder')}
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links - Clean & Evenly Distributed (5 Core Items) */}
            <nav className="hidden xl:flex items-center gap-2.5">
              <button
                onClick={() => {
                  if (onHomeClick) onHomeClick();
                  const el = document.getElementById('domains');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  darkMode ? 'text-zinc-200 hover:text-[#6096BA] hover:bg-[#0A1E3F]' : 'text-zinc-800 hover:text-[#0265A6] hover:bg-[#EBF3FA]'
                }`}
              >
                {t('navCareers', 'Careers')}
              </button>

              <button
                onClick={() => onOpenQuiz && onOpenQuiz()}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  darkMode ? 'text-[#6096BA] hover:text-white hover:bg-[#0A1E3F]' : 'text-[#0265A6] hover:bg-[#EBF3FA]'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#0265A6]" />
                {t('navQuiz', 'AI Quiz')}
              </button>

              {setShowCollegeFinder && (
                <button
                  onClick={() => setShowCollegeFinder(true)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    darkMode ? 'text-zinc-200 hover:text-[#6096BA] hover:bg-[#0A1E3F]' : 'text-zinc-800 hover:text-[#0265A6] hover:bg-[#EBF3FA]'
                  }`}
                >
                  {t('navColleges', 'Colleges')}
                </button>
              )}

              <button
                onClick={() => onOpenSkills && onOpenSkills()}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  darkMode ? 'text-zinc-200 hover:text-[#6096BA] hover:bg-[#0A1E3F]' : 'text-zinc-800 hover:text-[#0265A6] hover:bg-[#EBF3FA]'
                }`}
              >
                {t('navSkills', 'Skill Gap')}
              </button>

              {/* More Tools Dropdown Menu */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all border ${
                    toolsDropdownOpen
                      ? darkMode ? 'bg-[#0A1E3F] border-[#0265A6] text-white' : 'bg-[#EBF3FA] border-[#0265A6] text-[#0265A6]'
                      : darkMode ? 'bg-transparent border-transparent text-zinc-200 hover:text-[#6096BA] hover:bg-[#0A1E3F]' : 'bg-transparent border-transparent text-zinc-800 hover:text-[#0265A6] hover:bg-[#EBF3FA]'
                  }`}
                >
                  <span>{t('moreTools', 'More Tools')}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${toolsDropdownOpen ? 'rotate-180 text-[#0265A6]' : ''}`} />
                </button>

                {/* Dropdown Card */}
                {toolsDropdownOpen && (
                  <div className={`absolute left-0 mt-2 w-64 rounded-2xl border p-2 shadow-2xl z-50 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 ${
                    darkMode ? 'bg-[#071326]/95 border-[#003B73] text-white shadow-black/60' : 'bg-white/95 border-[#BACDDF] text-black shadow-zinc-300'
                  }`}>
                    {onOpenPredictor && (
                      <button
                        onClick={() => {
                          onOpenPredictor();
                          setToolsDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-bold text-left transition-colors ${
                          darkMode ? 'hover:bg-[#0A1E3F] text-zinc-200 hover:text-white' : 'hover:bg-[#EBF3FA] text-zinc-800 hover:text-[#0265A6]'
                        }`}
                      >
                        <div className="p-1.5 rounded-lg bg-[#003B73]/30 text-[#0265A6]">
                          <Calculator className="w-4 h-4" />
                        </div>
                        <div>
                          <div>{t('navCutoff', 'Entrance Cutoff Predictor')}</div>
                          <div className="text-[10px] font-normal opacity-70">Predict college chances by rank</div>
                        </div>
                      </button>
                    )}

                    {onOpenDecisionMatrix && (
                      <button
                        onClick={() => {
                          onOpenDecisionMatrix();
                          setToolsDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-bold text-left transition-colors ${
                          darkMode ? 'hover:bg-[#0A1E3F] text-zinc-200 hover:text-white' : 'hover:bg-[#EBF3FA] text-zinc-800 hover:text-[#0265A6]'
                        }`}
                      >
                        <div className="p-1.5 rounded-lg bg-[#003B73]/30 text-[#0265A6]">
                          <GitCompare className="w-4 h-4" />
                        </div>
                        <div>
                          <div>{t('navDecisionMatrix', 'AI Decision Matrix')}</div>
                          <div className="text-[10px] font-normal opacity-70">Degree ROI & 5-Yr salary comparison</div>
                        </div>
                      </button>
                    )}

                    {onOpenFreeCourses && (
                      <button
                        onClick={() => {
                          onOpenFreeCourses();
                          setToolsDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-bold text-left transition-colors ${
                          darkMode ? 'hover:bg-[#0A1E3F] text-zinc-200 hover:text-white' : 'hover:bg-[#EBF3FA] text-zinc-800 hover:text-[#0265A6]'
                        }`}
                      >
                        <div className="p-1.5 rounded-lg bg-[#003B73]/30 text-[#0265A6]">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div>
                          <div>{t('navFreeCourses', 'Free Certified Courses')}</div>
                          <div className="text-[10px] font-normal opacity-70">Harvard, Google & IIT NPTEL links</div>
                        </div>
                      </button>
                    )}

                    {setShowComparison && (
                      <button
                        onClick={() => {
                          setShowComparison(true);
                          setToolsDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-bold text-left transition-colors ${
                          darkMode ? 'hover:bg-[#0A1E3F] text-zinc-200 hover:text-white' : 'hover:bg-[#EBF3FA] text-zinc-800 hover:text-[#0265A6]'
                        }`}
                      >
                        <div className="p-1.5 rounded-lg bg-[#003B73]/30 text-[#0265A6]">
                          <Scale className="w-4 h-4" />
                        </div>
                        <div>
                          <div>{t('navCompare', 'Compare Careers')}</div>
                          <div className="text-[10px] font-normal opacity-70">Side-by-side job role analysis</div>
                        </div>
                      </button>
                    )}

                    {onOpenNews && (
                      <button
                        onClick={() => {
                          onOpenNews();
                          setToolsDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-bold text-left transition-colors ${
                          darkMode ? 'hover:bg-[#0A1E3F] text-zinc-200 hover:text-white' : 'hover:bg-[#EBF3FA] text-zinc-800 hover:text-[#0265A6]'
                        }`}
                      >
                        <div className="p-1.5 rounded-lg bg-[#003B73]/30 text-[#0265A6]">
                          <Newspaper className="w-4 h-4" />
                        </div>
                        <div>
                          <div>{t('navNews', 'Career News')}</div>
                          <div className="text-[10px] font-normal opacity-70">Exam dates & industry updates</div>
                        </div>
                      </button>
                    )}

                    {onOpenCloudSync && (
                      <button
                        onClick={() => {
                          onOpenCloudSync();
                          setToolsDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-bold text-left transition-colors ${
                          darkMode ? 'hover:bg-[#0A1E3F] text-zinc-200 hover:text-white' : 'hover:bg-[#EBF3FA] text-zinc-800 hover:text-[#0265A6]'
                        }`}
                      >
                        <div className="p-1.5 rounded-lg bg-[#003B73]/30 text-[#0265A6]">
                          <Cloud className="w-4 h-4" />
                        </div>
                        <div>
                          <div>{t('cloudSyncTitle', 'Cloud Backup & Sync')}</div>
                          <div className="text-[10px] font-normal opacity-70">Sync profile & saved careers</div>
                        </div>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* AI Advisor Pro Highlighted CTA Button */}
              <button
                onClick={() => onOpenAdvisor && onOpenAdvisor()}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all bg-gradient-to-r from-[#003B73] via-[#0265A6] to-[#003B73] text-white hover:brightness-110 shadow-sm"
              >
                <Bot className="w-3.5 h-3.5 text-[#6096BA]" />
                {t('navAdvisor', 'Advisor Pro')}
              </button>
            </nav>

            {/* Search Bar - Desktop */}
            <div className="flex-1 max-w-xs hidden md:block">
              <div className="relative">
                <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 ${darkMode ? 'text-[#6096BA]' : 'text-[#0265A6]'}`} />
                <input
                  type="text"
                  placeholder={t('searchPlaceholder', 'Search 150+ careers, skills...')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-9 pr-3.5 py-1.5 rounded-xl text-xs transition-all border focus:outline-none ${
                    darkMode
                      ? 'bg-[#0A1E3F] border-[#003B73] text-white placeholder-zinc-400 focus:border-[#0265A6] focus:ring-1 focus:ring-[#0265A6]'
                      : 'bg-[#EBF3FA] border-[#BACDDF] text-black placeholder-zinc-500 focus:border-[#0265A6] focus:bg-white focus:ring-1 focus:ring-[#0265A6]'
                  }`}
                />
              </div>
            </div>

            {/* Right Utility Controls */}
            <div className="flex items-center gap-2">
              {/* Language Switcher Toggle */}
              <button
                onClick={toggleLanguage}
                className={`px-2.5 py-1.5 rounded-xl border text-xs font-bold btn-interactive flex items-center gap-1 cursor-pointer ${
                  darkMode
                    ? 'bg-[#0A1E3F] border-[#003B73] text-[#6096BA] hover:text-white'
                    : 'bg-[#EBF3FA] border-[#BACDDF] text-[#0265A6] hover:bg-[#0265A6] hover:text-white'
                }`}
                title="Switch Language (English / Hindi)"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? 'हिन्दी' : 'EN'}</span>
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-xl border btn-interactive ${
                  darkMode
                    ? 'bg-[#0A1E3F] border-[#003B73] text-[#6096BA] hover:bg-[#0A1E3F]/80 shadow-sm'
                    : 'bg-[#EBF3FA] border-[#BACDDF] text-[#0265A6] hover:bg-[#EBF3FA]/80 shadow-sm'
                }`}
                aria-label="Toggle dark mode"
                title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <Sun className="w-3.5 h-3.5 text-[#6096BA] transition-transform hover:rotate-90" /> : <Moon className="w-3.5 h-3.5 text-[#0265A6] transition-transform hover:-rotate-45" />}
              </button>

              {/* Gamification Progress */}
              {isAuthenticated && (
                <button
                  onClick={() => setShowGamification && setShowGamification(true)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border btn-interactive ${
                    darkMode ? 'bg-[#0A1E3F] border-[#003B73] hover:border-[#0265A6]' : 'bg-[#EBF3FA] border-[#BACDDF] hover:border-[#0265A6]'
                  }`}
                  title="Your points & level"
                >
                  <div className="w-5 h-5 rounded-md font-bold text-[10px] flex items-center justify-center bg-gradient-to-tr from-[#003B73] to-[#0265A6] text-white">
                    {level}
                  </div>
                  <span className={`text-xs font-bold hidden sm:inline ${darkMode ? 'text-[#6096BA]' : 'text-[#0265A6]'}`}>
                    {points} {t('pts', 'pts')}
                  </span>
                </button>
              )}

              {/* Profile / Auth Button */}
              {isAuthenticated ? (
                <button
                  onClick={() => setShowProfile(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs shadow-md btn-interactive bg-gradient-to-r from-[#003B73] via-[#0265A6] to-[#003B73] text-white hover:brightness-110"
                >
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <User className="w-3 h-3 text-white" />
                  </div>
                  <span className="hidden sm:inline">{user?.name?.split(' ')[0] || t('profile', 'Profile')}</span>
                </button>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold text-xs shadow-md btn-interactive bg-gradient-to-r from-[#003B73] via-[#0265A6] to-[#003B73] text-white hover:brightness-110"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{t('signIn', 'Sign In')}</span>
                </button>
              )}

              {/* Mobile Hamburger Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`xl:hidden p-2 rounded-xl border btn-interactive ${
                  darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-white' : 'bg-zinc-100 border-zinc-200 text-zinc-800'
                }`}
                aria-label="Open navigation menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4 transition-transform rotate-90" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer / Menu - Grouped Cleanly */}
        {mobileMenuOpen && (
          <div className={`xl:hidden border-t px-4 py-4 space-y-4 animate-slide-down ${
            darkMode ? 'bg-[#071326] border-[#003B73]' : 'bg-[#EBF3FA] border-[#BACDDF] shadow-xl'
          }`}>
            {/* Search Input on Mobile */}
            <div className="relative mb-2">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-[#6096BA]' : 'text-[#0265A6]'}`} />
              <input
                type="text"
                placeholder={t('searchPlaceholder', 'Search careers, skills, fields...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs border focus:outline-none ${
                  darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-white placeholder-zinc-400' : 'bg-white border-[#BACDDF] text-black'
                }`}
              />
            </div>

            {/* Core Exploration Links */}
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider mb-2 opacity-60">Core Exploration</div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    if (onHomeClick) onHomeClick();
                    const el = document.getElementById('domains');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    closeMobileMenu();
                  }}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold text-left border transition-colors ${
                    darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-[#EBF3FA]' : 'bg-white border-[#BACDDF] text-[#051C3E]'
                  }`}
                >
                  <Compass className="w-4 h-4 text-[#0265A6]" />
                  <span>{t('navCareers', 'Explore Careers')}</span>
                </button>

                <button
                  onClick={() => {
                    if (onOpenQuiz) onOpenQuiz();
                    closeMobileMenu();
                  }}
                  className="flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold text-left border bg-gradient-to-r from-[#003B73] to-[#0265A6] border-[#0265A6] text-white"
                >
                  <HelpCircle className="w-4 h-4 text-[#6096BA]" />
                  <span>{t('navQuiz', 'AI Career Quiz')}</span>
                </button>

                {setShowCollegeFinder && (
                  <button
                    onClick={() => {
                      setShowCollegeFinder(true);
                      closeMobileMenu();
                    }}
                    className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold text-left border transition-colors ${
                      darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-[#EBF3FA]' : 'bg-white border-[#BACDDF] text-[#051C3E]'
                    }`}
                  >
                    <School className="w-4 h-4 text-[#0265A6]" />
                    <span>{t('navColleges', 'College Finder')}</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    if (onOpenSkills) onOpenSkills();
                    closeMobileMenu();
                  }}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold text-left border transition-colors ${
                    darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-[#EBF3FA]' : 'bg-white border-[#BACDDF] text-[#051C3E]'
                  }`}
                >
                  <Target className="w-4 h-4 text-[#0265A6]" />
                  <span>{t('navSkills', 'Skills Gap')}</span>
                </button>
              </div>
            </div>

            {/* Specialized Tools & AI */}
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider mb-2 opacity-60">Specialized Tools</div>
              <div className="grid grid-cols-2 gap-2">
                {onOpenPredictor && (
                  <button
                    onClick={() => {
                      onOpenPredictor();
                      closeMobileMenu();
                    }}
                    className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold text-left border transition-colors ${
                      darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-[#EBF3FA]' : 'bg-white border-[#BACDDF] text-[#051C3E]'
                    }`}
                  >
                    <Calculator className="w-4 h-4 text-[#0265A6]" />
                    <span>{t('navCutoff', 'Cutoffs')}</span>
                  </button>
                )}

                {onOpenDecisionMatrix && (
                  <button
                    onClick={() => {
                      onOpenDecisionMatrix();
                      closeMobileMenu();
                    }}
                    className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold text-left border transition-colors ${
                      darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-[#EBF3FA]' : 'bg-white border-[#BACDDF] text-[#051C3E]'
                    }`}
                  >
                    <GitCompare className="w-4 h-4 text-[#0265A6]" />
                    <span>{t('navDecisionMatrix', 'Matrix')}</span>
                  </button>
                )}

                {onOpenFreeCourses && (
                  <button
                    onClick={() => {
                      onOpenFreeCourses();
                      closeMobileMenu();
                    }}
                    className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold text-left border transition-colors ${
                      darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-[#EBF3FA]' : 'bg-white border-[#BACDDF] text-[#051C3E]'
                    }`}
                  >
                    <BookOpen className="w-4 h-4 text-[#0265A6]" />
                    <span>{t('navFreeCourses', 'Courses')}</span>
                  </button>
                )}

                {setShowComparison && (
                  <button
                    onClick={() => {
                      setShowComparison(true);
                      closeMobileMenu();
                    }}
                    className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold text-left border transition-colors ${
                      darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-[#EBF3FA]' : 'bg-white border-[#BACDDF] text-[#051C3E]'
                    }`}
                  >
                    <Scale className="w-4 h-4 text-[#0265A6]" />
                    <span>{t('navCompare', 'Compare')}</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    if (onOpenRoadmap) onOpenRoadmap();
                    closeMobileMenu();
                  }}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold text-left border transition-colors ${
                    darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-[#EBF3FA]' : 'bg-white border-[#BACDDF] text-[#051C3E]'
                  }`}
                >
                  <Map className="w-4 h-4 text-[#0265A6]" />
                  <span>{t('navRoadmap', 'Roadmaps')}</span>
                </button>

                <button
                  onClick={() => {
                    if (onOpenAdvisor) onOpenAdvisor();
                    closeMobileMenu();
                  }}
                  className="flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold text-left border bg-gradient-to-r from-[#003B73] to-[#0265A6] border-[#0265A6] text-white"
                >
                  <Bot className="w-4 h-4 text-[#6096BA]" />
                  <span>{t('navAdvisor', 'AI Advisor')}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          darkMode={darkMode}
          initialMode="signin"
        />
      )}
    </>
  );
};

export default Header;