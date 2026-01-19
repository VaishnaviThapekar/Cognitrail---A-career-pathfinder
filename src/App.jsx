// import React, { useState, useEffect } from 'react';
// import { Lightbulb, ChevronRight, Sparkles } from 'lucide-react';
// import Header from './components/Header';
// import HeroSection from './components/HeroSection';
// import WhyChooseSection from './components/WhyChooseSection';
// import CareerCard from './components/CareerCard';
// import CareerDetailModal from './components/CareerDetailModal';
// import ProfilePage from './components/ProfilePage';
// import CareerQuiz from './components/Careerquiz';
// import CareerNewsFeed from './components/CareerNewsFeed';
// import CareerChatbot from './components/CareerChatbot';
// import CareerComparison from './components/CareerComparison';
// import CollegeFinder from './components/CollegeFinder';
// import { LevelUpNotification, AchievementNotification, GamificationDashboard } from './components/GamificationComponents';
// import { useGamification } from './contexts/GamificationContext';
// import { CAREER_DATABASE } from './data/CareerDatabase';

// function App() {
//   // Gamification Hook
//   const { trackCareerExplored, trackCareerSaved, trackQuizComplete } = useGamification();

//   // State Management
//   const [selectedDomain, setSelectedDomain] = useState(null);
//   const [selectedSubField, setSelectedSubField] = useState(null);
//   const [selectedCareer, setSelectedCareer] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showWelcome, setShowWelcome] = useState(true);
//   const [darkMode, setDarkMode] = useState(false);
//   const [showProfile, setShowProfile] = useState(false);
//   const [savedCareers, setSavedCareers] = useState([]);
//   const [showQuiz, setShowQuiz] = useState(false);
//   const [showNews, setShowNews] = useState(false);
//   const [showChatbot, setShowChatbot] = useState(false);
//   const [showGamification, setShowGamification] = useState(false);
//   const [showComparison, setShowComparison] = useState(false);
//   const [showCollegeFinder, setShowCollegeFinder] = useState(false);
//   const [userProfile, setUserProfile] = useState({
//     name: "Guest User",
//     email: "user@cognitrial.com",
//     grade: "10th Passed",
//     interests: ["Technology", "Science"],
//     location: "India",
//     profileComplete: 45
//   });

//   // Effects
//   useEffect(() => {
//     const timer = setTimeout(() => setShowWelcome(false), 3000);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     const savedDarkMode = localStorage.getItem('darkMode');
//     if (savedDarkMode === 'true') {
//       setDarkMode(true);
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('darkMode', darkMode);
//     if (darkMode) {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   }, [darkMode]);

//   // Functions
//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };

//   // Filter domains based on search
//   const filteredDomains = Object.entries(CAREER_DATABASE).filter(([key, domain]) => {
//     if (!searchQuery) return true;
//     const query = searchQuery.toLowerCase();
//     return (
//       domain.name.toLowerCase().includes(query) ||
//       domain.subFields.some(sf =>
//         sf.name.toLowerCase().includes(query) ||
//         sf.description.toLowerCase().includes(query) ||
//         sf.careers.some(c => c.name.toLowerCase().includes(query))
//       )
//     );
//   });

//   // Get all careers for comparison
//   const getAllCareers = () => {
//     const careers = [];
//     Object.values(CAREER_DATABASE).forEach(domain => {
//       domain.subFields.forEach(subField => {
//         careers.push(...subField.careers);
//       });
//     });
//     return careers;
//   };

//   // Welcome Screen
//   if (showWelcome) {
//     return (
//       <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
//         {/* Animated Gradient Background */}
//         <div className="absolute inset-0 bg-gradient-to-br from-[#0f1419] via-[#1a1f3a] to-[#0f1419]">
//           {/* Animated gradient orbs */}
//           <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
//           <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
//           <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-teal-600/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
//           <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-600/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-3000"></div>

//           {/* Grid overlay */}
//           <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

//           {/* Floating particles */}
//           <div className="absolute inset-0">
//             <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-indigo-400 rounded-full animate-float"></div>
//             <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-blue-400 rounded-full animate-float animation-delay-1000"></div>
//             <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-teal-400 rounded-full animate-float animation-delay-2000"></div>
//             <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-float animation-delay-3000"></div>
//             <div className="absolute bottom-1/3 right-1/4 w-2.5 h-2.5 bg-purple-400 rounded-full animate-float animation-delay-1500"></div>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="relative z-10 text-center animate-fadeIn">
//           {/* Logo with glow effect */}
//           <div className="mb-8 relative inline-block">
//             {/* Outer glow rings */}
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="w-40 h-40 rounded-full bg-gradient-to-r from-indigo-500/20 to-blue-500/20 animate-ping-slow"></div>
//             </div>
//             <div className="absolute inset-0 flex items-center justify-center animation-delay-1000">
//               <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500/30 to-teal-500/30 animate-ping-slow"></div>
//             </div>

//             {/* Main icon container */}
//             <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
//               {/* Rotating gradient border */}
//               <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-blue-500 to-teal-500 animate-spin-slow"></div>
//               <div className="absolute inset-1 rounded-full bg-[#0f1419]"></div>

//               {/* Icon */}
//               <div className="relative z-10">
//                 <Lightbulb className="w-16 h-16 text-yellow-400 animate-pulse-glow" />
//               </div>
//             </div>
//           </div>

//           {/* Title with gradient text */}
//           <h1 className="text-7xl font-black mb-4 tracking-tight animate-slideUp">
//             <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-teal-400 bg-clip-text text-transparent animate-gradient-x">
//               COGNITRIAL
//             </span>
//           </h1>

//           {/* Subtitle with typewriter effect */}
//           <div className="h-8 mb-8">
//             <p className="text-2xl text-gray-300 font-light animate-fadeIn animation-delay-500">
//               Your Intelligent Career Pathfinder
//             </p>
//           </div>

//           {/* Feature badges */}
//           <div className="flex flex-wrap justify-center gap-3 mb-8 animate-fadeIn animation-delay-1000">
//             <div className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600/20 to-indigo-600/10 border border-indigo-500/30 backdrop-blur-sm">
//               <span className="text-indigo-300 text-sm font-semibold">150+ Careers</span>
//             </div>
//             <div className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/20 to-blue-600/10 border border-blue-500/30 backdrop-blur-sm">
//               <span className="text-blue-300 text-sm font-semibold">AI-Powered</span>
//             </div>
//             <div className="px-4 py-2 rounded-full bg-gradient-to-r from-teal-600/20 to-teal-600/10 border border-teal-500/30 backdrop-blur-sm">
//               <span className="text-teal-300 text-sm font-semibold">Real-time Updates</span>
//             </div>
//           </div>

