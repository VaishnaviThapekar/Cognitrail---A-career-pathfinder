// import React from 'react';
// import { Search, Moon, Sun, User, Scale, School } from 'lucide-react';
// import { useGamification } from '../contexts/GamificationContext';

// const Header = ({
//   darkMode,
//   toggleDarkMode,
//   searchQuery,
//   setSearchQuery,
//   userProfile,
//   setShowProfile,
//   setShowGamification,
//   setShowComparison,
//   setShowCollegeFinder
// }) => {
//   // Get gamification data
//   const { level, points } = useGamification();

//   return (
//     <header className={`sticky top-0 z-40 transition-all duration-500 ${darkMode ? 'bg-[#0f1419] border-b border-[#272757]' : 'bg-white border-b border-indigo-100'
//       } shadow-lg`}>
//       <div className="max-w-7xl mx-auto px-6 py-4">
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <div className="flex items-center gap-3 group cursor-pointer">
//             <div className="relative">
//               {/* Gradient background with glow */}
//               <div className={`w-10 h-10 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 ${darkMode
//                 ? 'bg-gradient-to-br from-[#272757] via-[#505081] to-[#8686AC]'
//                 : 'bg-gradient-to-br from-indigo-500 via-blue-500 to-indigo-600'
//                 }`}>
//                 <span className="text-2xl">💡</span>
//               </div>
//               {/* Glow effect */}
//               <div className={`absolute inset-0 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300 ${darkMode
//                 ? 'bg-gradient-to-br from-[#272757] via-[#505081] to-[#8686AC]'
//                 : 'bg-gradient-to-br from-indigo-400 via-blue-400 to-indigo-500'
//                 }`}></div>
//             </div>
//             <div>
//               <h1 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//                 COGNITRIAL
//               </h1>
//               <p className={`text-xs ${darkMode ? 'text-[#8686AC]' : 'text-indigo-600'}`}>
//                 Your Career Pathfinder
//               </p>
//             </div>
//           </div>

//           {/* Search Bar */}
//           <div className="flex-1 max-w-xl mx-8 hidden md:block">
//             <div className="relative group">
//               <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${darkMode
//                 ? 'text-gray-500 group-focus-within:text-[#8686AC]'
//                 : 'text-gray-400 group-focus-within:text-indigo-500'
//                 }`} />
//               <input
//                 type="text"
//                 placeholder="Search careers, fields, or skills..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className={`w-full pl-12 pr-4 py-3 rounded-xl transition-all duration-300 ${darkMode
//                   ? 'bg-[#1a1f2e] border-[#272757] text-white placeholder-gray-500 focus:border-[#505081] focus:ring-2 focus:ring-[#505081]/50'
//                   : 'bg-gray-50 border-indigo-100 text-gray-900 placeholder-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200'
//                   } border focus:outline-none`}
//               />
//               {searchQuery && (
//                 <div className={`absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 rounded-md text-xs font-bold ${darkMode ? 'bg-[#505081] text-white' : 'bg-indigo-600 text-white'
//                   }`}>
//                   Press Enter
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right Actions */}
//           <div className="flex items-center gap-3">
//             {/* Compare Careers Button */}
//             {setShowComparison && (
//               <button
//                 onClick={() => setShowComparison(true)}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all hover:scale-105 ${darkMode
//                   ? 'bg-[#1a1f2e] hover:bg-[#272757] text-[#8686AC] border-2 border-[#272757] hover:border-[#505081]'
//                   : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border-2 border-indigo-200 hover:border-indigo-400'
//                   }`}
//                 title="Compare Careers"
//               >
//                 <Scale className="w-5 h-5" />
//                 <span className="hidden md:inline font-semibold">Compare</span>
//               </button>
//             )}

//             {/* Colleges Button */}
//             {setShowCollegeFinder && (
//               <button
//                 onClick={() => setShowCollegeFinder(true)}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all hover:scale-105 ${darkMode
//                   ? 'bg-[#1a1f2e] hover:bg-[#272757] text-[#8686AC] border-2 border-[#272757] hover:border-[#505081]'
//                   : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border-2 border-indigo-200 hover:border-indigo-400'
//                   }`}
//                 title="Find Colleges"
//               >
//                 <School className="w-5 h-5" />
//                 <span className="hidden md:inline font-semibold">Colleges</span>
//               </button>
//             )}

