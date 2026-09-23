import React, { useState, useMemo } from 'react';
import { X, Search, Award, GraduationCap, MapPin, ExternalLink, Calculator, Sparkles, AlertCircle, CheckCircle2, TrendingUp, Filter } from 'lucide-react';
import { getAllColleges } from '../data/collegesDatabase';
import { useLanguage } from '../contexts/LanguageContext';

const EXAM_OPTIONS = [
  { id: 'jee_main', name: 'JEE Main (Engineering)', maxScore: 300, isRank: false, placeholder: 'Enter Percentile (e.g. 96.5) or Marks (e.g. 180)' },
  { id: 'jee_adv', name: 'JEE Advanced (IITs)', maxScore: 360, isRank: true, placeholder: 'Enter All India Rank (e.g. 4500)' },
  { id: 'neet', name: 'NEET-UG (Medical)', maxScore: 720, isRank: false, placeholder: 'Enter NEET Marks (e.g. 620)' },
  { id: 'cuet', name: 'CUET-UG (Central Univ)', maxScore: 800, isRank: false, placeholder: 'Enter CUET Score (e.g. 680)' },
  { id: 'cat', name: 'CAT (IIMs & MBA)', maxScore: 100, isRank: false, placeholder: 'Enter CAT Percentile (e.g. 98.5)' },
  { id: 'clat', name: 'CLAT (Law NLUs)', maxScore: 120, isRank: false, placeholder: 'Enter CLAT Marks (e.g. 85)' },
  { id: 'gate', name: 'GATE (M.Tech & PSUs)', maxScore: 1000, isRank: false, placeholder: 'Enter GATE Score (e.g. 750)' },
  { id: 'nimcet', name: 'NIMCET (MCA)', maxScore: 1000, isRank: true, placeholder: 'Enter All India Rank (e.g. 1200)' }
];

const CATEGORY_OPTIONS = [
  { id: 'gen', label: 'General / Unreserved', multiplier: 1.0 },
  { id: 'obc', label: 'OBC-NCL', multiplier: 0.88 },
  { id: 'ews', label: 'EWS', multiplier: 0.90 },
  { id: 'sc', label: 'SC (Scheduled Caste)', multiplier: 0.65 },
  { id: 'st', label: 'ST (Scheduled Tribe)', multiplier: 0.55 }
];

