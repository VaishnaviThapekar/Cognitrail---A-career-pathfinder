import React, { useState } from 'react';
import {
  Search, Moon, Sun, User, Scale, School, LogIn, Menu, X,
  Compass, HelpCircle, Map, Sparkles, Newspaper, Bot, Target, Globe, Cloud
} from 'lucide-react';
import { useGamification } from '../contexts/GamificationContext';
import { useAuth } from '../contexts/AuthContext';
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
  lang,
  toggleLanguage,
  onOpenCloudSync
}) => {
  const { level, points } = useGamification();
  const { user, isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header className={`sticky top-0 z-40 transition-colors duration-200 border-b backdrop-blur-md ${darkMode ? 'bg-[#071326]/90 border-[#003B73] text-white' : 'bg-white/95 border-zinc-200 text-black'
        } shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
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
                  COGNITRAIL
                </h1>
                <p className={`text-[10px] font-bold uppercase tracking-wider ${darkMode ? 'text-[#6096BA]' : 'text-[#0265A6]'}`}>
                  Career Pathfinder
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1.5">
              <button
                onClick={() => {
                  if (onHomeClick) onHomeClick();
                  const el = document.getElementById('domains');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${darkMode ? 'text-zinc-300 hover:text-[#6096BA] hover:bg-gradient-to-r hover:from-[#0A1E3F] hover:to-[#003B73]/60' : 'text-zinc-800 hover:text-[#0265A6] hover:bg-gradient-to-r hover:from-[#EBF3FA] hover:to-[#BACDDF]/40'}`}
              >
                Careers
              </button>

              <button
                onClick={() => onOpenQuiz && onOpenQuiz()}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${darkMode ? 'text-[#6096BA] hover:text-white hover:bg-gradient-to-r hover:from-[#0A1E3F] hover:to-[#003B73]/60' : 'text-[#0265A6] hover:bg-gradient-to-r hover:from-[#EBF3FA] hover:to-[#BACDDF]/40'}`}
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#0265A6]" />
                AI Quiz
              </button>

              {setShowCollegeFinder && (
                <button
                  onClick={() => setShowCollegeFinder(true)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${darkMode ? 'text-zinc-300 hover:text-[#6096BA] hover:bg-gradient-to-r hover:from-[#0A1E3F] hover:to-[#003B73]/60' : 'text-zinc-800 hover:text-[#0265A6] hover:bg-gradient-to-r hover:from-[#EBF3FA] hover:to-[#BACDDF]/40'}`}
                >
                  Colleges
                </button>
              )}

              {setShowComparison && (
                <button
                  onClick={() => setShowComparison(true)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${darkMode ? 'text-zinc-300 hover:text-[#6096BA] hover:bg-gradient-to-r hover:from-[#0A1E3F] hover:to-[#003B73]/60' : 'text-zinc-800 hover:text-[#0265A6] hover:bg-gradient-to-r hover:from-[#EBF3FA] hover:to-[#BACDDF]/40'}`}
                >
                  Compare
                </button>
              )}

              <button
                onClick={() => onOpenSkills && onOpenSkills()}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${darkMode ? 'text-zinc-300 hover:text-[#6096BA] hover:bg-gradient-to-r hover:from-[#0A1E3F] hover:to-[#003B73]/60' : 'text-zinc-800 hover:text-[#0265A6] hover:bg-gradient-to-r hover:from-[#EBF3FA] hover:to-[#BACDDF]/40'}`}
              >
                Skill Gap
              </button>

              <button
                onClick={() => onOpenAdvisor && onOpenAdvisor()}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${darkMode ? 'text-zinc-300 hover:text-[#6096BA] hover:bg-gradient-to-r hover:from-[#0A1E3F] hover:to-[#003B73]/60' : 'text-zinc-800 hover:text-[#0265A6] hover:bg-gradient-to-r hover:from-[#EBF3FA] hover:to-[#BACDDF]/40'}`}
              >
                <Bot className="w-3.5 h-3.5 text-[#0265A6]" />
                Advisor Pro
              </button>
            </nav>

            {/* Search Bar - Desktop */}
            <div className="flex-1 max-w-xs lg:max-w-sm hidden md:block">
              <div className="relative">
                <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-[#6096BA]' : 'text-[#0265A6]'}`} />
                <input
                  type="text"
                  placeholder="Search 150+ careers, skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs transition-all border focus:outline-none ${darkMode
                    ? 'bg-[#0A1E3F] border-[#003B73] text-white placeholder-zinc-400 focus:border-[#0265A6] focus:ring-2 focus:ring-[#0265A6]/30'
                    : 'bg-[#EBF3FA] border-[#BACDDF] text-black placeholder-zinc-500 focus:border-[#0265A6] focus:bg-white focus:ring-2 focus:ring-[#0265A6]/20'
                    }`}
                />
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Language Switcher Toggle */}
              {toggleLanguage && (
                <button
                  onClick={toggleLanguage}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-black btn-interactive hover-lift flex items-center gap-1 cursor-pointer ${
                    darkMode
                      ? 'bg-[#0A1E3F] border-[#003B73] text-[#6096BA] hover:text-white'
                      : 'bg-[#EBF3FA] border-[#BACDDF] text-[#0265A6] hover:bg-[#0265A6] hover:text-white'
                  }`}
                  title="Switch Language (English / Hindi)"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{lang === 'hi' ? 'हिन्दी' : 'EN'}</span>
                </button>
              )}

              {/* Cloud Sync Button */}
              {onOpenCloudSync && (
                <button
                  onClick={onOpenCloudSync}
                  className={`p-2.5 rounded-xl border btn-interactive hover-lift ${darkMode
                    ? 'bg-[#0A1E3F] border-[#003B73] text-[#6096BA] hover:bg-[#0A1E3F]/80 shadow-sm'
                    : 'bg-[#EBF3FA] border-[#BACDDF] text-[#0265A6] hover:bg-[#EBF3FA]/80 shadow-sm'
                    }`}
                  title="Cloud Sync & Data Backup"
                >
                  <Cloud className="w-4 h-4 text-[#0265A6]" />
                </button>
              )}

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2.5 rounded-xl border btn-interactive hover-lift ${darkMode
                  ? 'bg-[#0A1E3F] border-[#003B73] text-[#6096BA] hover:bg-[#0A1E3F]/80 shadow-sm'
                  : 'bg-[#EBF3FA] border-[#BACDDF] text-[#0265A6] hover:bg-[#EBF3FA]/80 shadow-sm'
                  }`}
                aria-label="Toggle dark mode"
                title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <Sun className="w-4 h-4 text-[#6096BA] transition-transform duration-300 hover:rotate-90" /> : <Moon className="w-4 h-4 text-[#0265A6] transition-transform duration-300 hover:-rotate-45" />}
              </button>

              {/* Gamification Progress */}
              {isAuthenticated && (
                <button
                  onClick={() => setShowGamification && setShowGamification(true)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border btn-interactive hover-lift ${darkMode
                    ? 'bg-[#0A1E3F] border-[#003B73] hover:border-[#0265A6]'
                    : 'bg-[#EBF3FA] border-[#BACDDF] hover:border-[#0265A6]'
                    }`}
                  title="Your points & level"
                >
                  <div className="w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center transition-transform hover:scale-110 bg-gradient-to-tr from-[#003B73] to-[#0265A6] text-white shadow-sm">
                    {level}
                  </div>
                  <span className={`text-xs font-bold hidden sm:inline ${darkMode ? 'text-[#6096BA]' : 'text-[#0265A6]'}`}>
                    {points} pts
                  </span>
                </button>
              )}

              {/* Profile / Auth Button */}
              {isAuthenticated ? (
                <button
                  onClick={() => setShowProfile(true)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl font-bold text-xs shadow-md btn-interactive hover-lift bg-gradient-to-r from-[#003B73] via-[#0265A6] to-[#003B73] text-white hover:brightness-110"
                >
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <User className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="hidden sm:inline">{user?.name?.split(' ')[0] || 'Profile'}</span>
                </button>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs shadow-lg btn-interactive hover-lift bg-gradient-to-r from-[#003B73] via-[#0265A6] to-[#003B73] text-white hover:brightness-110 shadow-[#0265A6]/25"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
              )}

              {/* Mobile Hamburger Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`xl:hidden p-2.5 rounded-xl border btn-interactive ${darkMode
                  ? 'bg-[#0A1E3F] border-[#003B73] text-white'
                  : 'bg-zinc-100 border-zinc-200 text-zinc-800'
                  }`}
                aria-label="Open navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 transition-transform duration-200 rotate-90" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer / Menu */}
        {mobileMenuOpen && (
          <div className={`xl:hidden border-t px-4 py-4 space-y-3 animate-slide-down ${darkMode ? 'bg-[#071326] border-[#003B73]' : 'bg-[#EBF3FA] border-[#BACDDF] shadow-xl'
            }`}>
            {/* Search Input on Mobile */}
            <div className="relative mb-3">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-[#6096BA]' : 'text-[#0265A6]'}`} />
              <input
                type="text"
                placeholder="Search careers, skills, fields..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-9 pr-4 py-2.5 rounded-xl text-xs border focus:outline-none ${darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-white placeholder-zinc-400 focus:border-[#0265A6]' : 'bg-white border-[#BACDDF] text-black focus:border-[#0265A6]'}`}
              />
            </div>

            {/* Mobile Navigation Links */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  if (onHomeClick) onHomeClick();
                  const el = document.getElementById('domains');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  closeMobileMenu();
                }}
                className={`flex items-center gap-2 p-3 rounded-xl text-xs font-bold text-left border transition-colors ${darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-[#EBF3FA] hover:border-[#0265A6]' : 'bg-white border-[#BACDDF] text-[#051C3E] hover:border-[#0265A6]'}`}
              >
                <Compass className="w-4 h-4 text-[#0265A6]" />
                <span>Explore Careers</span>
              </button>

              <button
                onClick={() => {
                  if (onOpenQuiz) onOpenQuiz();
                  closeMobileMenu();
                }}
                className={`flex items-center gap-2 p-3 rounded-xl text-xs font-bold text-left border transition-colors ${darkMode ? 'bg-gradient-to-r from-[#003B73] to-[#0265A6] border-[#0265A6] text-white' : 'bg-gradient-to-r from-[#003B73] to-[#0265A6] text-white'}`}
              >
                <HelpCircle className="w-4 h-4 text-[#6096BA]" />
                <span>AI Career Quiz</span>
              </button>

              {setShowCollegeFinder && (
                <button
                  onClick={() => {
                    setShowCollegeFinder(true);
                    closeMobileMenu();
                  }}
                  className={`flex items-center gap-2 p-3 rounded-xl text-xs font-bold text-left border transition-colors ${darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-[#EBF3FA] hover:border-[#0265A6]' : 'bg-white border-[#BACDDF] text-[#051C3E] hover:border-[#0265A6]'}`}
                >
                  <School className="w-4 h-4 text-[#0265A6]" />
                  <span>College Finder</span>
                </button>
              )}

              {setShowComparison && (
                <button
                  onClick={() => {
                    setShowComparison(true);
                    closeMobileMenu();
                  }}
                  className={`flex items-center gap-2 p-3 rounded-xl text-xs font-bold text-left border transition-colors ${darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-[#EBF3FA] hover:border-[#0265A6]' : 'bg-white border-[#BACDDF] text-[#051C3E] hover:border-[#0265A6]'}`}
                >
                  <Scale className="w-4 h-4 text-[#0265A6]" />
                  <span>Compare Careers</span>
                </button>
              )}

              <button
                onClick={() => {
                  if (onOpenSkills) onOpenSkills();
                  closeMobileMenu();
                }}
                className={`flex items-center gap-2 p-3 rounded-xl text-xs font-bold text-left border transition-colors ${darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-[#EBF3FA] hover:border-[#0265A6]' : 'bg-white border-[#BACDDF] text-[#051C3E] hover:border-[#0265A6]'}`}
              >
                <Target className="w-4 h-4 text-[#0265A6]" />
                <span>Skills Gap</span>
              </button>

              <button
                onClick={() => {
                  if (onOpenRoadmap) onOpenRoadmap();
                  closeMobileMenu();
                }}
                className={`flex items-center gap-2 p-3 rounded-xl text-xs font-bold text-left border transition-colors ${darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-[#EBF3FA] hover:border-[#0265A6]' : 'bg-white border-[#BACDDF] text-[#051C3E] hover:border-[#0265A6]'}`}
              >
                <Map className="w-4 h-4 text-[#0265A6]" />
                <span>Roadmaps</span>
              </button>

              <button
                onClick={() => {
                  if (onOpenNews) onOpenNews();
                  closeMobileMenu();
                }}
                className={`flex items-center gap-2 p-3 rounded-xl text-xs font-bold text-left border transition-colors ${darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-[#EBF3FA] hover:border-[#0265A6]' : 'bg-white border-[#BACDDF] text-[#051C3E] hover:border-[#0265A6]'}`}
              >
                <Newspaper className="w-4 h-4 text-[#0265A6]" />
                <span>Career News</span>
              </button>

              <button
                onClick={() => {
                  if (onOpenAdvisor) onOpenAdvisor();
                  closeMobileMenu();
                }}
                className={`flex items-center gap-2 p-3 rounded-xl text-xs font-bold text-left border transition-colors ${darkMode ? 'bg-gradient-to-r from-[#003B73] to-[#0265A6] border-[#0265A6] text-white' : 'bg-gradient-to-r from-[#003B73] to-[#0265A6] text-white'}`}
              >
                <Bot className="w-4 h-4 text-[#6096BA]" />
                <span>AI Advisor Pro</span>
              </button>
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