//             {/* Dark Mode Toggle */}
//             <button
//               onClick={toggleDarkMode}
//               className={`p-3 rounded-xl transition-all duration-300 group ${darkMode
//                 ? 'bg-[#1a1f2e] hover:bg-[#272757]'
//                 : 'bg-indigo-50 hover:bg-indigo-100'
//                 }`}
//               aria-label="Toggle dark mode"
//             >
//               {darkMode ? (
//                 <Sun className="w-5 h-5 text-[#8686AC] group-hover:rotate-180 transition-transform duration-500" />
//               ) : (
//                 <Moon className="w-5 h-5 text-indigo-600 group-hover:rotate-12 transition-transform duration-300" />
//               )}
//             </button>

//             {/* Gamification Widget - ALWAYS VISIBLE */}
//             <button
//               onClick={() => setShowGamification && setShowGamification(true)}
//               className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all hover:scale-105 border-2 ${darkMode
//                 ? 'bg-[#1a1f2e] border-[#505081] hover:border-[#8686AC]'
//                 : 'bg-white border-indigo-200 hover:border-indigo-400'
//                 }`}
//               title="Your Progress - Click to view dashboard"
//             >
//               {/* Level Badge */}
//               <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shadow-lg ${darkMode
//                 ? 'bg-gradient-to-br from-[#505081] to-[#8686AC] text-white'
//                 : 'bg-gradient-to-br from-indigo-600 to-blue-600 text-white'
//                 }`}>
//                 {level}
//               </div>

//               {/* Points & Progress */}
//               <div className="hidden md:block text-left">
//                 <div className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'
//                   }`}>
//                   Level {level}
//                 </div>
//                 <div className={`text-xs font-bold ${darkMode ? 'text-[#8686AC]' : 'text-indigo-600'
//                   }`}>
//                   {points} pts
//                 </div>
//               </div>
//             </button>

//             {/* Profile Button */}
//             <button
//               onClick={() => setShowProfile(true)}
//               className={`flex items-center gap-2 px-4 py-2 rounded-xl text-white transition-all duration-300 transform hover:scale-105 ${darkMode
//                 ? 'bg-gradient-to-r from-[#272757] to-[#505081] hover:from-[#505081] hover:to-[#8686AC] shadow-lg shadow-[#272757]/50'
//                 : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-lg shadow-indigo-200'
//                 }`}
//             >
//               <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
//                 <User className="w-5 h-5" />
//               </div>
//               <span className="font-semibold hidden md:block">{userProfile.name.split(' ')[0]}</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };








import React, { useState } from 'react';
import { Search, Moon, Sun, User, Scale, School, LogIn } from 'lucide-react';
import { useGamification } from '../contexts/GamificationContext';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