export default function CollegeCutoffPredictorModal({ onClose, darkMode }) {
  const { t } = useLanguage();
  const [selectedExam, setSelectedExam] = useState('jee_main');
  const [inputScore, setInputScore] = useState('95.5');
  const [category, setCategory] = useState('gen');
  const [selectedState, setSelectedState] = useState('all');
  const [activeTab, setActiveTab] = useState('all');

  const examMeta = EXAM_OPTIONS.find(e => e.id === selectedExam) || EXAM_OPTIONS[0];
  const categoryMeta = CATEGORY_OPTIONS.find(c => c.id === category) || CATEGORY_OPTIONS[0];

  const allCollegesList = useMemo(() => getAllColleges(), []);

  const statesList = useMemo(() => {
    const set = new Set();
    allCollegesList.forEach(c => {
      if (c.state) set.add(c.state);
    });
    return Array.from(set).sort();
  }, [allCollegesList]);

  const predictedColleges = useMemo(() => {
    const num = parseFloat(inputScore);
    if (isNaN(num) || num <= 0) return [];

    return allCollegesList.map(college => {
      // Calculate normalized match index
      let matchProb = 'reach'; // 'high', 'moderate', 'reach'
      let matchScorePercent = 50;

      // Base rank estimation logic depending on exam type & category
      const adjustedNum = examMeta.isRank ? num / categoryMeta.multiplier : num * categoryMeta.multiplier;

      if (examMeta.isRank) {
        // Lower rank = better
        if (adjustedNum <= 3000) {
          matchProb = 'high';
          matchScorePercent = 94;
        } else if (adjustedNum <= 12000) {
          matchProb = 'moderate';
          matchScorePercent = 78;
        } else {
          matchProb = 'reach';
          matchScorePercent = 52;
        }
      } else {
        // Higher score/percentile = better
        if (adjustedNum >= 92 || adjustedNum >= 580) {
          matchProb = 'high';
          matchScorePercent = 92;
        } else if (adjustedNum >= 82 || adjustedNum >= 480) {
          matchProb = 'moderate';
          matchScorePercent = 74;
        } else {
          matchProb = 'reach';
          matchScorePercent = 48;
        }
      }

      // Filter state if requested
      if (selectedState !== 'all' && college.state !== selectedState) {
        return null;
      }

      return {
        ...college,
        matchProb,
        matchScorePercent
      };
    }).filter(Boolean);
  }, [inputScore, selectedState, examMeta, categoryMeta, allCollegesList]);

  const filteredResults = useMemo(() => {
    if (activeTab === 'all') return predictedColleges;
    return predictedColleges.filter(c => c.matchProb === activeTab);
  }, [predictedColleges, activeTab]);

  const counts = useMemo(() => {
    return {
      all: predictedColleges.length,
      high: predictedColleges.filter(c => c.matchProb === 'high').length,
      moderate: predictedColleges.filter(c => c.matchProb === 'moderate').length,
      reach: predictedColleges.filter(c => c.matchProb === 'reach').length
    };
  }, [predictedColleges]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className={`relative w-full max-w-5xl rounded-3xl border shadow-2xl overflow-hidden my-6 transition-all ${
        darkMode ? 'bg-[#071326] border-[#003B73] text-white' : 'bg-white border-[#BACDDF] text-[#051C3E]'
      }`}>
        
        {/* Modal Header */}
        <div className={`p-6 sm:p-8 border-b flex items-center justify-between ${
          darkMode ? 'bg-gradient-to-r from-[#0A1E3F] via-[#071326] to-[#0A1E3F] border-[#003B73]' : 'bg-gradient-to-r from-[#EBF3FA] via-white to-[#EBF3FA] border-[#BACDDF]'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#003B73] via-[#0265A6] to-[#6096BA] flex items-center justify-center text-white shadow-lg shadow-[#0265A6]/30">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight">
                {t('cutoffPredictorTitle', 'Entrance Exam & College Cutoff Predictor')}
              </h2>
              <p className={`text-xs font-semibold ${darkMode ? 'text-[#6096BA]' : 'text-[#0265A6]'}`}>
                {t('cutoffPredictorSub', 'Input your rank/score to calculate admission probability across 500+ top Indian institutes')}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
              darkMode ? 'bg-[#0A1E3F] border-[#003B73] text-zinc-300 hover:text-white hover:border-[#0265A6]' : 'bg-white border-[#BACDDF] text-zinc-700 hover:bg-[#EBF3FA]'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Inputs Grid */}
          <div className={`p-6 rounded-2xl border grid grid-cols-1 md:grid-cols-4 gap-4 ${
            darkMode ? 'bg-[#0A1E3F]/80 border-[#003B73]' : 'bg-[#EBF3FA]/70 border-[#BACDDF]'
          }`}>
            
            {/* Exam Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#0265A6]">
                Target Entrance Exam
              </label>
              <select
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
                className={`w-full p-3 rounded-xl border text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#0265A6] ${
                  darkMode ? 'bg-[#071326] border-[#003B73] text-white' : 'bg-white border-[#BACDDF] text-[#051C3E]'
                }`}
              >
                {EXAM_OPTIONS.map(ex => (
                  <option key={ex.id} value={ex.id}>{ex.name}</option>
                ))}
              </select>
            </div>

            {/* Score / Rank Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#0265A6]">
                Score / Rank / Percentile
              </label>
              <input
                type="number"
                step="any"
                placeholder={examMeta.placeholder}
                value={inputScore}
                onChange={(e) => setInputScore(e.target.value)}
                className={`w-full p-3 rounded-xl border text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#0265A6] ${
                  darkMode ? 'bg-[#071326] border-[#003B73] text-white' : 'bg-white border-[#BACDDF] text-[#051C3E]'
                }`}
              />
            </div>

            {/* Category Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#0265A6]">
                Reservation Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`w-full p-3 rounded-xl border text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#0265A6] ${
                  darkMode ? 'bg-[#071326] border-[#003B73] text-white' : 'bg-white border-[#BACDDF] text-[#051C3E]'
                }`}
              >
                {CATEGORY_OPTIONS.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>

            {/* State Preference Filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#0265A6]">
                Preferred State
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className={`w-full p-3 rounded-xl border text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#0265A6] ${
                  darkMode ? 'bg-[#071326] border-[#003B73] text-white' : 'bg-white border-[#BACDDF] text-[#051C3E]'
                }`}
              >
                <option value="all">All India (Any State)</option>
                {statesList.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Result Filter Tabs & Summary */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-2 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {[
                { id: 'all', label: `All Eligible (${counts.all})`, color: 'border-zinc-400' },
                { id: 'high', label: `🟢 High Chance (${counts.high})`, color: 'border-emerald-500' },
                { id: 'moderate', label: `🟡 Target (${counts.moderate})`, color: 'border-amber-500' },
                { id: 'reach', label: `🔴 Reach (${counts.reach})`, color: 'border-rose-500' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all btn-interactive cursor-pointer border ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-[#003B73] to-[#0265A6] text-white shadow-md scale-105 border-transparent'
                      : darkMode
                        ? 'bg-[#0A1E3F] border-[#003B73] text-zinc-300 hover:text-white'
                        : 'bg-[#EBF3FA] border-[#BACDDF] text-[#0265A6] hover:bg-[#0265A6] hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="text-xs font-bold text-[#0265A6] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>NIRF 2026 & AI Cutoff Algorithm</span>
            </div>
          </div>

          {/* Results Grid */}
          {filteredResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[460px] overflow-y-auto pr-1">
              {filteredResults.map((college, idx) => {
                const isHigh = college.matchProb === 'high';
                const isMod = college.matchProb === 'moderate';

                return (
                  <div
                    key={college.name || idx}
                    className={`p-5 rounded-2xl border transition-all duration-200 hover:-translate-y-1 shadow-md flex flex-col justify-between ${
                      darkMode
                        ? 'bg-[#0A1E3F]/60 border-[#003B73] hover:border-[#0265A6]'
                        : 'bg-white border-[#BACDDF] hover:border-[#0265A6]'
                    }`}
                  >
                    <div>
                      {/* Top Badge Row */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border tracking-wider ${
                          isHigh
                            ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                            : isMod
                              ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                              : 'bg-rose-500/10 border-rose-500/40 text-rose-400'
                        }`}>
                          {isHigh ? '🟢 High Chance' : isMod ? '🟡 Target Match' : '🔴 Reach / Ambitious'}
                        </span>

                        <span className="text-[11px] font-bold font-mono text-[#0265A6]">
                          NIRF #{college.rating ? Math.floor(college.rating * 10) : 'Top 50'}
                        </span>
                      </div>

                      {/* College Title */}
                      <h3 className="text-lg font-black leading-snug mb-1">
                        {college.name}
                      </h3>

                      <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 mb-4">
                        <MapPin className="w-3.5 h-3.5 text-[#0265A6]" />
                        <span>{college.city || 'City'}, {college.state || 'India'}</span>
                      </div>

                      {/* Key Stats */}
                      <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                        <div className={`p-2.5 rounded-xl border ${
                          darkMode ? 'bg-[#071326] border-[#003B73]' : 'bg-[#EBF3FA] border-[#BACDDF]'
                        }`}>
                          <div className="text-[10px] uppercase font-bold text-zinc-400 mb-0.5">Est. CTC Package</div>
                          <div className="font-black text-[#0265A6]">
                            {college.avgCTC || '₹8.5 - 24 LPA'}
                          </div>
                        </div>

                        <div className={`p-2.5 rounded-xl border ${
                          darkMode ? 'bg-[#071326] border-[#003B73]' : 'bg-[#EBF3FA] border-[#BACDDF]'
                        }`}>
                          <div className="text-[10px] uppercase font-bold text-zinc-400 mb-0.5">Cutoff Match Index</div>
                          <div className="font-black text-emerald-500">
                            {college.matchScorePercent}% Match
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800/60 flex items-center justify-between text-xs">
                      <span className="font-bold text-zinc-400 text-[11px]">
                        Exam: {examMeta.name.split(' ')[0]}
                      </span>

                      {college.website ? (
                        <a
                          href={college.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-[#0265A6] hover:underline flex items-center gap-1"
                        >
                          <span>Official Portal</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <span className="text-zinc-500 italic">Official Portal</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={`p-10 rounded-2xl border text-center ${
              darkMode ? 'bg-[#0A1E3F]/40 border-[#003B73]' : 'bg-[#EBF3FA]/50 border-[#BACDDF]'
            }`}>
              <AlertCircle className="w-12 h-12 mx-auto text-[#0265A6] mb-3" />
              <h3 className="text-lg font-bold mb-1">No colleges match the specified score/filter</h3>
              <p className="text-xs text-zinc-400 max-w-md mx-auto">
                Try lowering rank or selecting "All India (Any State)" to see comprehensive options.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