//           {/* Loading indicator */}
//           <div className="flex justify-center items-center gap-2 animate-fadeIn animation-delay-1500">
//             <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce"></div>
//             <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce animation-delay-200"></div>
//             <div className="w-2 h-2 rounded-full bg-teal-500 animate-bounce animation-delay-400"></div>
//           </div>

//           {/* Bottom tagline */}
//           <div className="mt-12 animate-fadeIn animation-delay-2000">
//             <p className="text-gray-400 text-sm">
//               Think Smart. Choose Right. Grow Ahead.
//             </p>
//           </div>
//         </div>

//         {/* Corner decorations */}
//         <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-indigo-500/20 rounded-tl-3xl"></div>
//         <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-blue-500/20 rounded-tr-3xl"></div>
//         <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-teal-500/20 rounded-bl-3xl"></div>
//         <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-cyan-500/20 rounded-br-3xl"></div>
//       </div>
//     );
//   }

//   return (
//     <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#0f1419]' : 'bg-gradient-to-br from-slate-50 to-teal-50'}`}>
//       {/* Profile Page */}
//       {showProfile && (
//         <ProfilePage
//           userProfile={userProfile}
//           setUserProfile={setUserProfile}
//           onClose={() => setShowProfile(false)}
//           darkMode={darkMode}
//           savedCareers={savedCareers}
//         />
//       )}

//       {!showProfile && (
//         <>
//           {/* Header */}
//           <Header
//             darkMode={darkMode}
//             toggleDarkMode={toggleDarkMode}
//             searchQuery={searchQuery}
//             setSearchQuery={setSearchQuery}
//             userProfile={userProfile}
//             setShowProfile={setShowProfile}
//             setShowGamification={setShowGamification}
//             setShowComparison={setShowComparison}
//             setShowCollegeFinder={setShowCollegeFinder}
//           />

//           {/* Main Content */}
//           <main className="max-w-7xl mx-auto px-4 py-8 pb-32">
//             {!selectedDomain ? (
//               // Home Page with Hero and Domains
//               <div>
//                 <HeroSection darkMode={darkMode} />

//                 {/* Feature Shortcuts */}
//                 <div className="grid md:grid-cols-3 gap-6 mb-16">
//                   {/* Career Quiz Card */}
//                   <button
//                     onClick={() => setShowQuiz(true)}
//                     className={`group relative rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 text-left overflow-hidden ${darkMode
//                       ? 'bg-gradient-to-br from-[#272757] to-[#505081] border border-[#8686AC]/30'
//                       : 'bg-gradient-to-br from-indigo-500 to-blue-600 border border-indigo-300'
//                       }`}
//                   >
//                     {/* Sparkle animation */}
//                     <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
//                       <Sparkles className="w-6 h-6 text-white animate-pulse" />
//                     </div>

//                     <div className="relative z-10">
//                       <div className="text-6xl mb-4">🎯</div>
//                       <h3 className="text-2xl font-black text-white mb-2">
//                         Take Career Quiz
//                       </h3>
//                       <p className="text-white/80 mb-4">
//                         AI-powered recommendations based on your interests
//                       </p>
//                       <div className="flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all">
//                         <span>Start Quiz</span>
//                         <ChevronRight className="w-5 h-5" />
//                       </div>
//                     </div>

//                     {/* Animated gradient overlay */}
//                     <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                   </button>

//                   {/* Career News Card */}
//                   <button
//                     onClick={() => setShowNews(true)}
//                     className={`group relative rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 text-left overflow-hidden ${darkMode
//                       ? 'bg-gradient-to-br from-[#505081] to-[#8686AC] border border-[#8686AC]/30'
//                       : 'bg-gradient-to-br from-purple-500 to-pink-600 border border-purple-300'
//                       }`}
//                   >
//                     {/* Sparkle animation */}
//                     <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
//                       <Sparkles className="w-6 h-6 text-white animate-pulse" />
//                     </div>

//                     <div className="relative z-10">
//                       <div className="text-6xl mb-4">📰</div>
//                       <h3 className="text-2xl font-black text-white mb-2">
//                         Latest Career News
//                       </h3>
//                       <p className="text-white/80 mb-4">
//                         Stay updated with exams, scholarships, and trends
//                       </p>
//                       <div className="flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all">
//                         <span>View News</span>
//                         <ChevronRight className="w-5 h-5" />
//                       </div>
//                     </div>

//                     {/* Animated gradient overlay */}
//                     <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                   </button>

//                   {/* Compare Careers Card */}
//                   <button
//                     onClick={() => setShowComparison(true)}
//                     className={`group relative rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 text-left overflow-hidden ${darkMode
//                       ? 'bg-gradient-to-br from-[#3d3d6b] to-[#6b6b9e] border border-[#6b6b9e]/30'
//                       : 'bg-gradient-to-br from-blue-500 to-indigo-600 border border-blue-300'
//                       }`}
//                   >
//                     {/* Sparkle animation */}
//                     <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
//                       <Sparkles className="w-6 h-6 text-white animate-pulse" />
//                     </div>

//                     <div className="relative z-10">
//                       <div className="text-6xl mb-4">⚖️</div>
//                       <h3 className="text-2xl font-black text-white mb-2">
//                         Compare Careers
//                       </h3>
//                       <p className="text-white/80 mb-4">
//                         Side-by-side comparison of salary, skills, outlook
//                       </p>
//                       <div className="flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all">
//                         <span>Start Comparing</span>
//                         <ChevronRight className="w-5 h-5" />
//                       </div>
//                     </div>

//                     {/* Animated gradient overlay */}
//                     <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                   </button>
//                 </div>

//                 <WhyChooseSection darkMode={darkMode} />

//                 {/* Domain Selection */}
//                 <div id="domains">
//                   <div className="text-center mb-12">
//                     <h2 className={`text-4xl font-black ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>
//                       Explore Career Domains
//                     </h2>
//                     <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                       Choose your area of interest to discover career paths
//                     </p>
//                   </div>

//                   <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {filteredDomains.map(([key, domain]) => (
//                       <button
//                         key={key}
//                         onClick={() => setSelectedDomain(key)}
//                         className={`group relative ${darkMode ? 'bg-[#1a1f2e] border-[#272757] hover:border-[#505081]' : 'bg-white border-indigo-100 hover:border-indigo-300'} rounded-2xl p-8 border-2 transition-all duration-300 text-left overflow-hidden hover:shadow-2xl hover:-translate-y-1`}
//                       >
//                         {/* Animated gradient overlay on hover */}
//                         <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${darkMode
//                           ? 'bg-gradient-to-br from-[#272757]/5 via-transparent to-[#505081]/10'
//                           : 'bg-gradient-to-br from-indigo-50/50 via-transparent to-blue-50/50'
//                           }`}></div>

