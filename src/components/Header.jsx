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
      <header className={`sticky top-0 z-40 transition-colors duration-200 border-b backdrop-blur-md ${darkMode ? 'bg-[#09090b]/90 border-zinc-800 text-white' : 'bg-white/95 border-zinc-200 text-black'
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
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xl shadow-md transition-transform group-hover:scale-105 ${darkMode
                ? 'bg-[#00E599] text-black'
                : 'bg-[#00E599] text-black'
                }`}>
                💡
              </div>
              <div>
                <h1 className={`text-xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-black'}`}>
                  COGNITRAIL
                </h1>
                <p className={`text-[10px] font-bold uppercase tracking-wider ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
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
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${darkMode ? 'text-zinc-300 hover:text-[#00E599] hover:bg-emerald-950/40' : 'text-zinc-700 hover:text-emerald-950 hover:bg-[#E6F9F3]'}`}
              >
                Careers
              </button>

              <button
                onClick={() => onOpenQuiz && onOpenQuiz()}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${darkMode ? 'text-emerald-300 hover:text-white hover:bg-emerald-900/40' : 'text-emerald-900 hover:bg-[#E6F9F3]'}`}
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#00E599]" />
                AI Quiz
              </button>

              {setShowCollegeFinder && (
                <button
                  onClick={() => setShowCollegeFinder(true)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${darkMode ? 'text-zinc-300 hover:text-[#00E599] hover:bg-emerald-950/40' : 'text-zinc-700 hover:text-emerald-950 hover:bg-[#E6F9F3]'}`}
                >
                  Colleges
                </button>
              )}

              {setShowComparison && (
                <button
                  onClick={() => setShowComparison(true)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${darkMode ? 'text-zinc-300 hover:text-[#00E599] hover:bg-emerald-950/40' : 'text-zinc-700 hover:text-emerald-950 hover:bg-[#E6F9F3]'}`}
                >
                  Compare
                </button>
              )}

              <button
                onClick={() => onOpenSkills && onOpenSkills()}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${darkMode ? 'text-zinc-300 hover:text-[#00E599] hover:bg-emerald-950/40' : 'text-zinc-700 hover:text-emerald-950 hover:bg-[#E6F9F3]'}`}
              >
                Skill Gap
              </button>

              <button
                onClick={() => onOpenRoadmap && onOpenRoadmap()}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${darkMode ? 'text-zinc-300 hover:text-[#00E599] hover:bg-emerald-950/40' : 'text-zinc-700 hover:text-emerald-950 hover:bg-[#E6F9F3]'}`}
              >
                Roadmaps
              </button>

              <button
                onClick={() => onOpenAdvisor && onOpenAdvisor()}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${darkMode ? 'text-zinc-300 hover:text-[#00E599] hover:bg-emerald-950/40' : 'text-zinc-700 hover:text-emerald-950 hover:bg-[#E6F9F3]'}`}
              >
                <Bot className="w-3.5 h-3.5 text-[#00E599]" />
                Advisor Pro
              </button>
            </nav>

            {/* Search Bar - Desktop */}
            <div className="flex-1 max-w-xs lg:max-w-sm hidden md:block">
              <div className="relative">
                <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                <input
                  type="text"
                  placeholder="Search 150+ careers, skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs transition-all border focus:outline-none ${darkMode
                    ? 'bg-[#0e241c] border-emerald-800 text-white placeholder-emerald-500/70 focus:border-[#00E599]'
                    : 'bg-[#F4FBF7] border-emerald-200/80 text-black placeholder-zinc-400 focus:border-[#00E599] focus:bg-white'
                    }`}
                />
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2.5 rounded-xl border btn-interactive hover-lift ${darkMode
                  ? 'bg-[#0e241c] border-emerald-800 text-emerald-300 hover:bg-emerald-900/50'
                  : 'bg-[#E6F9F3] border-emerald-200 text-emerald-900 hover:bg-emerald-200/60'
                  }`}
                aria-label="Toggle dark mode"
                title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <Sun className="w-4 h-4 text-[#00E599] transition-transform duration-300 hover:rotate-90" /> : <Moon className="w-4 h-4 text-emerald-800 transition-transform duration-300 hover:-rotate-45" />}
              </button>

              {/* Gamification Progress */}
              {isAuthenticated && (
                <button
                  onClick={() => setShowGamification && setShowGamification(true)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border btn-interactive hover-lift ${darkMode
                    ? 'bg-[#0e241c] border-emerald-800 hover:border-[#00E599]'
                    : 'bg-[#E6F9F3] border-emerald-200 hover:border-emerald-400'
                    }`}
                  title="Your points & level"
                >
                  <div className={`w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center transition-transform hover:scale-110 bg-[#00E599] text-black`}>
                    {level}
                  </div>
                  <span className={`text-xs font-bold hidden sm:inline ${darkMode ? 'text-emerald-300' : 'text-emerald-950'}`}>
                    {points} pts
                  </span>
                </button>
              )}

              {/* Profile / Auth Button */}
              {isAuthenticated ? (
                <button
                  onClick={() => setShowProfile(true)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-bold text-xs shadow-sm btn-interactive hover-lift bg-[#00E599] text-black hover:bg-[#00CC88]`}
                >
                  <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center">
                    <User className="w-3.5 h-3.5 text-black" />
                  </div>
                  <span className="hidden sm:inline">{user?.name?.split(' ')[0] || 'Profile'}</span>
                </button>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs shadow-md btn-interactive hover-lift bg-[#00E599] text-black hover:bg-[#00CC88] shadow-emerald-500/20`}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
              )}

              {/* Mobile Hamburger Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`xl:hidden p-2.5 rounded-xl border btn-interactive ${darkMode
                  ? 'bg-[#18181b] border-zinc-700 text-white'
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
          <div className={`xl:hidden border-t px-4 py-4 space-y-3 animate-slide-down ${darkMode ? 'bg-[#09090b] border-zinc-800' : 'bg-white border-zinc-200 shadow-xl'
            }`}>
            {/* Search Input on Mobile */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search careers, skills, fields..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-9 pr-4 py-2.5 rounded-xl text-xs border focus:outline-none ${darkMode ? 'bg-[#18181b] border-zinc-700 text-white placeholder-zinc-500' : 'bg-zinc-50 border-zinc-200 text-black'}`}
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
                className={`flex items-center gap-2 p-3 rounded-xl text-xs font-bold text-left border ${darkMode ? 'bg-[#18181b] border-zinc-800 text-zinc-200' : 'bg-zinc-50 border-zinc-200 text-zinc-800'}`}
              >
                <Compass className="w-4 h-4" />
                <span>Explore Careers</span>
              </button>

              <button
                onClick={() => {
                  if (onOpenQuiz) onOpenQuiz();
                  closeMobileMenu();
                }}
                className={`flex items-center gap-2 p-3 rounded-xl text-xs font-bold text-left border ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-zinc-100 border-zinc-300 text-black'}`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>AI Career Quiz</span>
              </button>

              {setShowCollegeFinder && (
                <button
                  onClick={() => {
                    setShowCollegeFinder(true);
                    closeMobileMenu();
                  }}
                  className={`flex items-center gap-2 p-3 rounded-xl text-xs font-bold text-left border ${darkMode ? 'bg-[#18181b] border-zinc-800 text-zinc-200' : 'bg-zinc-50 border-zinc-200 text-zinc-800'}`}
                >
                  <School className="w-4 h-4" />
                  <span>College Finder</span>
                </button>
              )}

              {setShowComparison && (
                <button
                  onClick={() => {
                    setShowComparison(true);
                    closeMobileMenu();
                  }}
                  className={`flex items-center gap-2 p-3 rounded-xl text-xs font-bold text-left border ${darkMode ? 'bg-[#18181b] border-zinc-800 text-zinc-200' : 'bg-zinc-50 border-zinc-200 text-zinc-800'}`}
                >
                  <Scale className="w-4 h-4" />
                  <span>Compare Careers</span>
                </button>
              )}

              <button
                onClick={() => {
                  if (onOpenSkills) onOpenSkills();
                  closeMobileMenu();
                }}
                className={`flex items-center gap-2 p-3 rounded-xl text-xs font-bold text-left border ${darkMode ? 'bg-[#18181b] border-zinc-800 text-zinc-200' : 'bg-zinc-50 border-zinc-200 text-zinc-800'}`}
              >
                <Target className="w-4 h-4" />
                <span>Skills Gap</span>
              </button>

              <button
                onClick={() => {
                  if (onOpenRoadmap) onOpenRoadmap();
                  closeMobileMenu();
                }}
                className={`flex items-center gap-2 p-3 rounded-xl text-xs font-bold text-left border ${darkMode ? 'bg-[#18181b] border-zinc-800 text-zinc-200' : 'bg-zinc-50 border-zinc-200 text-zinc-800'}`}
              >
                <Map className="w-4 h-4" />
                <span>Roadmaps</span>
              </button>

              <button
                onClick={() => {
                  if (onOpenNews) onOpenNews();
                  closeMobileMenu();
                }}
                className={`flex items-center gap-2 p-3 rounded-xl text-xs font-bold text-left border ${darkMode ? 'bg-[#18181b] border-zinc-800 text-zinc-200' : 'bg-zinc-50 border-zinc-200 text-zinc-800'}`}
              >
                <Newspaper className="w-4 h-4" />
                <span>Career News</span>
              </button>

              <button
                onClick={() => {
                  if (onOpenAdvisor) onOpenAdvisor();
                  closeMobileMenu();
                }}
                className={`flex items-center gap-2 p-3 rounded-xl text-xs font-bold text-left border ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-zinc-100 border-zinc-300 text-black'}`}
              >
                <Bot className="w-4 h-4" />
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