const Header = ({
  darkMode,
  toggleDarkMode,
  searchQuery,
  setSearchQuery,
  setShowProfile,
  setShowGamification,
  setShowComparison,
  setShowCollegeFinder
}) => {
  // Get gamification data
  const { level, points } = useGamification();

  // Get authentication data
  const { user, isAuthenticated } = useAuth();

  // Auth modal state
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      <header className={`sticky top-0 z-40 transition-all duration-500 ${darkMode ? 'bg-[#0f1419] border-b border-[#272757]' : 'bg-white border-b border-indigo-100'
        } shadow-lg`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="relative">
                {/* Gradient background with glow */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 ${darkMode
                  ? 'bg-gradient-to-br from-[#272757] via-[#505081] to-[#8686AC]'
                  : 'bg-gradient-to-br from-indigo-500 via-blue-500 to-indigo-600'
                  }`}>
                  <span className="text-2xl">💡</span>
                </div>
                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300 ${darkMode
                  ? 'bg-gradient-to-br from-[#272757] via-[#505081] to-[#8686AC]'
                  : 'bg-gradient-to-br from-indigo-400 via-blue-400 to-indigo-500'
                  }`}></div>
              </div>
              <div>
                <h1 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  COGNITRIAL
                </h1>
                <p className={`text-xs ${darkMode ? 'text-[#8686AC]' : 'text-indigo-600'}`}>
                  Your Career Pathfinder
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-8 hidden md:block">
              <div className="relative group">
                <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${darkMode
                  ? 'text-gray-500 group-focus-within:text-[#8686AC]'
                  : 'text-gray-400 group-focus-within:text-indigo-500'
                  }`} />
                <input
                  type="text"
                  placeholder="Search careers, fields, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 rounded-xl transition-all duration-300 ${darkMode
                    ? 'bg-[#1a1f2e] border-[#272757] text-white placeholder-gray-500 focus:border-[#505081] focus:ring-2 focus:ring-[#505081]/50'
                    : 'bg-gray-50 border-indigo-100 text-gray-900 placeholder-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200'
                    } border focus:outline-none`}
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Compare Careers Button */}
              {setShowComparison && (
                <button
                  onClick={() => setShowComparison(true)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all hover:scale-105 ${darkMode
                    ? 'bg-[#1a1f2e] hover:bg-[#272757] text-[#8686AC] border-2 border-[#272757] hover:border-[#505081]'
                    : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border-2 border-indigo-200 hover:border-indigo-400'
                    }`}
                  title="Compare Careers"
                >
                  <Scale className="w-5 h-5" />
                  <span className="hidden md:inline font-semibold">Compare</span>
                </button>
              )}

              {/* Colleges Button */}
              {setShowCollegeFinder && (
                <button
                  onClick={() => setShowCollegeFinder(true)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all hover:scale-105 ${darkMode
                    ? 'bg-[#1a1f2e] hover:bg-[#272757] text-[#8686AC] border-2 border-[#272757] hover:border-[#505081]'
                    : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border-2 border-indigo-200 hover:border-indigo-400'
                    }`}
                  title="Find Colleges"
                >
                  <School className="w-5 h-5" />
                  <span className="hidden md:inline font-semibold">Colleges</span>
                </button>
              )}

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-3 rounded-xl transition-all duration-300 group ${darkMode
                  ? 'bg-[#1a1f2e] hover:bg-[#272757]'
                  : 'bg-indigo-50 hover:bg-indigo-100'
                  }`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-[#8686AC] group-hover:rotate-180 transition-transform duration-500" />
                ) : (
                  <Moon className="w-5 h-5 text-indigo-600 group-hover:rotate-12 transition-transform duration-300" />
                )}
              </button>

              {/* Gamification Widget - ALWAYS VISIBLE */}
              {isAuthenticated && (
                <button
                  onClick={() => setShowGamification && setShowGamification(true)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all hover:scale-105 border-2 ${darkMode
                    ? 'bg-[#1a1f2e] border-[#505081] hover:border-[#8686AC]'
                    : 'bg-white border-indigo-200 hover:border-indigo-400'
                    }`}
                  title="Your Progress - Click to view dashboard"
                >
                  {/* Level Badge */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shadow-lg ${darkMode
                    ? 'bg-gradient-to-br from-[#505081] to-[#8686AC] text-white'
                    : 'bg-gradient-to-br from-indigo-600 to-blue-600 text-white'
                    }`}>
                    {level}
                  </div>

                  {/* Points & Progress */}
                  <div className="hidden md:block text-left">
                    <div className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                      Level {level}
                    </div>
                    <div className={`text-xs font-bold ${darkMode ? 'text-[#8686AC]' : 'text-indigo-600'
                      }`}>
                      {points} pts
                    </div>
                  </div>
                </button>
              )}

              {/* Profile Button - Authenticated */}
              {isAuthenticated ? (
                <button
                  onClick={() => setShowProfile(true)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-white transition-all duration-300 transform hover:scale-105 ${darkMode
                    ? 'bg-gradient-to-r from-[#272757] to-[#505081] hover:from-[#505081] hover:to-[#8686AC] shadow-lg shadow-[#272757]/50'
                    : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-lg shadow-indigo-200'
                    }`}
                >
                  {/* Avatar with initials */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${user.avatar?.color || 'bg-white/20'
                    }`}>
                    {user.avatar?.initials || user.name.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="font-semibold hidden md:block">{user.name.split(' ')[0]}</span>
                </button>
              ) : (
                /* Sign In Button - Not Authenticated */
                <button
                  onClick={() => setShowAuthModal(true)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-white transition-all duration-300 transform hover:scale-105 ${darkMode
                    ? 'bg-gradient-to-r from-[#272757] to-[#505081] hover:from-[#505081] hover:to-[#8686AC] shadow-lg shadow-[#272757]/50'
                    : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-lg shadow-indigo-200'
                    }`}
                >
                  <LogIn className="w-5 h-5" />
                  <span className="font-semibold">Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>
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