//                         {/* Sparkle particles on hover */}
//                         <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
//                           <div className="relative">
//                             <Sparkles className={`w-5 h-5 ${darkMode ? 'text-[#8686AC]' : 'text-indigo-400'} animate-pulse`} />
//                             <div className="absolute inset-0 blur-md opacity-75">
//                               <Sparkles className={`w-5 h-5 ${darkMode ? 'text-[#8686AC]' : 'text-indigo-400'}`} />
//                             </div>
//                           </div>
//                         </div>

//                         {/* Content */}
//                         <div className="relative z-10">
//                           {/* Icon with gradient background */}
//                           <div className={`mb-6 inline-flex items-center justify-center w-20 h-20 rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${darkMode
//                             ? 'bg-gradient-to-br from-[#272757] to-[#505081] group-hover:shadow-lg group-hover:shadow-[#505081]/50'
//                             : 'bg-gradient-to-br from-indigo-100 to-blue-100 group-hover:shadow-lg group-hover:shadow-indigo-200'
//                             }`}>
//                             <span className="text-5xl filter drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300">{domain.icon}</span>
//                           </div>

//                           {/* Title */}
//                           <h3 className={`text-2xl font-bold mb-3 transition-all duration-300 ${darkMode
//                             ? 'text-white group-hover:text-[#8686AC]'
//                             : 'text-gray-900 group-hover:text-indigo-600'
//                             }`}>
//                             {domain.name}
//                           </h3>

//                           {/* Subtitle */}
//                           <p className={`text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                             {domain.subFields.length} specialized fields
//                           </p>

//                           {/* Explore Button */}
//                           <div className={`flex items-center gap-2 font-semibold group-hover:gap-3 transition-all duration-300 ${darkMode ? 'text-[#8686AC]' : 'text-indigo-600'
//                             }`}>
//                             <span>Explore</span>
//                             <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
//                           </div>
//                         </div>

//                         {/* Bottom glow accent */}
//                         <div className={`absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${darkMode
//                           ? 'bg-gradient-to-r from-transparent via-[#505081] to-transparent'
//                           : 'bg-gradient-to-r from-transparent via-indigo-400 to-transparent'
//                           }`}></div>

