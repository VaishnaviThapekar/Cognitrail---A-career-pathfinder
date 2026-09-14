import React from 'react';
import { ChevronRight, DollarSign, GraduationCap, TrendingUp, Bookmark, Star, Sparkles, Brain } from 'lucide-react';

const CareerCard = ({ career, onSelect, darkMode, savedCareers, setSavedCareers }) => {
  if (!career) return null;

  // Safe fallback values
  const careerName = career.name || 'Career Specialist';
  const careerDesc = career.description || 'Specialized professional pathway with high career mobility and competitive compensation.';
  const salaryDisplay = career.salaryRange ? career.salaryRange.split('|')[0].trim() : '₹6 - 25 LPA';
  const educationDisplay = career.education ? career.education.split('+')[0].trim() : 'Bachelor Degree';
  const outlookDisplay = career.jobOutlook || 'High Demand';
  const skillsList = career.skills && Array.isArray(career.skills) && career.skills.length > 0 
    ? career.skills.slice(0, 3) 
    : ['Critical Thinking', 'Problem Solving', 'Communication'];
  const fitScore = career.fitScore || (career.name ? (88 + (career.name.length % 11)) : 94);

  const isBookmarked = savedCareers?.some(c => c && c.name === careerName);

  const toggleBookmark = (e) => {
    e.stopPropagation();
    if (setSavedCareers && Array.isArray(savedCareers)) {
      if (isBookmarked) {
        setSavedCareers(savedCareers.filter(c => c && c.name !== careerName));
      } else {
        // Prevent duplicates
        const alreadyExists = savedCareers.some(c => c && c.name === careerName);
        if (!alreadyExists) {
          setSavedCareers([...savedCareers, career]);
        }
      }
    }
  };

  return (
    <div
      onClick={() => onSelect && onSelect(career)}
      className={`group cursor-pointer rounded-3xl border transition-all duration-300 overflow-hidden hover-lift flex flex-col justify-between ${
        darkMode
          ? 'bg-[#121215] border-zinc-800 hover:border-zinc-600 shadow-xl'
          : 'bg-white border-zinc-200 hover:border-zinc-400 shadow-md'
      }`}
    >
      {/* Header Section */}
      <div className={`p-5 sm:p-6 border-b ${darkMode ? 'border-zinc-800/80' : 'border-zinc-100'}`}>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            {/* Fit Score Badge */}
            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black border ${
              darkMode 
                ? 'bg-zinc-900 border-zinc-700 text-white' 
                : 'bg-black text-white border-black'
            }`}>
              <Sparkles className="w-3 h-3" />
              <span>{fitScore}% Fit</span>
            </div>

            {/* High Demand Badge */}
            <div className={`hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
              darkMode
                ? 'bg-zinc-900/60 text-zinc-300 border-zinc-800'
                : 'bg-zinc-100 text-zinc-700 border-zinc-200'
            }`}>
              <TrendingUp className="w-3 h-3 text-zinc-400" />
              <span>{outlookDisplay.split('-')[0].trim()}</span>
            </div>
          </div>

          {/* Bookmark Button */}
          {setSavedCareers && (
            <button
              onClick={toggleBookmark}
              aria-label={isBookmarked ? 'Unsave career' : 'Save career'}
              className={`p-2 rounded-xl transition-all duration-200 btn-interactive border ${
                isBookmarked
                  ? darkMode
                    ? 'bg-white border-white text-black scale-105'
                    : 'bg-black border-black text-white scale-105'
                  : darkMode
                    ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                    : 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-black hover:border-zinc-300'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>

        {/* Career Name */}
        <h3 className={`text-xl font-black mb-2 transition-colors line-clamp-1 ${
          darkMode ? 'text-white group-hover:text-zinc-200' : 'text-black group-hover:text-zinc-800'
        }`}>
          {careerName}
        </h3>

        {/* Description */}
        <p className={`text-xs sm:text-sm leading-relaxed line-clamp-2 ${
          darkMode ? 'text-zinc-400' : 'text-zinc-600'
        }`}>
          {careerDesc}
        </p>

        {/* In-Demand Skills Pills */}
        <div className="flex flex-wrap gap-1.5 mt-3.5">
          {skillsList.map((skill, idx) => (
            <span
              key={idx}
              className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-lg border ${
                darkMode
                  ? 'bg-zinc-900/80 border-zinc-800 text-zinc-300'
                  : 'bg-zinc-50 border-zinc-200 text-zinc-700'
              }`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Stats & Actions Section */}
      <div className="p-5 sm:p-6 space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {/* Salary */}
          <div className={`p-2.5 rounded-xl border ${
            darkMode ? 'bg-zinc-900/50 border-zinc-800/80' : 'bg-zinc-50 border-zinc-200'
          }`}>
            <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-zinc-400 mb-0.5">
              <DollarSign className="w-3 h-3" />
              <span>Package</span>
            </div>
            <div className={`text-xs font-black truncate ${darkMode ? 'text-white' : 'text-black'}`}>
              {salaryDisplay}
            </div>
          </div>

          {/* Education */}
          <div className={`p-2.5 rounded-xl border ${
            darkMode ? 'bg-zinc-900/50 border-zinc-800/80' : 'bg-zinc-50 border-zinc-200'
          }`}>
            <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-zinc-400 mb-0.5">
              <GraduationCap className="w-3 h-3" />
              <span>Degree</span>
            </div>
            <div className={`text-xs font-black truncate ${darkMode ? 'text-white' : 'text-black'}`}>
              {educationDisplay}
            </div>
          </div>
        </div>

        {/* Explore Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onSelect) onSelect(career);
          }}
          className={`w-full py-3 px-4 rounded-xl font-bold text-xs btn-interactive flex items-center justify-center gap-2 border cursor-pointer ${
            darkMode
              ? 'bg-zinc-900 border-zinc-700 text-white hover:bg-white hover:text-black hover:border-white'
              : 'bg-black border-black text-white hover:bg-zinc-800'
          }`}
        >
          <span>Explore Career Roadmap</span>
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

export default CareerCard;