import React, { useState, useMemo, useEffect } from 'react';
import { 
  X, Plus, Trash2, DollarSign, GraduationCap, TrendingUp, Clock, Award, 
  Target, CheckCircle2, Sparkles, ChevronRight, HelpCircle, Layers, 
  AlertCircle, ArrowRight, ShieldCheck, Zap
} from 'lucide-react';
import { CAREER_DATABASE } from '../data/careerDatabase';

const CareerComparison = ({ onClose, darkMode, allCareers }) => {
  // Keyboard Escape key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Extract all careers from database if not passed
  const availableCareers = useMemo(() => {
    if (allCareers && Array.isArray(allCareers) && allCareers.length > 0) {
      return allCareers;
    }
    const list = [];
    if (!CAREER_DATABASE) return list;
    Object.entries(CAREER_DATABASE).forEach(([domainKey, domain]) => {
      if (domain.subFields) {
        domain.subFields.forEach(subField => {
          if (subField.careers) {
            subField.careers.forEach(career => {
              if (career && career.name && !list.some(c => c.name === career.name)) {
                list.push({
                  ...career,
                  domainKey,
                  domainName: domain.name
                });
              }
            });
          }
        });
      }
    });
    return list;
  }, [allCareers]);

  // Default pre-selected careers (up to 3)
  const [selectedCareers, setSelectedCareers] = useState(() => {
    return availableCareers.slice(0, 2);
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [userInterestFocus, setUserInterestFocus] = useState('balanced'); // 'salary', 'speed', 'balance', 'growth', 'balanced'

  // Add career to comparison (Max 3, no duplicates)
  const addCareer = (career) => {
    if (selectedCareers.length < 3 && !selectedCareers.some(c => c.name === career.name)) {
      setSelectedCareers([...selectedCareers, career]);
      setSearchQuery('');
    }
  };

  // Remove career
  const removeCareer = (careerName) => {
    setSelectedCareers(selectedCareers.filter(c => c.name !== careerName));
  };

  // Clear all
  const clearAll = () => {
    setSelectedCareers([]);
  };

  // Filter careers for search (excluding already selected careers)
  const filteredSearchList = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return [];
    return availableCareers
      .filter(c => 
        !selectedCareers.some(sc => sc.name === c.name) &&
        (c.name.toLowerCase().includes(q) || (c.domainName || '').toLowerCase().includes(q))
      )
      .slice(0, 8);
  }, [availableCareers, selectedCareers, searchQuery]);

  // Comparative AI Analysis Engine
  const comparisonAnalysis = useMemo(() => {
    if (selectedCareers.length < 2) return null;

    // Evaluate earning ceiling
    let highestEarner = selectedCareers[0];
    let fastestRoute = selectedCareers[0];
    let mostFlexible = selectedCareers[0];

    selectedCareers.forEach(c => {
      const sal = (c.salaryRange || '').toLowerCase();
      if (sal.includes('cr') || sal.includes('80 lpa') || sal.includes('55 lpa') || sal.includes('45 lpa')) {
        highestEarner = c;
      }
      const edu = (c.education || '').toLowerCase();
      if (edu.includes('3 years') || edu.includes('b.sc') || edu.includes('b.com') || edu.includes('b.des') || edu.includes('bootcamp')) {
        fastestRoute = c;
      }
      const env = (c.workEnvironment || c.name || '').toLowerCase();
      if (env.includes('remote') || env.includes('software') || env.includes('design') || env.includes('writer')) {
        mostFlexible = c;
      }
    });

    return {
      highestEarner,
      fastestRoute,
      mostFlexible
    };
  }, [selectedCareers]);

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-label="Compare Careers"
      className={`fixed inset-0 z-50 overflow-y-auto ${darkMode ? 'bg-[#09090b]' : 'bg-zinc-50'}`}
    >
      <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-2 border ${
              darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-200' : 'bg-zinc-200 border-zinc-300 text-black'
            }`}>
              <Sparkles className="w-3.5 h-3.5" />
              Side-by-Side Career Intelligence Matrix
            </div>
            <h2 className={`text-2xl sm:text-3xl font-black ${darkMode ? 'text-white' : 'text-black'}`}>
              Compare Careers (Up to 3) ⚖️
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {selectedCareers.length > 0 && (
              <button
                onClick={clearAll}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border btn-interactive cursor-pointer ${
                  darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-white' : 'bg-white border-zinc-300 text-zinc-700 hover:text-black'
                }`}
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className={`p-2.5 rounded-xl border btn-interactive hover-lift cursor-pointer ${
                darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-white' : 'bg-white border-zinc-200 text-zinc-700 hover:text-black'
              }`}
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Add Career Bar (if under 3) */}
        {selectedCareers.length < 3 && (
          <div className={`p-5 rounded-3xl border mb-8 ${
            darkMode ? 'bg-[#121215] border-zinc-800 shadow-xl' : 'bg-white border-zinc-200 shadow-md'
          }`}>
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-zinc-400" />
                <span className={`text-sm font-black ${darkMode ? 'text-white' : 'text-black'}`}>
                  Add Career to Compare
                </span>
              </div>
              <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-300' : 'bg-zinc-100 border-zinc-300 text-black'
              }`}>
                {selectedCareers.length} of 3 Selected
              </span>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search career by name to add (e.g. Data Scientist, MBBS Doctor, Architect)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full px-4 py-3 rounded-2xl border text-sm outline-none transition-colors ${
                  darkMode
                    ? 'bg-[#18181b] border-zinc-700 text-white placeholder-zinc-500 focus:border-white'
                    : 'bg-zinc-50 border-zinc-300 text-black placeholder-zinc-400 focus:border-black'
                }`}
              />

              {/* Autocomplete Dropdown */}
              {searchQuery && filteredSearchList.length > 0 && (
                <div className={`absolute left-0 right-0 top-full mt-2 rounded-2xl border shadow-2xl z-30 overflow-hidden ${
                  darkMode ? 'bg-[#18181b] border-zinc-700' : 'bg-white border-zinc-300'
                }`}>
                  {filteredSearchList.map((career) => (
                    <button
                      key={career.name}
                      onClick={() => addCareer(career)}
                      className={`w-full px-4 py-3 text-left text-sm font-bold flex items-center justify-between border-b last:border-b-0 cursor-pointer transition-colors ${
                        darkMode ? 'hover:bg-zinc-800 text-white border-zinc-800' : 'hover:bg-zinc-100 text-black border-zinc-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span>{career.icon || '💼'}</span>
                        <span>{career.name}</span>
                        <span className="text-xs text-zinc-400 font-normal">({career.domainName || 'Career'})</span>
                      </div>
                      <Plus className="w-4 h-4 text-zinc-400" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick-add Trending suggestions */}
            <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
              <span className={`font-semibold ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>Quick Add:</span>
              {availableCareers
                .filter(c => !selectedCareers.some(sc => sc.name === c.name))
                .slice(0, 5)
                .map((career) => (
                  <button
                    key={career.name}
                    onClick={() => addCareer(career)}
                    className={`px-2.5 py-1 rounded-xl border font-semibold transition-all hover:scale-105 cursor-pointer ${
                      darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white' : 'bg-zinc-100 border-zinc-200 text-zinc-700 hover:text-black'
                    }`}
                  >
                    + {career.name}
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* ================= COMPARISON MATRIX ================= */}
        {selectedCareers.length > 0 ? (
          <div className="space-y-8">
            
            {/* Responsive Table / Card Container */}
            <div className={`rounded-3xl border overflow-hidden shadow-2xl ${
              darkMode ? 'bg-[#121215] border-zinc-800' : 'bg-white border-zinc-200'
            }`}>
              
              {/* Career Top Headers */}
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x border-b border-zinc-200 dark:border-zinc-800">
                {selectedCareers.map((career) => (
                  <div key={career.name} className="p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-3xl">{career.icon || '💼'}</span>
                        <button
                          onClick={() => removeCareer(career.name)}
                          className={`p-1.5 rounded-lg border text-xs btn-interactive cursor-pointer ${
                            darkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-red-400' : 'bg-zinc-100 border-zinc-300 text-zinc-600 hover:text-red-600'
                          }`}
                          title="Remove career"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <h3 className={`text-xl font-black mb-1 ${darkMode ? 'text-white' : 'text-black'}`}>
                        {career.name}
                      </h3>
                      <p className={`text-xs leading-relaxed line-clamp-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        {career.description || 'Specialized career pathway with strong industry placement.'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Metric 1: Salary & Compensation */}
              <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2 mb-3 text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                  <DollarSign className="w-4 h-4" />
                  <span>ANNUAL COMPENSATION SPECTRUM</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedCareers.map((career) => (
                    <div key={career.name} className={`p-4 rounded-2xl border ${
                      darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                    }`}>
                      <div className={`text-sm font-black ${darkMode ? 'text-white' : 'text-black'} leading-snug`}>
                        {career.salaryRange || '₹6 - 25 LPA+'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metric 2: Education Pathway & Duration */}
              <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2 mb-3 text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                  <GraduationCap className="w-4 h-4" />
                  <span>EDUCATION PATHWAY & DEGREE REQUIREMENTS</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedCareers.map((career) => (
                    <div key={career.name} className={`p-4 rounded-2xl border ${
                      darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                    }`}>
                      <div className={`text-xs font-bold ${darkMode ? 'text-zinc-200' : 'text-zinc-900'} mb-1.5`}>
                        {career.education || 'Bachelor Degree (3-4 years)'}
                      </div>
                      {career.entranceExams && career.entranceExams.length > 0 && (
                        <div className="text-[11px] text-zinc-400">
                          Exams: <span className="text-black dark:text-white font-semibold">{career.entranceExams.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Metric 3: Industry Demand & Job Outlook */}
              <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2 mb-3 text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                  <TrendingUp className="w-4 h-4" />
                  <span>GROWTH OUTLOOK & MARKET TRAJECTORY</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedCareers.map((career) => (
                    <div key={career.name} className={`p-4 rounded-2xl border ${
                      darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                    }`}>
                      <div className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
                        {career.jobOutlook || 'High Demand - Rapid Expansion'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metric 4: Core In-Demand Skills */}
              <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2 mb-3 text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                  <Award className="w-4 h-4" />
                  <span>CORE REQUIRED SKILLS</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedCareers.map((career) => (
                    <div key={career.name} className={`p-4 rounded-2xl border ${
                      darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                    }`}>
                      <div className="flex flex-wrap gap-1.5">
                        {(career.skills || ['Critical Thinking', 'Problem Solving', 'Communication']).slice(0, 5).map((skill, sidx) => (
                          <span key={sidx} className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold border ${
                            darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-300' : 'bg-white border-zinc-300 text-black shadow-sm'
                          }`}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ================= WHICH CAREER IS BETTER SUITED TO MY INTERESTS? ================= */}
            {selectedCareers.length >= 2 && comparisonAnalysis && (
              <div className={`p-6 sm:p-8 rounded-3xl border animate-fade-in ${
                darkMode ? 'bg-[#121215] border-zinc-800' : 'bg-white border-zinc-200 shadow-xl'
              }`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2.5 rounded-2xl border ${
                    darkMode ? 'bg-white text-black' : 'bg-black text-white'
                  }`}>
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className={`text-xl font-black ${darkMode ? 'text-white' : 'text-black'}`}>
                      Which career is better suited to your interests?
                    </h4>
                    <p className="text-xs text-zinc-400">
                      Comparative algorithmic breakdown across earnings, time-to-market, and lifestyle fit
                    </p>
                  </div>
                </div>

                {/* Comparative Verdict Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  {/* Verdict 1: Top Compensation Ceiling */}
                  <div className={`p-5 rounded-2xl border ${
                    darkMode ? 'bg-zinc-900/70 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                  }`}>
                    <div className="text-[10px] font-mono font-bold uppercase text-zinc-400 mb-1">
                      TOP SALARY CEILING
                    </div>
                    <div className={`text-base font-black ${darkMode ? 'text-white' : 'text-black'} mb-1`}>
                      {comparisonAnalysis.highestEarner.name}
                    </div>
                    <p className="text-xs text-zinc-400">
                      Offers highest long-term remuneration potential ({comparisonAnalysis.highestEarner.salaryRange?.split('|')[0] || '₹14-50 LPA+'}).
                    </p>
                  </div>

                  {/* Verdict 2: Fastest Route */}
                  <div className={`p-5 rounded-2xl border ${
                    darkMode ? 'bg-zinc-900/70 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                  }`}>
                    <div className="text-[10px] font-mono font-bold uppercase text-zinc-400 mb-1">
                      FASTEST ENTRY TIMELINE
                    </div>
                    <div className={`text-base font-black ${darkMode ? 'text-white' : 'text-black'} mb-1`}>
                      {comparisonAnalysis.fastestRoute.name}
                    </div>
                    <p className="text-xs text-zinc-400">
                      Shorter degree duration and lower entry prerequisites ({comparisonAnalysis.fastestRoute.education?.split('+')[0] || '3-4 years'}).
                    </p>
                  </div>

                  {/* Verdict 3: Work-Life / Flexibility */}
                  <div className={`p-5 rounded-2xl border ${
                    darkMode ? 'bg-zinc-900/70 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                  }`}>
                    <div className="text-[10px] font-mono font-bold uppercase text-zinc-400 mb-1">
                      HIGH WORK-LIFE FLEXIBILITY
                    </div>
                    <div className={`text-base font-black ${darkMode ? 'text-white' : 'text-black'} mb-1`}>
                      {comparisonAnalysis.mostFlexible.name}
                    </div>
                    <p className="text-xs text-zinc-400">
                      Excellent digital workflow, remote suitability, and freelance autonomy.
                    </p>
                  </div>
                </div>

                {/* Personalized Recommendation Summary */}
                <div className={`p-4.5 rounded-2xl border ${
                  darkMode ? 'bg-black/60 border-zinc-800 text-zinc-300' : 'bg-zinc-100 border-zinc-300 text-zinc-800'
                }`}>
                  <div className="text-xs sm:text-sm leading-relaxed">
                    <span className="font-bold text-black dark:text-white">💡 Cognitrail Recommendation: </span>
                    If your top priority is <span className="font-semibold underline">maximum lifetime wealth</span>, choose <span className="font-bold text-black dark:text-white">{comparisonAnalysis.highestEarner.name}</span>. If you prefer <span className="font-semibold underline">faster market entry with solid work-life balance</span>, choose <span className="font-bold text-black dark:text-white">{comparisonAnalysis.fastestRoute.name}</span>.
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className={`text-center py-16 rounded-3xl border ${
            darkMode ? 'bg-[#121215] border-zinc-800' : 'bg-white border-zinc-200 shadow-md'
          }`}>
            <Target className="w-14 h-14 mx-auto mb-3 text-zinc-500" />
            <h3 className={`text-xl font-black mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
              No Careers Selected
            </h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-4">
              Add up to 3 careers from the search box above to compare salaries, prerequisites, and discover which fits your goals.
            </p>
            <button
              onClick={() => setSelectedCareers(availableCareers.slice(0, 2))}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs btn-interactive ${
                darkMode ? 'bg-white text-black' : 'bg-black text-white'
              }`}
            >
              Compare Popular Streams
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerComparison;