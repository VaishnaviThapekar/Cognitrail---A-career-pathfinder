import React, { useState } from 'react';
import {
  Search, Moon, Sun, User, Scale, School, LogIn, Menu, X,
  Compass, HelpCircle, Map, Sparkles, Newspaper, Bot, Target
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
  setShowCollegeFinder
}) => {
  const { level, points } = useGamification();
  const { user, isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header className={`sticky top-0 z-40 transition-colors duration-200 border-b backdrop-blur-md ${darkMode ? 'bg-[#0e131d]/90 border-slate-800 text-white' : 'bg-white/95 border-slate-200 text-slate-900'
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
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <span className="text-xl">💡</span>
              </div>
              <div>
                <h1 className={`text-xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  COGNITRAIL
                </h1>
                <p className={`text-[10px] font-bold uppercase tracking-wider ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
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
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${darkMode ? 'text-slate-300 hover:text-white hover:bg-slate-800' : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-100'}`}
              >
                Careers
              </button>

              <button
                onClick={() => onOpenQuiz && onOpenQuiz()}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${darkMode ? 'text-indigo-300 hover:text-white hover:bg-indigo-950/60' : 'text-indigo-600 hover:bg-indigo-50'}`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                AI Quiz
              </button>

              {setShowCollegeFinder && (
                <button
                  onClick={() => setShowCollegeFinder(true)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${darkMode ? 'text-slate-300 hover:text-white hover:bg-slate-800' : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-100'}`}
                >
                  Colleges
                </button>
              )}

              {setShowComparison && (
                <button
                  onClick={() => setShowComparison(true)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${darkMode ? 'text-slate-300 hover:text-white hover:bg-slate-800' : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-100'}`}
                >
                  Compare
                </button>
              )}

              <button
                onClick={() => onOpenSkills && onOpenSkills()}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${darkMode ? 'text-slate-300 hover:text-white hover:bg-slate-800' : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-100'}`}
              >
                Skill Gap
              </button>

              <button
                onClick={() => onOpenRoadmap && onOpenRoadmap()}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${darkMode ? 'text-slate-300 hover:text-white hover:bg-slate-800' : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-100'}`}
              >
                Roadmaps
              </button>

              <button
                onClick={() => onOpenAdvisor && onOpenAdvisor()}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${darkMode ? 'text-pink-400 hover:bg-pink-950/40' : 'text-pink-600 hover:bg-pink-50'}`}
              >
                <Bot className="w-3.5 h-3.5" />
                Advisor Pro
              </button>
            </nav>

            {/* Search Bar - Desktop */}
            <div className="flex-1 max-w-xs lg:max-w-sm hidden md:block">
              <div className="relative">
                <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-slate-400' : 'text-slate-400'}`} />
                <input
                  type="text"
                  placeholder="Search 150+ careers, skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs transition-all border focus:outline-none ${darkMode
                    ? 'bg-[#161b26] border-slate-700 text-white placeholder-slate-400 focus:border-indigo-500'
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white'
                    }`}
                />
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2.5 rounded-xl transition-all border ${darkMode
                  ? 'bg-[#161b26] border-slate-700 text-amber-400 hover:bg-slate-800'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                  }`}
                aria-label="Toggle dark mode"
                title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Gamification Progress */}
              {isAuthenticated && (
                <button
                  onClick={() => setShowGamification && setShowGamification(true)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all border ${darkMode
                    ? 'bg-[#161b26] border-slate-700 hover:border-indigo-500'
                    : 'bg-slate-50 border-slate-200 hover:border-indigo-300'
                    }`}
                  title="Your points & level"
                >
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-bold text-xs flex items-center justify-center">
                    {level}
                  </div>
                  <span className={`text-xs font-bold hidden sm:inline ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                    {points} pts
                  </span>
                </button>
              )}

              {/* Profile / Auth Button */}
              {isAuthenticated ? (
                <button
                  onClick={() => setShowProfile(true)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs hover:opacity-90 shadow-sm transition-all"
                >
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <span className="hidden sm:inline">{user?.name?.split(' ')[0] || 'Profile'}</span>
                </button>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs shadow-md shadow-indigo-500/20 hover:scale-105 transition-all"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
              )}

              {/* Mobile Hamburger Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`xl:hidden p-2.5 rounded-xl transition-colors border ${darkMode
                  ? 'bg-[#161b26] border-slate-700 text-white'
                  : 'bg-slate-100 border-slate-200 text-slate-800'
                  }`}
                aria-label="Open navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer / Menu */}
        {mobileMenuOpen && (
          <div className={`xl:hidden border-t px-4 py-4 space-y-3 transition-all ${darkMode ? 'bg-[#0e131d] border-slate-800' : 'bg-white border-slate-200 shadow-xl'
            }`}>
            {/* Search Input on Mobile */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search careers, skills, fields..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-9 pr-4 py-2.5 rounded-xl text-xs border focus:outline-none ${darkMode ? 'bg-[#161b26] border-slate-700 text-white placeholder-slate-400' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
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
                className={`flex items-center gap-2 p-3 rounded-xl text-xs font-bold text-left border ${darkMode ? 'bg-[#161b26] border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'}`}
              >
                <Compass className="w-4 h-4 text-indigo-500" />
                <span>Explore Careers</span>
              </button>

              <button
                onClick={() => {
                  if (onOpenQuiz) onOpenQuiz();
                  closeMobileMenu();
                }}
                className={`flex items-center gap-2 p-3 rounded-xl text-xs font-bold text-left border ${darkMode ? 'bg-indigo-950/40 border-indigo-800/40 text-indigo-300' : 'bg-indigo-50 border-indigo-200 text-indigo-700'}`}
              >
                <HelpCircle className="w-4 h-4 text-indigo-500" />
                <span>AI Career Quiz</span>
              </button>

              {setShowCollegeFinder && (
                <button
                  onClick={() => {
                    setShowCollegeFinder(true);
                    closeMobileMenu();
                  }}
                  className={`flex items-center gap-2 p-3 rounded-xl text-xs font-bold text-left border ${darkMode ? 'bg-[#161b26] border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'}`}
                >
                  <School className="w-4 h-4 text-emerald-500" />
                  <span>College Finder</span>
                </button>
              )}

              {setShowComparison && (
                <button
                  onClick={() => {
                    setShowComparison(true);
                    closeMobileMenu();
                  }}
                  className={`flex items-center gap-2 p-3 rounded-xl text-xs font-bold text-left border ${darkMode ? 'bg-[#161b26] border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'}`}
                >
                  <Scale className="w-4 h-4 text-blue-500" />
                  <span>Compare Careers</span>
                </button>
              )}

              <button
                onClick={() => {
                  if (onOpenSkills) onOpenSkills();
                  closeMobileMenu();
                }}
                className={`flex items-center gap-2 p-3 rounded-xl text-xs font-bold text-left border ${darkMode ? 'bg-[#161b26] border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'}`}
              >
                <Target className="w-4 h-4 text-purple-500" />
                <span>Skills Gap</span>
              </button>

              <button
                onClick={() => {
                  if (onOpenRoadmap) onOpenRoadmap();
                  closeMobileMenu();
                }}
                className={`flex items-center gap-2 p-3 rounded-xl text-xs font-bold text-left border ${darkMode ? 'bg-[#161b26] border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'}`}
              >
                <Map className="w-4 h-4 text-pink-500" />
                <span>Roadmaps</span>
              </button>

              <button
                onClick={() => {
                  if (onOpenNews) onOpenNews();
                  closeMobileMenu();
                }}
                className={`flex items-center gap-2 p-3 rounded-xl text-xs font-bold text-left border ${darkMode ? 'bg-[#161b26] border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'}`}
              >
                <Newspaper className="w-4 h-4 text-amber-500" />
                <span>Career News</span>
              </button>

              <button
                onClick={() => {
                  if (onOpenAdvisor) onOpenAdvisor();
                  closeMobileMenu();
                }}
                className={`flex items-center gap-2 p-3 rounded-xl text-xs font-bold text-left border ${darkMode ? 'bg-pink-950/40 border-pink-800/40 text-pink-300' : 'bg-pink-50 border-pink-200 text-pink-700'}`}
              >
                <Bot className="w-4 h-4 text-pink-500" />
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