//                         {/* Corner sparkle effects */}
//                         <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-[#8686AC] opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
//                         <div className="absolute top-4 left-4 w-1 h-1 rounded-full bg-[#505081] opacity-0 group-hover:opacity-100 group-hover:animate-ping animation-delay-200"></div>
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             ) : !selectedSubField ? (
//               // SubField Selection
//               <div>
//                 <div className="mb-6">
//                   <button
//                     onClick={() => setSelectedDomain(null)}
//                     className={`${darkMode ? 'text-teal-400 hover:text-teal-300' : 'text-teal-600 hover:text-teal-700'} font-semibold flex items-center gap-2`}
//                   >
//                     ← Back to Domains
//                   </button>
//                 </div>

//                 <div className="text-center mb-12">
//                   <h2 className={`text-4xl font-black ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>
//                     {CAREER_DATABASE[selectedDomain].name}
//                   </h2>
//                   <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                     Select a specialized field
//                   </p>
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-6">
//                   {CAREER_DATABASE[selectedDomain].subFields.map((subField) => (
//                     <button
//                       key={subField.id}
//                       onClick={() => setSelectedSubField(subField)}
//                       className={`group relative ${darkMode ? 'bg-[#1a1f2e] border-gray-800 hover:border-cyan-500' : 'bg-white border-gray-200 hover:border-cyan-400'} rounded-2xl p-6 border-2 transition-all duration-300 text-left overflow-hidden`}
//                     >
//                       {/* Hover Effect */}
//                       <div className="absolute inset-0 bg-gradient-to-br from-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

//                       <div className="relative z-10">
//                         <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2 group-hover:text-cyan-400 transition-colors`}>
//                           {subField.name}
//                         </h3>
//                         <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4 leading-relaxed`}>
//                           {subField.description}
//                         </p>
//                         <div className="flex items-center justify-between">
//                           <span className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
//                             {subField.careers.length} career options
//                           </span>
//                           <ChevronRight className={`w-5 h-5 text-orange-500 group-hover:translate-x-1 transition-all`} />
//                         </div>
//                       </div>

//                       {/* Bottom Border Accent */}
//                       <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               // Career Listing
//               <div className={`pb-20 rounded-3xl ${darkMode ? 'bg-[#0f1419]' : 'bg-gradient-to-br from-slate-50 to-teal-50'}`}>
//                 <div className="mb-6 flex items-center gap-4">
//                   <button
//                     onClick={() => setSelectedSubField(null)}
//                     className={`${darkMode ? 'text-teal-400 hover:text-teal-300' : 'text-teal-600 hover:text-teal-700'} font-semibold flex items-center gap-2`}
//                   >
//                     ← Back to Fields
//                   </button>
//                 </div>

//                 <div className="text-center mb-12">
//                   <h2 className={`text-4xl font-black ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>
//                     {selectedSubField.name}
//                   </h2>
//                   <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                     {selectedSubField.description}
//                   </p>
//                   <p className={`text-lg ${darkMode ? 'text-gray-500' : 'text-gray-500'} mt-2`}>
//                     {selectedSubField.careers.length} career paths available
//                   </p>
//                 </div>

//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
//                   {selectedSubField.careers.map((career, idx) => (
//                     <CareerCard
//                       key={idx}
//                       career={career}
//                       onSelect={(career) => {
//                         setSelectedCareer(career);
//                         trackCareerExplored();
//                       }}
//                       darkMode={darkMode}
//                       savedCareers={savedCareers}
//                       setSavedCareers={(careers) => {
//                         const isAdding = careers.length > savedCareers.length;
//                         if (isAdding) trackCareerSaved();
//                         setSavedCareers(careers);
//                       }}
//                     />
//                   ))}
//                 </div>
//               </div>
//             )}
//           </main>

//           {/* Career Detail Modal */}
//           {selectedCareer && (
//             <CareerDetailModal
//               career={selectedCareer}
//               onClose={() => setSelectedCareer(null)}
//               darkMode={darkMode}
//             />
//           )}

//           {/* Footer */}
//           <footer className={`${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-t mt-20`}>
//             <div className="max-w-7xl mx-auto px-4 py-12">
//               <div className="grid md:grid-cols-4 gap-8">
//                 <div>
//                   <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
//                     COGNITRIAL
//                   </h3>
//                   <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
//                     Think Smart. Choose Right. Grow Ahead.
//                   </p>
//                 </div>
//                 <div>
//                   <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
//                     Quick Links
//                   </h4>
//                   <ul className="space-y-2">
//                     <li>
//                       <button className={`${darkMode ? 'text-gray-400 hover:text-teal-400' : 'text-gray-600 hover:text-teal-600'}`}>
//                         About Us
//                       </button>
//                     </li>
//                     <li>
//                       <button className={`${darkMode ? 'text-gray-400 hover:text-teal-400' : 'text-gray-600 hover:text-teal-600'}`}>
//                         Contact
//                       </button>
//                     </li>
//                   </ul>
//                 </div>
//                 <div>
//                   <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
//                     Resources
//                   </h4>
//                   <ul className="space-y-2">
//                     <li>
//                       <button className={`${darkMode ? 'text-gray-400 hover:text-teal-400' : 'text-gray-600 hover:text-teal-600'}`}>
//                         Career Guide
//                       </button>
//                     </li>
//                     <li>
//                       <button className={`${darkMode ? 'text-gray-400 hover:text-teal-400' : 'text-gray-600 hover:text-teal-600'}`}>
//                         Blog
//                       </button>
//                     </li>
//                   </ul>
//                 </div>
//                 <div>
//                   <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
//                     Legal
//                   </h4>
//                   <ul className="space-y-2">
//                     <li>
//                       <button className={`${darkMode ? 'text-gray-400 hover:text-teal-400' : 'text-gray-600 hover:text-teal-600'}`}>
//                         Privacy Policy
//                       </button>
//                     </li>
//                     <li>
//                       <button className={`${darkMode ? 'text-gray-400 hover:text-teal-400' : 'text-gray-600 hover:text-teal-600'}`}>
//                         Terms of Service
//                       </button>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//               <div className={`${darkMode ? 'border-gray-800' : 'border-gray-200'} border-t mt-8 pt-8 text-center`}>
//                 <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                   © 2026 COGNITRIAL. All rights reserved.
//                 </p>
//                 <p className={`${darkMode ? 'text-gray-500' : 'text-gray-500'} text-sm mt-2`}>
//                   150+ career paths • 500+ colleges • Updated for 2026
//                 </p>
//               </div>
//             </div>
//           </footer>
//         </>
//       )}

//       {/* Career Quiz Modal */}
//       {showQuiz && (
//         <CareerQuiz
//           onClose={() => setShowQuiz(false)}
//           darkMode={darkMode}
//           onComplete={(results) => {
//             console.log('Quiz results:', results);
//             trackQuizComplete();
//           }}
//         />
//       )}

//       {/* Career News Modal */}
//       {showNews && (
//         <div className={`fixed inset-0 z-50 overflow-y-auto ${darkMode ? 'bg-[#0f1419]' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50'
//           }`}>
//           <div className="max-w-7xl mx-auto px-4 py-8">
//             <div className="flex items-center justify-between mb-8">
//               <h2 className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//                 Career News & Updates
//               </h2>
//               <button
//                 onClick={() => setShowNews(false)}
//                 className={`p-2 rounded-xl transition-colors ${darkMode ? 'bg-[#1a1f2e] hover:bg-[#272757]' : 'bg-white hover:bg-gray-100'
//                   }`}
//               >
//                 <span className={`text-2xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>×</span>
//               </button>
//             </div>
//             <CareerNewsFeed darkMode={darkMode} />
//           </div>
//         </div>
//       )}

//       {/* Animations & Styles */}
//       {/* Career Chatbot */}
//       {showChatbot && (
//         <CareerChatbot
//           darkMode={darkMode}
//           onClose={() => setShowChatbot(false)}
//         />
//       )}

//       {/* Floating Chatbot Button */}
//       {!showChatbot && (
//         <button
//           onClick={() => setShowChatbot(true)}
//           className={`fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 ${darkMode
//             ? 'bg-gradient-to-r from-[#505081] to-[#8686AC]'
//             : 'bg-gradient-to-r from-indigo-600 to-blue-600'
//             } flex items-center justify-center group`}
//         >
//           {/* Pulse animation */}
//           <div className={`absolute inset-0 rounded-full animate-ping opacity-75 ${darkMode ? 'bg-[#505081]' : 'bg-indigo-600'
//             }`}></div>

//           {/* Icon */}
//           <div className="relative">
//             <svg
//               className="w-8 h-8 text-white transform group-hover:rotate-12 transition-transform"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
//               />
//             </svg>
//           </div>

//           {/* Notification badge */}
//           <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-bounce">
//             💬
//           </div>
//         </button>
//       )}

//       {/* Gamification Notifications */}
//       <LevelUpNotification darkMode={darkMode} />
//       <AchievementNotification darkMode={darkMode} />

//       {/* Gamification Dashboard */}
//       {showGamification && (
//         <GamificationDashboard
//           darkMode={darkMode}
//           onClose={() => setShowGamification(false)}
//         />
//       )}

//       {/* Career Comparison Modal */}
//       {showComparison && (
//         <CareerComparison
//           onClose={() => setShowComparison(false)}
//           darkMode={darkMode}
//           allCareers={getAllCareers()}
//         />
//       )}

//       {/* College Finder Modal */}
//       {showCollegeFinder && (
//         <CollegeFinder
//           onClose={() => setShowCollegeFinder(false)}
//           darkMode={darkMode}
//         />
//       )}

//       <style>{`
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         @keyframes slideUp {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes slideDown {
//           from { opacity: 0; transform: translateY(-10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-20px); }
//         }
//         @keyframes blob {
//           0%, 100% { transform: translate(0px, 0px) scale(1); }
//           33% { transform: translate(30px, -50px) scale(1.1); }
//           66% { transform: translate(-20px, 20px) scale(0.9); }
//         }
//         @keyframes shimmer {
//           0% { background-position: -1000px 0; }
//           100% { background-position: 1000px 0; }
//         }
//         @keyframes spin-slow {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//         @keyframes ping-slow {
//           0% { transform: scale(0.95); opacity: 1; }
//           50% { transform: scale(1.05); opacity: 0.5; }
//           100% { transform: scale(0.95); opacity: 0; }
//         }
//         @keyframes pulse-glow {
//           0%, 100% { 
//             filter: drop-shadow(0 0 8px rgba(251, 191, 36, 0.5));
//             transform: scale(1);
//           }
//           50% { 
//             filter: drop-shadow(0 0 20px rgba(251, 191, 36, 0.8));
//             transform: scale(1.05);
//           }
//         }
//         @keyframes gradient-x {
//           0%, 100% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//         }
//         @keyframes bounce-in {
//           0% { transform: scale(0); opacity: 0; }
//           50% { transform: scale(1.1); }
//           100% { transform: scale(1); opacity: 1; }
//         }
//         @keyframes slide-in-right {
//           from { transform: translateX(100%); opacity: 0; }
//           to { transform: translateX(0); opacity: 1; }
//         }

//         .animate-fadeIn { animation: fadeIn 0.8s ease-out; }
//         .animate-slideUp { animation: slideUp 0.6s ease-out; }
//         .animate-slideDown { animation: slideDown 0.3s ease-out; }
//         .animate-float { animation: float 6s ease-in-out infinite; }
//         .animate-blob { animation: blob 7s ease-in-out infinite; }
//         .animate-ping-slow { animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite; }
//         .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
//         .animate-gradient-x { 
//           background-size: 200% 200%;
//           animation: gradient-x 3s ease infinite; 
//         }
//         .animate-bounce-in { animation: bounce-in 0.5s ease-out; }
//         .animate-slide-in-right { animation: slide-in-right 0.4s ease-out; }

//         .animate-shimmer {
//           background-size: 1000px 100%;
//           animation: shimmer 2s infinite;
//         }
//         .animate-spin-slow { animation: spin-slow 3s linear infinite; }

//         .animation-delay-200 { animation-delay: 0.2s; }
//         .animation-delay-400 { animation-delay: 0.4s; }
//         .animation-delay-500 { animation-delay: 0.5s; }
//         .animation-delay-1000 { animation-delay: 1s; }
//         .animation-delay-1500 { animation-delay: 1.5s; }
//         .animation-delay-2000 { animation-delay: 2s; }
//         .animation-delay-3000 { animation-delay: 3s; }
//         .animation-delay-4000 { animation-delay: 4s; }

//         .bg-grid-pattern {
//           background-image: 
//             linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px);
//           background-size: 50px 50px;
//         }

//         .hover-lift {
//           transition: transform 0.3s ease, box-shadow 0.3s ease;
//         }
//         .hover-lift:hover {
//           transform: translateY(-5px);
//           box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
//         }
//       `}</style>
//     </div>
//   );
// }

// export default App;



























import React, { useState, useEffect } from 'react';
import { Lightbulb, ChevronRight, Sparkles } from 'lucide-react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import WhyChooseSection from './components/WhyChooseSection';
import CareerCard from './components/CareerCard';
import CareerDetailModal from './components/CareerDetailModal';
import ProfilePage from './components/ProfilePage';
import CareerQuiz from './components/Careerquiz';
import CareerNewsFeed from './components/CareerNewsFeed';
import CareerChatbot from './components/CareerChatbot';
import CareerComparison from './components/CareerComparison';
import CollegeFinder from './components/CollegeFinder';
import SkillsGapAnalyzer from './components/SkillsGapAnalyzer';
import CareerRoadmapBuilder from './components/CareerRoadmapBuilder';
import CustomScrollbar from './components/CustomScrollbar';
import { LevelUpNotification, AchievementNotification, GamificationDashboard } from './components/GamificationComponents';
import { useGamification } from './contexts/GamificationContext';
import { CAREER_DATABASE } from './data/careerDatabase';

function App() {
  // Gamification Hook
  const { trackCareerExplored, trackCareerSaved, trackQuizComplete } = useGamification();

  // State Management
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [selectedSubField, setSelectedSubField] = useState(null);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [savedCareers, setSavedCareers] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showNews, setShowNews] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showGamification, setShowGamification] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [showCollegeFinder, setShowCollegeFinder] = useState(false);
  const [showSkillsAnalyzer, setShowSkillsAnalyzer] = useState(false);
  const [showRoadmapBuilder, setShowRoadmapBuilder] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "Guest User",
    email: "user@cognitrial.com",
    grade: "10th Passed",
    interests: ["Technology", "Science"],
    location: "India",
    profileComplete: 45
  });

  // Effects
  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Functions
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Filter domains based on search
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

  // Get all careers for comparison
  const getAllCareers = () => {
    const careers = [];
    Object.values(CAREER_DATABASE).forEach(domain => {
      domain.subFields.forEach(subField => {
        careers.push(...subField.careers);
      });
    });
    return careers;
  };

  // Welcome Screen
  if (showWelcome) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f1419] via-[#1a1f3a] to-[#0f1419]">
          {/* Animated gradient orbs */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-teal-600/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-600/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-3000"></div>

          {/* Grid overlay */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

          {/* Floating particles */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-indigo-400 rounded-full animate-float"></div>
            <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-blue-400 rounded-full animate-float animation-delay-1000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-teal-400 rounded-full animate-float animation-delay-2000"></div>
            <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-float animation-delay-3000"></div>
            <div className="absolute bottom-1/3 right-1/4 w-2.5 h-2.5 bg-purple-400 rounded-full animate-float animation-delay-1500"></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center animate-fadeIn">
          {/* Logo with glow effect */}
          <div className="mb-8 relative inline-block">
            {/* Outer glow rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 rounded-full bg-gradient-to-r from-indigo-500/20 to-blue-500/20 animate-ping-slow"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center animation-delay-1000">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500/30 to-teal-500/30 animate-ping-slow"></div>
            </div>

            {/* Main icon container */}
            <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
              {/* Rotating gradient border */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-blue-500 to-teal-500 animate-spin-slow"></div>
              <div className="absolute inset-1 rounded-full bg-[#0f1419]"></div>

              {/* Icon */}
              <div className="relative z-10">
                <Lightbulb className="w-16 h-16 text-yellow-400 animate-pulse-glow" />
              </div>
            </div>
          </div>

          {/* Title with gradient text */}
          <h1 className="text-7xl font-black mb-4 tracking-tight animate-slideUp">
            <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-teal-400 bg-clip-text text-transparent animate-gradient-x">
              COGNITRIAL
            </span>
          </h1>

          {/* Subtitle with typewriter effect */}
          <div className="h-8 mb-8">
            <p className="text-2xl text-gray-300 font-light animate-fadeIn animation-delay-500">
              Your Intelligent Career Pathfinder
            </p>
          </div>

          {/* Feature badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8 animate-fadeIn animation-delay-1000">
            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600/20 to-indigo-600/10 border border-indigo-500/30 backdrop-blur-sm">
              <span className="text-indigo-300 text-sm font-semibold">150+ Careers</span>
            </div>
            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/20 to-blue-600/10 border border-blue-500/30 backdrop-blur-sm">
              <span className="text-blue-300 text-sm font-semibold">AI-Powered</span>
            </div>
            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-teal-600/20 to-teal-600/10 border border-teal-500/30 backdrop-blur-sm">
              <span className="text-teal-300 text-sm font-semibold">Real-time Updates</span>
            </div>
          </div>

          {/* Loading indicator */}
          <div className="flex justify-center items-center gap-2 animate-fadeIn animation-delay-1500">
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce"></div>
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce animation-delay-200"></div>
            <div className="w-2 h-2 rounded-full bg-teal-500 animate-bounce animation-delay-400"></div>
          </div>

          {/* Bottom tagline */}
          <div className="mt-12 animate-fadeIn animation-delay-2000">
            <p className="text-gray-400 text-sm">
              Think Smart. Choose Right. Grow Ahead.
            </p>
          </div>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-indigo-500/20 rounded-tl-3xl"></div>
        <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-blue-500/20 rounded-tr-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-teal-500/20 rounded-bl-3xl"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-cyan-500/20 rounded-br-3xl"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#0f1419]' : 'bg-gradient-to-br from-slate-50 to-teal-50'}`}>
      {/* Custom Scrollbar Component */}
      <CustomScrollbar darkMode={darkMode} />

      {/* Profile Page */}
      {showProfile && (
        <ProfilePage
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          onClose={() => setShowProfile(false)}
          darkMode={darkMode}
          savedCareers={savedCareers}
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
            userProfile={userProfile}
            setShowProfile={setShowProfile}
            setShowGamification={setShowGamification}
            setShowComparison={setShowComparison}
            setShowCollegeFinder={setShowCollegeFinder}
          />

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 py-8 pb-32">
            {!selectedDomain ? (
              // Home Page with Hero and Domains
              <div>
                <HeroSection darkMode={darkMode} />

                {/* Feature Shortcuts */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                  {/* Career Quiz Card */}
                  <button
                    onClick={() => setShowQuiz(true)}
                    className={`group relative rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 text-left overflow-hidden ${darkMode
                      ? 'bg-gradient-to-br from-[#272757] to-[#505081] border border-[#8686AC]/30'
                      : 'bg-gradient-to-br from-indigo-500 to-blue-600 border border-indigo-300'
                      }`}
                  >
                    {/* Sparkle animation */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Sparkles className="w-6 h-6 text-white animate-pulse" />
                    </div>

                    <div className="relative z-10">
                      <div className="text-6xl mb-4">🎯</div>
                      <h3 className="text-2xl font-black text-white mb-2">
                        Take Career Quiz
                      </h3>
                      <p className="text-white/80 mb-4">
                        AI-powered recommendations based on your interests
                      </p>
                      <div className="flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all">
                        <span>Start Quiz</span>
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>

                  {/* Career News Card */}
                  <button
                    onClick={() => setShowNews(true)}
                    className={`group relative rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 text-left overflow-hidden ${darkMode
                      ? 'bg-gradient-to-br from-[#505081] to-[#8686AC] border border-[#8686AC]/30'
                      : 'bg-gradient-to-br from-purple-500 to-pink-600 border border-purple-300'
                      }`}
                  >
                    {/* Sparkle animation */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Sparkles className="w-6 h-6 text-white animate-pulse" />
                    </div>

                    <div className="relative z-10">
                      <div className="text-6xl mb-4">📰</div>
                      <h3 className="text-2xl font-black text-white mb-2">
                        Latest Career News
                      </h3>
                      <p className="text-white/80 mb-4">
                        Stay updated with exams, scholarships, and trends
                      </p>
                      <div className="flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all">
                        <span>View News</span>
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>

                  {/* Compare Careers Card */}
                  <button
                    onClick={() => setShowComparison(true)}
                    className={`group relative rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 text-left overflow-hidden ${darkMode
                      ? 'bg-gradient-to-br from-[#3d3d6b] to-[#6b6b9e] border border-[#6b6b9e]/30'
                      : 'bg-gradient-to-br from-blue-500 to-indigo-600 border border-blue-300'
                      }`}
                  >
                    {/* Sparkle animation */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Sparkles className="w-6 h-6 text-white animate-pulse" />
                    </div>

                    <div className="relative z-10">
                      <div className="text-6xl mb-4">⚖️</div>
                      <h3 className="text-2xl font-black text-white mb-2">
                        Compare Careers
                      </h3>
                      <p className="text-white/80 mb-4">
                        Side-by-side comparison of salary, skills, outlook
                      </p>
                      <div className="flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all">
                        <span>Start Comparing</span>
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>

                  {/* AI Skills Gap Analyzer Card */}
                  <button
                    onClick={() => setShowSkillsAnalyzer(true)}
                    className={`group relative rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 text-left overflow-hidden ${darkMode
                      ? 'bg-gradient-to-br from-[#2d3d5a] to-[#4a6b9e] border border-[#4a6b9e]/30'
                      : 'bg-gradient-to-br from-cyan-500 to-blue-600 border border-cyan-300'
                      }`}
                  >
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Sparkles className="w-6 h-6 text-white animate-pulse" />
                    </div>

                    <div className="relative z-10">
                      <div className="text-6xl mb-4">🎯</div>
                      <h3 className="text-2xl font-black text-white mb-2">
                        Skills Gap Analyzer
                      </h3>
                      <p className="text-white/80 mb-4">
                        AI-powered skill analysis & learning roadmap
                      </p>
                      <div className="flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all">
                        <span>Analyze Now</span>
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>

                  {/* Career Roadmap Builder Card */}
                  <button
                    onClick={() => setShowRoadmapBuilder(true)}
                    className={`group relative rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 text-left overflow-hidden ${darkMode
                      ? 'bg-gradient-to-br from-[#4a2d5a] to-[#7c4a9e] border border-[#7c4a9e]/30'
                      : 'bg-gradient-to-br from-violet-500 to-purple-600 border border-violet-300'
                      }`}
                  >
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Sparkles className="w-6 h-6 text-white animate-pulse" />
                    </div>

                    <div className="relative z-10">
                      <div className="text-6xl mb-4">🗺️</div>
                      <h3 className="text-2xl font-black text-white mb-2">
                        Roadmap Builder
                      </h3>
                      <p className="text-white/80 mb-4">
                        Build your step-by-step career journey
                      </p>
                      <div className="flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all">
                        <span>Start Building</span>
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>

                <WhyChooseSection darkMode={darkMode} />

                {/* Domain Selection */}
                <div id="domains">
                  <div className="text-center mb-12">
                    <h2 className={`text-4xl font-black ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>
                      {searchQuery ? `Search Results for "${searchQuery}"` : 'Explore Career Domains'}
                    </h2>
                    <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {searchQuery
                        ? `Found ${filteredDomains.length} domain${filteredDomains.length !== 1 ? 's' : ''} matching your search`
                        : 'Choose your area of interest to discover career paths'
                      }
                    </p>
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className={`mt-4 px-4 py-2 rounded-xl font-semibold transition-colors ${darkMode
                          ? 'bg-[#272757] hover:bg-[#505081] text-white'
                          : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-700'
                          }`}
                      >
                        ✕ Clear Search
                      </button>
                    )}
                  </div>

                  {filteredDomains.length === 0 ? (
                    /* No Results Found */
                    <div className={`text-center py-16 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <div className="text-6xl mb-4">🔍</div>
                      <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        No results found
                      </h3>
                      <p className="mb-6">
                        We couldn't find any careers matching "{searchQuery}"
                      </p>
                      <button
                        onClick={() => setSearchQuery('')}
                        className={`px-6 py-3 rounded-xl font-bold ${darkMode
                          ? 'bg-gradient-to-r from-[#505081] to-[#8686AC] hover:from-[#8686AC] hover:to-[#505081] text-white'
                          : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white'
                          }`}
                      >
                        View All Careers
                      </button>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredDomains.map(([key, domain]) => (
                        <button
                          key={key}
                          onClick={() => setSelectedDomain(key)}
                          className={`group relative ${darkMode ? 'bg-[#1a1f2e] border-[#272757] hover:border-[#505081]' : 'bg-white border-indigo-100 hover:border-indigo-300'} rounded-2xl p-8 border-2 transition-all duration-300 text-left overflow-hidden hover:shadow-2xl hover:-translate-y-1`}
                        >
                          {/* Animated gradient overlay on hover */}
                          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${darkMode
                            ? 'bg-gradient-to-br from-[#272757]/5 via-transparent to-[#505081]/10'
                            : 'bg-gradient-to-br from-indigo-50/50 via-transparent to-blue-50/50'
                            }`}></div>

                          {/* Sparkle particles on hover */}
                          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <div className="relative">
                              <Sparkles className={`w-5 h-5 ${darkMode ? 'text-[#8686AC]' : 'text-indigo-400'} animate-pulse`} />
                              <div className="absolute inset-0 blur-md opacity-75">
                                <Sparkles className={`w-5 h-5 ${darkMode ? 'text-[#8686AC]' : 'text-indigo-400'}`} />
                              </div>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="relative z-10">
                            {/* Icon with gradient background */}
                            <div className={`mb-6 inline-flex items-center justify-center w-20 h-20 rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${darkMode
                              ? 'bg-gradient-to-br from-[#272757] to-[#505081] group-hover:shadow-lg group-hover:shadow-[#505081]/50'
                              : 'bg-gradient-to-br from-indigo-100 to-blue-100 group-hover:shadow-lg group-hover:shadow-indigo-200'
                              }`}>
                              <span className="text-5xl filter drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300">{domain.icon}</span>
                            </div>

                            {/* Title */}
                            <h3 className={`text-2xl font-bold mb-3 transition-all duration-300 ${darkMode
                              ? 'text-white group-hover:text-[#8686AC]'
                              : 'text-gray-900 group-hover:text-indigo-600'
                              }`}>
                              {domain.name}
                            </h3>

                            {/* Subtitle */}
                            <p className={`text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {domain.subFields.length} specialized fields
                            </p>

                            {/* Explore Button */}
                            <div className={`flex items-center gap-2 font-semibold group-hover:gap-3 transition-all duration-300 ${darkMode ? 'text-[#8686AC]' : 'text-indigo-600'
                              }`}>
                              <span>Explore</span>
                              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </div>
                          </div>

                          {/* Bottom glow accent */}
                          <div className={`absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${darkMode
                            ? 'bg-gradient-to-r from-transparent via-[#505081] to-transparent'
                            : 'bg-gradient-to-r from-transparent via-indigo-400 to-transparent'
                            }`}></div>

                          {/* Corner sparkle effects */}
                          <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-[#8686AC] opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
                          <div className="absolute top-4 left-4 w-1 h-1 rounded-full bg-[#505081] opacity-0 group-hover:opacity-100 group-hover:animate-ping animation-delay-200"></div>
                        </button>
                      ))}
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
                    className={`${darkMode ? 'text-teal-400 hover:text-teal-300' : 'text-teal-600 hover:text-teal-700'} font-semibold flex items-center gap-2`}
                  >
                    ← Back to Domains
                  </button>
                </div>

                <div className="text-center mb-12">
                  <h2 className={`text-4xl font-black ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>
                    {CAREER_DATABASE[selectedDomain].name}
                  </h2>
                  <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Select a specialized field
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {CAREER_DATABASE[selectedDomain].subFields.map((subField) => (
                    <button
                      key={subField.id}
                      onClick={() => setSelectedSubField(subField)}
                      className={`group relative ${darkMode ? 'bg-[#1a1f2e] border-gray-800 hover:border-cyan-500' : 'bg-white border-gray-200 hover:border-cyan-400'} rounded-2xl p-6 border-2 transition-all duration-300 text-left overflow-hidden`}
                    >
                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div className="relative z-10">
                        <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2 group-hover:text-cyan-400 transition-colors`}>
                          {subField.name}
                        </h3>
                        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4 leading-relaxed`}>
                          {subField.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                            {subField.careers.length} career options
                          </span>
                          <ChevronRight className={`w-5 h-5 text-orange-500 group-hover:translate-x-1 transition-all`} />
                        </div>
                      </div>

                      {/* Bottom Border Accent */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              // Career Listing
              <div className={`pb-20 rounded-3xl ${darkMode ? 'bg-[#0f1419]' : 'bg-gradient-to-br from-slate-50 to-teal-50'}`}>
                <div className="mb-6 flex items-center gap-4">
                  <button
                    onClick={() => setSelectedSubField(null)}
                    className={`${darkMode ? 'text-teal-400 hover:text-teal-300' : 'text-teal-600 hover:text-teal-700'} font-semibold flex items-center gap-2`}
                  >
                    ← Back to Fields
                  </button>
                </div>

                <div className="text-center mb-12">
                  <h2 className={`text-4xl font-black ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>
                    {selectedSubField.name}
                  </h2>
                  <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {selectedSubField.description}
                  </p>
                  <p className={`text-lg ${darkMode ? 'text-gray-500' : 'text-gray-500'} mt-2`}>
                    {selectedSubField.careers.length} career paths available
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {selectedSubField.careers.map((career, idx) => (
                    <CareerCard
                      key={idx}
                      career={career}
                      onSelect={(career) => {
                        setSelectedCareer(career);
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
          <footer className={`${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-t mt-20`}>
            <div className="max-w-7xl mx-auto px-4 py-12">
              <div className="grid md:grid-cols-4 gap-8">
                <div>
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                    COGNITRIAL
                  </h3>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                    Think Smart. Choose Right. Grow Ahead.
                  </p>
                </div>
                <div>
                  <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                    Quick Links
                  </h4>
                  <ul className="space-y-2">
                    <li>
                      <button className={`${darkMode ? 'text-gray-400 hover:text-teal-400' : 'text-gray-600 hover:text-teal-600'}`}>
                        About Us
                      </button>
                    </li>
                    <li>
                      <button className={`${darkMode ? 'text-gray-400 hover:text-teal-400' : 'text-gray-600 hover:text-teal-600'}`}>
                        Contact
                      </button>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                    Resources
                  </h4>
                  <ul className="space-y-2">
                    <li>
                      <button className={`${darkMode ? 'text-gray-400 hover:text-teal-400' : 'text-gray-600 hover:text-teal-600'}`}>
                        Career Guide
                      </button>
                    </li>
                    <li>
                      <button className={`${darkMode ? 'text-gray-400 hover:text-teal-400' : 'text-gray-600 hover:text-teal-600'}`}>
                        Blog
                      </button>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                    Legal
                  </h4>
                  <ul className="space-y-2">
                    <li>
                      <button className={`${darkMode ? 'text-gray-400 hover:text-teal-400' : 'text-gray-600 hover:text-teal-600'}`}>
                        Privacy Policy
                      </button>
                    </li>
                    <li>
                      <button className={`${darkMode ? 'text-gray-400 hover:text-teal-400' : 'text-gray-600 hover:text-teal-600'}`}>
                        Terms of Service
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={`${darkMode ? 'border-gray-800' : 'border-gray-200'} border-t mt-8 pt-8 text-center`}>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  © 2026 COGNITRIAL. All rights reserved.
                </p>
                <p className={`${darkMode ? 'text-gray-500' : 'text-gray-500'} text-sm mt-2`}>
                  150+ career paths • 500+ colleges • Updated for 2026
                </p>
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
          onComplete={(results) => {
            console.log('Quiz results:', results);
            trackQuizComplete();
          }}
        />
      )}

      {/* Career News Modal */}
      {showNews && (
        <div className={`fixed inset-0 z-50 overflow-y-auto ${darkMode ? 'bg-[#0f1419]' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50'
          }`}>
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Career News & Updates
              </h2>
              <button
                onClick={() => setShowNews(false)}
                className={`p-2 rounded-xl transition-colors ${darkMode ? 'bg-[#1a1f2e] hover:bg-[#272757]' : 'bg-white hover:bg-gray-100'
                  }`}
              >
                <span className={`text-2xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>×</span>
              </button>
            </div>
            <CareerNewsFeed darkMode={darkMode} />
          </div>
        </div>
      )}

      {/* Animations & Styles */}
      {/* Career Chatbot */}
      {showChatbot && (
        <CareerChatbot
          darkMode={darkMode}
          onClose={() => setShowChatbot(false)}
        />
      )}

      {/* Floating Chatbot Button */}
      {!showChatbot && (
        <button
          onClick={() => setShowChatbot(true)}
          className={`fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 ${darkMode
            ? 'bg-gradient-to-r from-[#505081] to-[#8686AC]'
            : 'bg-gradient-to-r from-indigo-600 to-blue-600'
            } flex items-center justify-center group`}
        >
          {/* Pulse animation */}
          <div className={`absolute inset-0 rounded-full animate-ping opacity-75 ${darkMode ? 'bg-[#505081]' : 'bg-indigo-600'
            }`}></div>

          {/* Icon */}
          <div className="relative">
            <svg
              className="w-8 h-8 text-white transform group-hover:rotate-12 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>

          {/* Notification badge */}
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-bounce">
            💬
          </div>
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

      <style>{`
        /* Custom Scrollbar with Auto-Hide Effect */
        ::-webkit-scrollbar {
          width: 12px;
          height: 12px;
        }
        
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #6366f1, #8b5cf6);
          border-radius: 10px;
          border: 2px solid transparent;
          background-clip: padding-box;
          transition: all 0.3s ease;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #4f46e5, #7c3aed);
          border: 2px solid transparent;
          background-clip: padding-box;
        }
        
        /* Auto-hide scrollbar - only show on hover */
        * {
          scrollbar-width: thin;
          scrollbar-color: #8b5cf6 transparent;
        }
        
        body:not(:hover)::-webkit-scrollbar-thumb {
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        /* Smooth scrollbar appearance */
        html {
          scroll-behavior: smooth;
        }
        
        /* Dark mode scrollbar */
        .dark ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #505081, #8686AC);
        }
        
        .dark ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #8686AC, #505081);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes ping-slow {
          0% { transform: scale(0.95); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.5; }
          100% { transform: scale(0.95); opacity: 0; }
        }
        @keyframes pulse-glow {
          0%, 100% { 
            filter: drop-shadow(0 0 8px rgba(251, 191, 36, 0.5));
            transform: scale(1);
          }
          50% { 
            filter: drop-shadow(0 0 20px rgba(251, 191, 36, 0.8));
            transform: scale(1.05);
          }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes bounce-in {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes slide-in-right {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        .animate-fadeIn { animation: fadeIn 0.8s ease-out; }
        .animate-slideUp { animation: slideUp 0.6s ease-out; }
        .animate-slideDown { animation: slideDown 0.3s ease-out; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-blob { animation: blob 7s ease-in-out infinite; }
        .animate-ping-slow { animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-gradient-x { 
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite; 
        }
        .animate-bounce-in { animation: bounce-in 0.5s ease-out; }
        .animate-slide-in-right { animation: slide-in-right 0.4s ease-out; }
        
        .animate-shimmer {
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-1500 { animation-delay: 1.5s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-3000 { animation-delay: 3s; }
        .animation-delay-4000 { animation-delay: 4s; }
        
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
      `}</style>
    </div>
  );
}

export default App;